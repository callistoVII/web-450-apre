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

## Feature Added: Sales Summary Report

This project includes a new feature:
Backend route: GET /api/reports/sales-summary
Frontend component: SalesSummaryComponent
Sidebar navigation link: Added under Sales Reports
Unit Tests: Full coverage for API call, rendering, and empty state

To view report in running application:
http://localhost:4200/reports/sales/sales-summary

## Running Unit Tests

All Angular unit tests - including new Sales Summary tests - can be executed with:

```
cd apre-client
ng test
```

Will launch the Karma test runner and execute all component tests.
