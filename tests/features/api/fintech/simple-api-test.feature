@TEAM=fintech
@FEATURE=self-serve-formal
@SITE=consumer
@REGION=SG
@SUITE=regression
@SERVICE=fintech-api
@EPIC=FINTECH-5197
@TYPE=api
@ENDPOINT=/posts/1
Feature: Sample API Test

  Scenario: Sample API Test
    Given I want to execute a GET request to "https://jsonplaceholder.typicode.com/posts/1"
    When I execute the request
    Then I should receive a response with status 200
