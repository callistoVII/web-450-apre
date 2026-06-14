/**
 * Author: Niki Nielsen
 * Date: 06/13/2026
 * File: index.js
 * Description: APRE sales summary report API for the sales summary reports
 */

"use strict";

const express = require("express");
const { mongo } = require("../../../utils/mongo");

const router = express.Router();

/**
 * @description
 * GET /
 *
 * Returns a summary of total sales and transaction counts grouped by region.
 *
 * Example:
 * fetch('/api/reports/sales-summary')
 * .then(res => res.json())
 * .then(console.log);
 */
router.get("/", (req, res, next) => {
  try {
    // static mock data for sales summary report Major Task
    const summary = [
      { region: "North", totalSales: 120000, transactions: 340 },
      { region: "South", totalSales: 95000, transactions: 280 },
      { region: "East", totalSales: 78000, transactions: 210 },
      { region: "West", totalSales: 110000, transactions: 300 },
    ];

    res.send(summary);
  } catch (err) {
    console.error("Error getting sales summary: ", err);
    next(err);
  }
});

module.exports = router;
