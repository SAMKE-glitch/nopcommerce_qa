Feature: Search Functionality
  As a user
  I want to search for products
  So that I can find what I'm looking for

  Scenario: Search for a product
    Given I am on the homepage
    When I search for "laptop"
    Then I should see results related to "laptop"