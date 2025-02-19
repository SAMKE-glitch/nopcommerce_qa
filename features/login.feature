Feature: Login Page Access

  Scenario: Login page loads successfully
    Given I am on the login page

  Scenario: Credentials are successfully entered
    Given I am on the login page
    When I enter my credentials
    Then credentials are successfully entered