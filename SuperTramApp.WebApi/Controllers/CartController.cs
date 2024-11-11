using Microsoft.AspNetCore.Mvc;
using SuperTramApp.Data.Models.Domain.ExtendedClasses;
using SuperTramApp.Data.Models.Domain;
using SuperTramApp.Data.Models.Repository;
using SuperTramApp.Services.IServices;
using SuperTramApp.Services.Services;
using Microsoft.AspNetCore.Authorization;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Http;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.EntityFrameworkCore;

using System.Net.Http;
using System.Reflection;
using System.Security.Claims;
using System.Security.Principal;
using Microsoft.AspNetCore.Identity;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SuperTramApp.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : SuperTramAppController
    {
        List<CartTicket> cart;

        IOrderService orderService;
        ITicketService ticketService;
        IUserService userService;
        IHttpContextAccessor _httpContextAccessor;
        public IHttpContextAccessor httpContextAccessor;
        CheckOutUser checkOutUser;
        SuperTramAppContext context;
        //private readonly UserManager<IdentityUser> _userManager;
        ClaimsPrincipal user1;

        User user;

        HttpContent httpContext;
        Random random;
        public CartController()
        {
            orderService = new OrderService();
            ticketService = new TicketService();
            userService = new UserService();
            checkOutUser = new CheckOutUser();
            _httpContextAccessor = new HttpContextAccessor();

            string str = _httpContextAccessor.HttpContext.Session.GetString("tickets");

            tickets = JsonConvert.DeserializeObject<IList<Ticket>>(str);
            //_httpContextAccessor = new HttpContextAccessor();


            //SignInManager =new SignInManager<IdentityUser>();

            context = new SuperTramAppContext();

            user = new User();
            random = new Random();
            user1 = new ClaimsPrincipal();
        }


        public static class HttpContextExtensions
        {
        }

        public class CartItemRequest
        {
            public string id { get; set; }
        }
        bool IsThereACart()
        {
            if (_httpContextAccessor.HttpContext.Session.GetString("cart") != null) return true;
            return false;
        }

        List<CartTicket> GetCartFromSession()
        {

            var cart = HttpContext.Session.GetObjectFromJson<List<CartTicket>>("cart");
            return cart ?? new List<CartTicket>();



        }

        void PutCartInSession(List<CartTicket> cart)
        {
            if (cart == null)
            {
                Console.WriteLine("No cart");
            }

            string cartJson = JsonConvert.SerializeObject(cart);
            _httpContextAccessor.HttpContext.Session.SetString("cart", cartJson);


        }

        bool IsItemInTheCart(string TicketId, List<CartTicket> cart)
        {
            foreach (var item in cart)
            {
                if (item.Ticket.Id == TicketId) return true;
            }

            return false;
        }
        // GET: CartController
        [HttpGet("DisplayCart")]
        public ActionResult DisplayCart()
        {

            List<CartTicket> cart = GetCartFromSession();
            if (cart != null) { return Ok(cart); }
            return NotFound();


        }

        [HttpGet("GetCart")]
        public ActionResult GetCart()
        {
            // Retrieve the cart from the session
            var cart = GetCartFromSession();

            if (cart == null || cart.Count == 0)
            {
                return NotFound("Cart is empty or not found.");
            }

            return Ok(cart);
        }

       
        [HttpPost("save")]
        public ActionResult SaveCart([FromBody] List<CartTicket> cart)
        {
            cart = GetCartFromSession();
            // Store the cart in session or a database
            HttpContext.Session.SetObjectAsJson("cart", cart);
            return Ok("Cart saved successfully");
        }
        // GET: CartController/Details/5
        [HttpPost("UpdateCart")]
        public ActionResult UpdateCart(Dictionary<string, string> data)
        {
            string ticketId = data["ticketId"];
            char toDo = data["toDo"][0];
            var cart = GetCartFromSession();
            switch (toDo)
            {
                case '+':
                    if (cart != null)
                    {
                        cart = GetCartFromSession();
                        if (IsItemInTheCart(ticketId, cart))
                            cart.Find(o => o.Ticket.Id == ticketId).Quantity++;

                    }

                    else
                    {
                        cart = new List<CartTicket>();
                        cart.Add(new CartTicket
                        {
                            Ticket = ticketService.GetTicket(ticketId),
                            Quantity = 1

                        });

                    }
                    PutCartInSession(cart);
                    return RedirectToAction("DisplayCart");
                    break;


                case '-':

                    if (IsThereACart())
                    {
                        cart = GetCartFromSession();
                        if (!IsItemInTheCart(ticketId, cart))
                        {
                            CartTicket item = cart.Find(o => o.Ticket.Id == ticketId);
                            if (item.Quantity > 1)
                                cart.Find(o => o.Ticket.Id == ticketId).Quantity--;
                            else
                                cart.Remove(item);
                            PutCartInSession(cart);

                        }

                    }
                    return RedirectToAction("DisplayCart");




                    break;
                case 'x':

                    if (IsThereACart())
                    {
                        cart = GetCartFromSession();
                        if (IsItemInTheCart(ticketId, cart))
                        {
                            CartTicket item = cart.Find(o => o.Ticket.Id == ticketId);
                            cart.Remove(item);
                            PutCartInSession(cart);
                        }
                    }
                    return RedirectToAction("DisplayCart");
                    break;
                default:
                    break;
            }

            return Ok();
        }
        [HttpPost("AddToCart")]
        public ActionResult AddToCart(Dictionary<string, string> data2)
        {
            string id = data2["id"];
            // If the cart is null, initialize it
            var cart = GetCartFromSession();
            if (cart == null)
            {
                cart = new List<CartTicket>();
            }

            //// Check if the item is already in the cart
            ////if (IsItemInTheCart(id, cart))
            //    if (cart != null)
            //{   
            //    //cart.Find(o => o.Ticket.Id == id).Quantity++;

            //    //cart = new List<CartTicket>();
            //    cart.Add(new CartTicket
            //    {
            //        Ticket = ticketService.GetTicket(id),
            //        Quantity = 1

            //    });
            //}

            // Retrieve the ticket using the ticket ID
            var ticket = ticketService.GetTicket(id);

            // Create a new CartTicket item and add it to the cart
            CartTicket item = new CartTicket()
            {
                Ticket = ticket,
                Quantity = 1
            };

            cart.Add(item);
            Console.WriteLine(item.Ticket.Id);
            Console.WriteLine(cart.Count());

            // Store the cart back in session
            PutCartInSession(cart);

            // Return the updated cart
            return Ok(cart);

        }
        // GET: CartController/Create

       // [Authorize]
        [HttpPost("CheckOut-1")]
        public ActionResult CheckOut([FromBody] List<CartTicket> cart)
        {
            var Name = User.Identity.Name;
            //var userId = User.Claims.FirstOrDefault(a=>a.Type=="String")!.Value;
            //ClaimsPrincipal currentUser = this.User;
            //var currentUserName = currentUser.FindFirst(ClaimTypes.NameIdentifier).Value;
           
            Console.WriteLine("Name: ", Name);
           
            //List<CartTicket> cart1 = JsonConvert.DeserializeObject<List<CartTicket>>("cart");
            User user = context.Users.FirstOrDefault(o=>o.Email == Name);
             

            if (user == null)
            {
                // Handle case where user ID is not found in session
                return RedirectToAction("Login", "Admin");
            }

            //IdentityUser user = User;
            //create cart object and assignit to  GetCart() Method.
            //IList<CartTicket> cart = GetCart();

            //Create CheckOut User object , and assign to porperites user, cart,Del Adress.
            checkOutUser = new CheckOutUser()
            {   //Id = random.Next(),
                User = user,
                CartTickets = cart,
            };


            //Call OrderService to add order, passing CheckOutUser object
            orderService.AddOrder(checkOutUser);
            Console.WriteLine("CheckOutUser:", checkOutUser.CartTickets.Count);
            //Return RedirectionToACtion
            return Ok(checkOutUser);
        }

        // POST: CartController/Create
       
        [HttpPost("CheckOut")]
        [ValidateAntiForgeryToken]

        public ActionResult CheckOut(CheckOutUser checkOutUser)
        {
            string Name = User.Identity.Name;
            // User user = context.Users1.FirstOrDefault(a => a.Email == Email);



            if (user == null)
            {
                // Handle case where user ID is not found in session
                return RedirectToAction("Login", "Admin");
            }






            //create cart object and assignit to  GetCart() Method.
            IList<CartTicket> cart = GetCartFromSession();

            //User user = User.FindFirst(x=>x.Name==Email);

            //Create CheckOut User object , and assign to porperites user, cart,Del Adress.
            checkOutUser = new CheckOutUser()
            {   //Id= checkOutUser.Id,
                User = user,
                CartTickets = cart,
                DelAddress = checkOutUser.DelAddress,


            };

            //Call OrderService to add order, passing CheckOutUser object
            orderService.AddOrder(checkOutUser);
            //Return RedirectionToACtion ...Ideally to payment portal but for now to Display cart

            return Ok("CheckOut is successful");
        }
        // GET: api/<CartController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<CartController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<CartController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<CartController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<CartController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }

       
    }


    
}

