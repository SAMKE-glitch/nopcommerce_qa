Feature: User Registration

  # As a user, I want to register successfully on the website
  # to be able to create an account and access the platform.

  Scenario: User can see the registration form
    Given the user is on the registration page
    Then the registration form should be visible