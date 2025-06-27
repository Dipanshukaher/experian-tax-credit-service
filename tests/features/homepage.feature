Feature: Experian forms

  @TC-1
  Scenario: Validate register and name confirmation
    Given User navigates to home page
    When User enters the details
      | Question     | Value                   |
      | FirstName    | Dipanshu                |
      | LastName     | Kaher                   |
      | Email        | dipanshu_kaher@mail.com |
      | AddressLine1 | "341, Sector 6"         |
      | City         | Hyderabad               |
      | PostalCode   |                   12331 |
    When User answers the questionnaire
    Then User validates name
    Then User is redirected to home page
