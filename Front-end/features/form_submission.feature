Feature: Form Submission
    Scenario: Submit form with valid credentials
    Given the user is on the form page
    When the user enters a valid username and password
    And submits the form
    Then the user should see the submission result
