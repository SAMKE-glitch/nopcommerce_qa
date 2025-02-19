Feature: Login Page Access

  # As a user, I want to navigate to the login page so that I can access my account.
  # This scenario verifies that the login page loads successfully.
  Scenario: Login page loads successfully
    Given I am on the login page

  # As a user, after loading the login page, I want my credentials to be filled in correctly.
  Scenario: Credentials are successfully entered
    Given I am on the login page
    When I enter "sammythemwa@gmail.com" as the email and "Ednah2025" as the password
    Then credentials are successfully entered