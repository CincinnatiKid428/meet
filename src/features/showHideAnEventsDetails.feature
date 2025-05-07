Feature:  Show/Hide Event Details
  Scenario: An event element is collapsed by default
    Given the app is open
    When user has not clicked on show detals button
    Then details of the event are collapsed

  Scenario: User can expand an event to see details
    Given the app is open
    When user clicks on show details button
    Then event expands to show more details

  Scenario:  User can collapse an event to hide details
    Given the app is open and an event is expanded to show details
    When user clicks on hide details button
    Then event collapses and hides details