Feature: Homepage Interactions

  # As a user, I want to interact with the homepage to verify the visibility of important elements.
  # In this case, ensuring that the 'Register' button is visible on the homepage.

  Scenario: Homepage displays the 'Register' button
    Given the user is on the homepage
    Then the "Register" button should be visible
