Feature: Submit Game Feedback Form

  Scenario: User fills out the feedback form and submits it successfully
    Given the user navigates to the game feedback form
    When the user enters their name "John Doe"
    And the user enters their email "john.doe@example.com"
    And the user enters their phone number "1234567890"
    And the user rates the game 4 stars
    And the user enters a bug report "Game crashes after level 3"
    And the user shares their experience "Great game, but needs more levels"
    And the user selects the genres "Action" and "RPG"
    And the user submits the form
    Then the form should be successfully submitted
    And a confirmation message should be displayed
