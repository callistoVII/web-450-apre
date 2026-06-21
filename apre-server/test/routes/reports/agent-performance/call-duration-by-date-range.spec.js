/**
 * Author: Niki Nielsen
 * Date: 06/21/2026
 * File: call-duration-by-date-range.spec.js
 * Description:
 * Unit tests for the Sprint 2 Major Task
 * Tests verify -
 * 1 - missing query parameters return a 400 error
 * 2 - valid query parameters return a 200 response
 * 3 - the response structure matches the expected APRE report format
 */

"use strict";

const request = require("supertest");
const app = require("../../../../src/app");

describe("GET /reports/agent-performance/call-duration-by-date-range", () => {
  /**
   * Test 1:
   * Ensures the API returns a 400 Bad Request when either
   * startDate or endDate is missing.
   */
  it("should return 400 when startDate or endDate is missing", async () => {
    const res = await request(app).get(
      "/reports/agent-performance/call-duration-by-date-range?startDate=2024-08-07",
    );

    expect(res.status).toBe(400);
    expect(res.text).toContain("Start date and end date are required");
  });

  /**
   * Test 2:
   * Ensures the API returns a 200 OK response when both
   * startDate and endDate are provided.
   */
  it("should return 200 when both startDate and endDate are provided", async () => {
    const res = await request(app).get(
      "/reports/agent-performance/call-duration-by-date-range?startDate=2024-08-07&endDate=2024-08-07",
    );

    expect(res.status).toBe(200);
  });

  /**
   * Test 3:
   * Ensures the response body contains the expected structure:
   * an array with objects containing `agents` and `callDurations`.
   */
  it("should return a response with agents and callDurations arrays", async () => {
    const res = await request(app).get(
      "/reports/agent-performance/call-duration-by-date-range?startDate=2024-08-07&endDate=2024-08-08",
    );

    expect(Array.isArray(res.body)).toBe(true);

    const report = res.body[0];

    expect(report).toHaveProperty("agents");
    expect(report).toHaveProperty("callDurations");

    expect(Array.isArray(report.agents)).toBe(true);
    expect(Array.isArray(report.callDurations)).toBe(true);
  });
});
