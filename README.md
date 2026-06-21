# APRE Brownfield Project (WEB‑450)

This repository contains the APRE (Agent Performance Reporting Engine) Brownfield Project for WEB‑450.  
It includes documentation, feature development, and unit testing for enhancements made to the existing MEAN stack application.

## Running the Application

```
cd apre-server
npm install
npm start
```

backend runs at: http://localhost:3000

## Start the Angular Client

```
cd apre-client
npm install
npm start
```

client runs at: http://localhost:4200

## Week 2 Major Task: Sales Summary Report

This project includes a new feature:
Backend route: GET /api/reports/sales-summary
Frontend component: SalesSummaryComponent
Sidebar navigation link: Added under Sales Reports
Unit Tests: Full coverage for API call, rendering, and empty state

To view report in running application:
http://localhost:4200/reports/sales/sales-summary

## Week 3 Major Task: Call Duration by Date Range Report

This week's Major Task adds a new Agent Performance report that returns total call duration for all agents within a selected date range.

Backend API

- Route:
  GET /api/reports/agent-performance/call-duration-by-date-range?startDate={ISO}&endDate{ISO}
  - Behavior"
    Accepts a start and end date, queries MongoDB for matching call logs, aggregates total call duration per agent, and returns the results.
  - Tests:
    Three Jest tests covering -
    1 - Missing Parameters (400 Responses)
    2 - Valid Request (200 Response)
    3 - Correct response structure

To view report in running application:
http://localhost:4200/reports/agent-performance/call-duration-by-date-range

## Running Unit Tests

All Angular unit tests - including new Call Duration by Date Range tests - can be executed with:

```
cd apre-client
ng test
```

Will launch the Karma test runner and execute all component tests.
