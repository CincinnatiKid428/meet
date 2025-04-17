# ![Meet brand logo](src/img/meet-logo-120x120.png) Meet App

## Description:
To build a serverless, progressive web application (PWA) with React using a
test-driven development (TDD) technique. The application uses the Google
Calendar API to fetch upcoming events.

## Key Features:
1. Filter Events by City.
2. Show/Hide Event Details.
3. Specify Number of Events.
4. Use the App When Offline.
5. Add an App Shortcut to the Home Screen.
6. Display Charts Visualizing Event Details.

## User Stories:
1. As a *user* <br>
I should be able to *filter events by city*<br>
So that *I can see a list of events taking place in that city*.

2. As a *user* <br>
I should be able to *show OR hide details of an event* <br>
So that *I can find out more information about an event OR hide more information about an event*.

3. As a *user* <br>
I should be able to *specify the number of events to show*<br>
So that *I can see a larger or smaller quantity of events on the page*.

4. As a *user* <br>
I should be able to *use the application while offline*.<br>
So that *I can still get information about events while I am without internet access*.

5. As a *user* <br>
I should be able to *add a shortcut to this application to the home screen*<br>
So that *I can access the application by way of the shortcut*.

6. As a *user* <br>
I should be able to *see data visualizations about cities and events*<br>
So that *I can gain high-level information about cities and events using charts/graphs*.

## User Scenarios:
**<ins>User Story 1:</ins>** <br>
As a *user* <br>
I should be able to *filter events by city*<br>
So that *I can see a list of events taking place in that city*.

**<ins>Scenario 1.1:</ins>** When a user hasn't searched for a city, show upcoming events for all cities. <br>
**<ins>Given:</ins>** User hasn't searched for a city <br>
**<ins>When:</ins>** User opens the app<br>
**<ins>Then:</ins>** User should see the list of all upcoming events<br>

**<ins>Scenario 1.2:</ins>** User should see list of suggestions when they search for a city. <br>
**<ins>Given:</ins>** The main page is open <br>
**<ins>When:</ins>** User starts typing in the city search box <br>
**<ins>Then:</ins>** User should see a list of city suggestions that match what they typed <br>

**<ins>Scenario 1.3:</ins>** User can select a city from suggested list. <br>
**<ins>Given:</ins>** User was typing "Cincinnati" in city search box AND the list of suggested cities is showing<br>
**<ins>When:</ins>** User selects a city ("Cincinnati, Ohio") from the suggested list<br>
**<ins>Then:</ins>** Their city should be changed to that selected city ("Cininnati, Ohio") AND the user should receive a list of upcoming events in that city <br>

**<ins>User Story 2:</ins>** <br>
As a *user* <br>
I should be able to *show OR hide details of an event* <br>
So that *I can find out more information about an event OR hide more information about an event*.

**<ins>Scenario 2.1:</ins>** An event element is collapsed by default. <br>
**<ins>Given:</ins>** List of events has been loaded <br>
**<ins>When:</ins>** User has not clicked to "Show Details" on an event <br>
**<ins>Then:</ins>** Event element should be collapsed by default <br>

**<ins>Scenario 2.2:</ins>** User can expand an event to see details. <br>
**<ins>Given:</ins>** List of events has been loaded <br>
**<ins>When:</ins>** User clicks on "Show Details" for an event in list. <br>
**<ins>Then:</ins>** Event element should expand to show details <br>

**<ins>Scenario 2.3:</ins>** User can collapse an event to hide details. <br>
**<ins>Given:</ins>** Event element has expanded to show details in the list of events <br>
**<ins>When:</ins>** User clicks "Hide Details" on the expanded event element <br>
**<ins>Then:</ins>** Event element should collapse to hide details <br>

**<ins>User Story 3:</ins>**  <br>
As a *user* <br>
I should be able to *specify the number of events to show*<br>
So that *I can see a larger or smaller quantity of events on the page*.

**<ins>Scenario 3.1:</ins>** When user hasn’t specified a number, 32 events are shown by default. <br>
**<ins>Given:</ins>** App has loaded event list on page <br>
**<ins>When:</ins>** User has not entered number of events to display <br>
**<ins>Then:</ins>** App should display 32 events by default <br>

**<ins>Scenario 3.2:</ins>**  User can change the number of events displayed. <br>
**<ins>Given:</ins>** App has loaded event list on page <br>
**<ins>When:</ins>** User specifies number of events to display <br>
**<ins>Then:</ins>** App should display specified number of events to user <br>

**<ins>User Story 4:</ins>** <br>
As a *user* <br>
I should be able to *use the application while offline*.<br>
So that *I can still get information about events while I am without internet access*.

**<ins>Scenario 4.1:</ins>** Show cached data when there’s no internet connection. <br>
**<ins>Given:</ins>** App has loaded events onto page <br>
**<ins>When:</ins>** User disconnects from the internet <br>
**<ins>Then:</ins>** App should still operate offline from cached data for currently listed events <br>

**<ins>Scenario 4.2:</ins>** Show error when user changes search settings (city, number of events). <br>
**<ins>Given:</ins>** App is loaded but offline <br>
**<ins>When:</ins>** User tries to update city or number of events settings <br>
**<ins>Then:</ins>** Error should be displayed when trying to change settings while offline <br>

**<ins>User Story 5:</ins>** <br>
As a *user* <br>
I should be able to *add a shortcut to this application to the home screen*<br>
So that *I can access the application by way of the shortcut*.

**<ins>Scenario 5.1:</ins>** User can install the meet app as a shortcut on their device home screen. <br>
**<ins>Given:</ins>** App is loaded in browser <br>
**<ins>When:</ins>** User saves a shortcut to the app <br>
**<ins>Then:</ins>** Icon shortcut should be placed on home screen allowing access app through shortcut <br>

**<ins>User Story 6:</ins>**  <br>
As a *user* <br>
I should be able to *see data visualizations about cities and events*<br>
So that *I can gain high-level information about cities and events using charts/graphs*.

**<ins>Scenario 6.1:</ins>** Show a chart with the number of upcoming events in each city <br>
**<ins>Given:</ins>** App is loaded in browser <br>
**<ins>When:</ins>** User opens main page with event listings <br>
**<ins>Then:</ins>** Charts/graphs should display event information by city to user <br>

## Serverless Google OAuth/Calendar API:
![Meet serverless architecture diagram](/src/img/Meet_App_Serverless_Diagram.png)
