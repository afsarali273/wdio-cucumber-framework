@TYPE=ui @DEVICE=desktop @sh
Feature: SendHelper Landing Page

  Scenario: Verify landing page
    Given I am on the SendHelper landing page
    Then I should see "SendHelper" in the title