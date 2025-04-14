# Meet

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
I should be able to *add a shortcut to this application to the home screen on my mobile device*<br>
So that *I can access the application by without having to go back to the URL*.
6. As a *user* <br>
I should be able to *see visualizations of data about each event*<br>
So that *I can gain information about the event using charts/graphs*.

## User Scenarios:
**<ins>User Story:</ins>** <br>
As a *user* <br>
I should be able to *filter events by city*<br>
So that *I can see a list of events taking place in that city*.

**<ins>Scenario 1:</ins>** When a user hasn't searched for a city, show upcoming events for all cities.<br>
**<ins>Given:</ins>** User hasn't searched for a city <br>
**<ins>When:</ins>** User opens the app<br>
**<ins>Then:</ins>** User should see the list of all upcoming events<br>

**<ins>Scenario 2:</ins>** User should see list of suggestions when they search for a city. <br>
**<ins>Given:</ins>** The main page is open<br>
**<ins>When:</ins>** User starts typing in the city search box<br>
**<ins>Then:</ins>** User should see a list of city suggestions that match what they typed<br>

**<ins>Scenario 3:</ins>** User can select a city from suggested list. <br>
**<ins>Given:</ins>** User was typing "Cincinnati" in city search box AND the list of suggested cities is showing<br>
**<ins>When:</ins>** User selects a city ("Cincinnati, Ohio") from the suggested list<br>
**<ins>Then:</ins>** Their city should be changed to that selected city ("Cininnati, Ohio") AND the user should receive a list of upcoming events in that city<br>

**<ins>User Story:</ins>** <br>
As a *user* <br>
I should be able to *show OR hide details of an event* <br>
So that *I can find out more information about an event OR hide more information about an event*.

**<ins>Scenario 1:</ins>** User hasn't clicked on "Show Details" button for an event.<br>
**<ins>Given:</ins>** The list of events is showing, with or without selecting a city first<br>
**<ins>When:</ins>** User hasn't clicked on the "Show Details" button for an event<br>
**<ins>Then:</ins>** User should not see expanded event with more information about the event<br>

**<ins>Scenario X:</ins>** <br>
**<ins>Given:</ins>** <br>
**<ins>When:</ins>** <br>
**<ins>Then:</ins>** <br>
