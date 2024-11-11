# Supertram
This is the back end for the Supertram web application as part of the System Design and Development module. The frontend component can be found [here](https://github.com/PranabantiKarmaakar99/SuperTramApp.FrontEnd).

## Instructions
### Step 1
Open the backend project and check the dependencies. If the project does not match with your ASP.NET version, then update the packages and ASP.NET to version 8.0.

### Step 2

Complete the data migration by running the following command in the package manager console: `Add-Migration SuperTramApp -context SuperTramAppContext`

Make sure that you select SuperTramApp.Data in the default project dropdown.

### Step 3

Update the database by running the following command in the terminal: `update-database -context SuperTramAppContext`

### Step 4

Set up the React project by opening the project and opening a terminal window. Navigate to the root folder of the project and then run the command `npm install` if it is not already installed. Then run the following command to start the project: `npm start`

### Step 5
If the tram information has not been set up correctly in the database, there is a SQL script that can be executed. Please execute Scrips/JourneyPlanner.sql to correctly add the relevant tables, tram stop and order information to the database.

## Using the Application
### Buying Tickets
You will need to register for an account before buying a ticket. Once you have registered, you can sign in and then start the ticket buying process by clicking on "Buy Ticket".

On the next screen, any ticket type can be selected. Once selected, the ticket needs to be added to the card, and then the checkout button can be pressed.

#### Stripe Payments
The following dummy details can be used to similate a payment through Strike when buying a ticket:

**Card Number**: 4242 4242 4242 4242 

**Expiry Date**: 02/25 

**CVC**: 000 

**ZIP**: 12345

### Activating Tickets
If the email the user signed up with is legitimate, then an email should be sent to that email address with information regarding the purchase.

The app will then redirect to the wallet, where the purchased ticket is visible and can be activated by pressing the "Activate Ticket" button. The QR code will change to reflect that it has been activated.

### Community Page / Chat Function
#### Joining a Room

Click on the Community page and put your name in as the username. When prompted for a room name, use a name of one of the tram lines, such as "Yellow", "Blue", etc.

After clicking the "Join Room" button, you will then be connected to the correct room. All users currently in the room will be notified that another user has joined the room.

#### Messaging

Messages can be sent to other users in the same room by using the input box. 

#### Leaving a Room

A room can be left by clcking the "Leave Room" button. All users currently in the room will be notified that a user has left the room.

### Journey Planner
#### Planning a Journey 

When on the main screen, there is the option to either enter tram stop names or choose from a list. If the full name of the tram stop is unknown, entering part of the tram stop name will provide a few relevant options. Once search Journey has been pressed, a route will be provided that tells the user how to get between the stops they have chosen.

There will also be a button to save this route to their Favourites.

### Using the Map

Every tram stop on the Supertram network, along with routes which are indicated by colour, are displayed on the map. These stops can be clicked and a pop up will appear indicating the tram stop name. At the bottom of the page, a list of upcoming departures will also appear.

### Tram Stop Departures

If one of the termini is clicked, the map will change just to highlight the route and stops from the previously highlighted tram stop to the termini that was picked from the departure list.

### Find My Location

There is also a "Find my Location" button. This feature was not fully implemented; it was intended to track the user's location and find the nearest tram stop to them. In its current state, it finds the users location (after accepting a prompt in the browser) and stores -- and prints -- their coordinates to the console.

### Favourite Routes
Favourite Routes can be found by clicking on the star icon on the main page. This will then take the user to the Favourite Routes page, where all the favourites will be displayed. Routes can be deleted by pressing the "Delete" button. If the "View" button is pressed, this will display the upcoming departures from the start stop of their favourite route.




