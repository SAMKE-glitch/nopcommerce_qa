Feature: Search Laptop and Checkout

  Background:
    Given I am on the login page
    And I enter my account credentials
    And I click the Submit button
    Then I should be redirected to the dashboard

  Scenario: Search for Dell laptop 20000 and add to cart
    When I click on the search field container
    And I type "dell laptop 20000" into the search field
    And I click the search button
    Then I should see search results for "dell laptop 20000"
    When I click on the first search result item
    And I add the item to the cart
    Then I should see the success message "Successfully Added to Shopping Cart"
    And I should see the cart notification icon

  Scenario: Proceed to checkout
    Given I have an item in my cart
    When I click on the cart icon
    And I click on the Proceed to Check out button
    Then I should be redirected to the checkout page
