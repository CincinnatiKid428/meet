Feature: Specify Number of Events
  Scenario: When user has not specified a number, 32 events are shown by default
    Given app is open and events have loaded
    When user does not enter number of events
    Then a maximum of 32 events will be shown

  Scenario: User can change the number of events displayed
    Given app is open and events have loaded
    When user enters number of events in textbox
    Then a maximum of the entered-number of events will be shown