@mobile  @DEVICE=ios @DEVICE=android @in-progress
Feature: Mortgage Comparison tool navigation

  Scenario: Mortgage Comparison tool navigation
    Given I launch the app
    When I click on the more icon to navigate to the mortgage page
#    Then I should see ipa landing page
    When I click on the Get Started button
    Then I should see IPA onboarding screen
    And I choose below answers to onboarding questions
      | question         | answer                 |
      | mortgagePlan     | New Mortgage           |
      | propertyTimeline | Just started my search |
      | purchaseTimeline | Getting prepared       |
      | nextSteps        | Compare loan offers    |
    Then I should see mortgage comparison screen
