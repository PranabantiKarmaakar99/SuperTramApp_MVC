using Microsoft.AspNetCore.SignalR;
using SuperTramApp.Data.Models.Domain;
using System.Text.RegularExpressions;

namespace SuperTramApp.WebApi.Hubs
{
    public class ChatHub:Hub
    {
        private readonly string tramUser;
        private readonly IDictionary<string, UserConnection> connections;

        public ChatHub(IDictionary<string, UserConnection> Connections)
        {
            tramUser = "Tram User";
            connections = Connections;
        }

        public override Task OnDisconnectedAsync(Exception? exception)
        {
            if (connections.TryGetValue(Context.ConnectionId, out UserConnection userConnection))
            {
                connections.Remove(Context.ConnectionId);
                Clients.Group(userConnection.Room)
                    .SendAsync("ReceiveMessage", tramUser, $"{userConnection.User} has left");
            }
            return base.OnDisconnectedAsync(exception);
        }
        public async Task SendMessage(string message)
        {
            if (connections.TryGetValue(Context.ConnectionId, out UserConnection userConnection))
            {
                await Clients.Group(userConnection.Room).SendAsync("ReceiveMessage", userConnection.User, message);
            }
        }
        public async Task JoinRoom(UserConnection userConnection)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, userConnection.Room);

            connections[Context.ConnectionId] = userConnection;
            await Clients.Group(userConnection.Room).SendAsync("ReceiveMessage", tramUser,
                $"{userConnection.User} has joined {userConnection.Room}");
        }

    }
}
