Feature: Login Page Access

  Scenario: Login page loads successfully
    Given I am on the login page

  Scenario: Account credentials are successfully entered
    Given I am on the login page
    When I enter my account credentials
    Then credentials are successfully entered

  Scenario: Successful login redirects to dashboard
    Given I am on the login page
    When I enter my account credentials
    And I click the Submit button
    Then I should be redirected to the dashboard
