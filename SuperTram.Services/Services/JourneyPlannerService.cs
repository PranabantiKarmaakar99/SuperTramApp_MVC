using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.Data.SqlClient;


using SuperTramApp.Data.Models.Repository;
using SuperTramApp.Data.Models.Domain;
using SuperTramApp.Services.IServices;

namespace SuperTramApp.Services.Services
{
    public class JourneyPlanner:IJourneyPlannerService
    {
        private readonly SuperTramAppContext _context;

        public JourneyPlanner(SuperTramAppContext context)
        {
            _context = context;
        }

        public async Task<List<RouteDetails>> GetDirectRoute(string startStop, string endStop)
        {
            var sqlQuery = @"
               WITH RouteDetails AS (
            SELECT TOP 1
                ls_start.line_id,
                MIN(ls_start.stop_order) AS start_order,
                MAX(ls_end.stop_order) AS end_order
            FROM
                line_stops ls_start
            JOIN
                line_stops ls_end ON ls_start.line_id = ls_end.line_id
            WHERE
                ls_start.stop_id = (SELECT tram_stop_id FROM tram_stops WHERE tram_stop_name = @startStop)
                AND ls_end.stop_id = (SELECT tram_stop_id FROM tram_stops WHERE tram_stop_name = @endStop)
                AND ls_end.stop_order > ls_start.stop_order
            GROUP BY
                ls_start.line_id
            ORDER BY
                ls_start.line_id
        ),
        SelectedLine AS (
            SELECT
                rd.line_id,
                rd.start_order,
                rd.end_order
            FROM
                RouteDetails rd
        )
        SELECT
            tl.tram_line_name AS TramLineName,
            tl.tram_line_terminus AS TramLineTerminus,
            start_stop.tram_stop_name AS StopName,
            ls_start.stop_order AS StopOrder,
            start_stop.tram_stop_latitude AS Latitude,
            start_stop.tram_stop_longitude AS Longitude
        FROM
            SelectedLine sl
        JOIN
            line_stops ls_start ON sl.line_id = ls_start.line_id AND sl.start_order = ls_start.stop_order
        JOIN
            tram_lines tl ON ls_start.line_id = tl.tram_line_id
        JOIN
            tram_stops start_stop ON ls_start.stop_id = start_stop.tram_stop_id
        UNION ALL
        SELECT
            tl.tram_line_name AS TramLineName,
            tl.tram_line_terminus AS TramLineTerminus,
            end_stop.tram_stop_name AS StopName,
            ls_end.stop_order AS StopOrder,
            end_stop.tram_stop_latitude AS Latitude,
            end_stop.tram_stop_longitude AS Longitude
        FROM
            SelectedLine sl
        JOIN
            line_stops ls_end ON sl.line_id = ls_end.line_id AND sl.end_order = ls_end.stop_order
        JOIN
            tram_lines tl ON ls_end.line_id = tl.tram_line_id
        JOIN
            tram_stops end_stop ON ls_end.stop_id = end_stop.tram_stop_id
        UNION ALL
        SELECT
            tl.tram_line_name AS TramLineName,
            tl.tram_line_terminus AS TramLineTerminus,
            intermediate_stops.tram_stop_name AS StopName,
            ls_intermediate.stop_order AS StopOrder,
            intermediate_stops.tram_stop_latitude AS Latitude,
            intermediate_stops.tram_stop_longitude AS Longitude
        FROM
            SelectedLine sl
        JOIN
            line_stops ls_intermediate ON sl.line_id = ls_intermediate.line_id
        JOIN
            tram_stops intermediate_stops ON ls_intermediate.stop_id = intermediate_stops.tram_stop_id
        JOIN
            tram_lines tl ON ls_intermediate.line_id = tl.tram_line_id
        WHERE
            ls_intermediate.stop_order > sl.start_order
            AND ls_intermediate.stop_order < sl.end_order
        ORDER BY
            StopOrder;
           ";

            var parameters = new[]
            {
                new SqlParameter("@startStop", startStop),
                new SqlParameter("@endStop", endStop)
            };

            return await _context.RouteDetails.FromSqlRaw(sqlQuery, parameters).ToListAsync();
        }

        public async Task<string> GetTransferStop(string startStop, string endStop)
        {
            var sqlQuery = @"
        WITH StartLines AS (
            SELECT DISTINCT
                ls_start.line_id,
                ls_start.stop_order AS start_order
            FROM
                line_stops ls_start
            WHERE
                ls_start.stop_id = (SELECT tram_stop_id FROM tram_stops WHERE tram_stop_name = @startStop)
        ),
        TransferStops AS (
            SELECT
                ts.tram_stop_id AS transfer_stop_id,
                ts.tram_stop_name AS transfer_stop_name,
                sl.line_id,
                ls_transfer.stop_order AS transfer_order
            FROM
                StartLines sl
            JOIN
                line_stops ls_transfer ON sl.line_id = ls_transfer.line_id
            JOIN
                tram_stops ts ON ls_transfer.stop_id = ts.tram_stop_id
            WHERE
                ts.transfer_stop = 1
                AND ls_transfer.stop_order > sl.start_order
        ),
        EndLines AS (
            SELECT DISTINCT
                ls_end.line_id,
                ls_end.stop_order AS end_order
            FROM
                line_stops ls_end
            WHERE
                ls_end.stop_id = (SELECT tram_stop_id FROM tram_stops WHERE tram_stop_name = @endStop)
        ),
        ValidTransfers AS (
            SELECT
                ts.transfer_stop_id,
                ts.transfer_stop_name,
                ROW_NUMBER() OVER (ORDER BY ts.transfer_stop_id) AS row_num
            FROM
                TransferStops ts
            JOIN
                line_stops ls_transfer ON ts.transfer_stop_id = ls_transfer.stop_id
            JOIN
                EndLines el ON ls_transfer.line_id = el.line_id
            WHERE
                ls_transfer.stop_order < el.end_order
        )
        SELECT
            vt.transfer_stop_name
        FROM
            ValidTransfers vt
        WHERE
            vt.row_num = (SELECT MAX(row_num) FROM ValidTransfers);
    ";

            var parameters = new[]
            {
        new SqlParameter("@startStop", startStop),
        new SqlParameter("@endStop", endStop)
    };

            using (var connection = new SqlConnection(_context.Database.GetDbConnection().ConnectionString))
            {
                await connection.OpenAsync();

                using (var command = new SqlCommand(sqlQuery, connection))
                {
                    command.Parameters.AddRange(parameters);

                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        if (await reader.ReadAsync())
                        {
                            return reader.GetString(0); // Ensure this is reading the correct column
                        }
                        else
                        {
                            throw new Exception("No transfer stop found.");
                        }
                    }
                }
            }
        }

        public async Task<List<RouteDetails>> FindRoute(string startStop, string endStop)
        {
            // Checks if there is a direct route between the start and end stops
            var directRoute = await GetDirectRoute(startStop, endStop);
            if (directRoute.Any())
            {
                return UpdateStopOrder(directRoute);
            }

            // Finds the transfer stop if there is no direct route
            var transferStop = await GetTransferStop(startStop, endStop);
            if (string.IsNullOrEmpty(transferStop))
            {
                return new List<RouteDetails>(); // Indicates that there is no route found
            }

            // Gets the direct route from start to transfer stop and transfer stop to end stop
            var route1 = await GetDirectRoute(startStop, transferStop);
            var route2 = await GetDirectRoute(transferStop, endStop);

            if (!route1.Any() || !route2.Any())
            {
                return new List<RouteDetails>();
            }

            // Combines the two routes
            var combinedRoute = route1.Concat(route2).ToList();

            return UpdateStopOrder(combinedRoute);
        }

        public List<RouteDetails> UpdateStopOrder(List<RouteDetails> route)
        {
            for (int i = 0; i < route.Count; i++)
            {
                route[i].StopOrder = i + 1;
            }
            return route;
        }
                
    }
}