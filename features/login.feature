Feature: Login Functionality

  Scenario: User logs in with valid credentials
    Given I am on the login page
    When I enter "sammythemwa@gmail.com" as the email and "Ednah2025" as the password
    And I click the login button
    And I complete human verification
    Then I should be redirected to the dashboard

  Scenario: User logs in with invalid details
    Given I am on the login page
    When I enter "samwelmwawasi4@gmail.com" as the email and "Ednah2030" as the password
    Then I should see an error message
