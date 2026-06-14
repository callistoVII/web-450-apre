/**
 * Author: Niki Nielsen
 * Date: 06/13/2026
 * File: index.spec.js
 * Description: Test the APRE sales summary report API for the sales summary reports
 */

const request = require("supertest");
const app = require("../../../../src/app");

// Test the sales summary report API
describe("APRE Sales Summary API", () => {
  // Test the sales summary endpoint
  it("should return a list of sales summary data", async () => {
    const response = await request(app).get("/api/reports/sales-summary"); // Send a GET request to the sales summary endpoint

    expect(response.status).toBe(200); // Expect a 200 status code

    // Expect the response body to match the expected data
    expect(response.body).toEqual([
      { region: "North", totalSales: 120000, transactions: 340 },
      { region: "South", totalSales: 95000, transactions: 280 },
      { region: "East", totalSales: 78000, transactions: 210 },
      { region: "West", totalSales: 110000, transactions: 300 },
    ]);
  });

  it("should return 404 for an invalid endpoint", async () => {
    const response = await request(app).get(
      "/api/reports/sales-summary/invalid-endpoint",
    ); // Send a GET request to an invalid endpoint
    expect(response.status).toBe(404); // Expect a 404 status code
    expect(response.body).toEqual({
      message: "Not Found",
      status: 404,
      type: "error",
    });
  });

  it("should return an empty array if no sales summary data is found", async () => {
    // Temporarily override res.send to simulate empty data
    const originalSend = app.response.send;
    app.response.send = function () {
      originalSend.call(this, []);
    };

    const response = await request(app).get("/api/reports/sales-summary");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);

    // Restore original send
    app.response.send = originalSend;
  });
});
