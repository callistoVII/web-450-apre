/**
 * Author: Nicole Nielsen
 * Date: 06/28/2026
 * File: call-duration-by-date-range.spec.js
 * Description: Server-side unit tests for the Call Duration By Date Range API.
 * These tests verify:
 * 1) Required query parameters are enforced
 * 2) Valid requests return a 200 response
 * 3) API responses include expected fields and data structures
 */

const request = require("supertest");
const app = require("../../../../src/app");
const { mongo } = require("../../../../src/utils/mongo");

jest.mock("../../../../src/utils/mongo");

describe("GET /api/reports/agent-performance/call-duration-by-date-range", () => {
  beforeEach(() => {
    mongo.mockClear();
  });

  /**
   * Test 1:
   * Ensures the API returns 400 when either startDate or endDate is missing.
   */
  it("should return 400 when startDate or endDate is missing", async () => {
    const res = await request(app).get(
      "/api/reports/agent-performance/call-duration-by-date-range?startDate=2024-08-07",
    );

    expect(res.status).toBe(400);
    expect(res.text).toContain("Start date and end date are required");
  });

  /**
   * Test 2:
   * Ensures the API returns 200 for valid date range requests.
   */
  it("should return 200 when both startDate and endDate are provided", async () => {
    mongo.mockImplementation(async (callback) => {
      const db = {
        collection: jest.fn().mockReturnThis(),
        aggregate: jest.fn().mockReturnValue({
          toArray: jest.fn().mockResolvedValue([]),
        }),
      };
      await callback(db);
    });

    const res = await request(app).get(
      "/api/reports/agent-performance/call-duration-by-date-range?startDate=2024-08-07&endDate=2024-08-07",
    );

    expect(res.status).toBe(200);
  });

  /**
   * Test 3:
   * Ensures the API response includes agents and callDurations arrays.
   */
  it("should return a response with agents and callDurations arrays", async () => {
    mongo.mockImplementation(async (callback) => {
      const db = {
        collection: jest.fn().mockReturnThis(),
        aggregate: jest.fn().mockReturnValue({
          toArray: jest.fn().mockResolvedValue([
            {
              agents: ["Agent A", "Agent B"],
              callDurations: [120, 150],
            },
          ]),
        }),
      };
      await callback(db);
    });

    const res = await request(app).get(
      "/api/reports/agent-performance/call-duration-by-date-range?startDate=2024-08-07&endDate=2024-08-08",
    );

    expect(Array.isArray(res.body)).toBe(true);

    const report = res.body[0];

    expect(report).toHaveProperty("agents");
    expect(report).toHaveProperty("callDurations");

    expect(Array.isArray(report.agents)).toBe(true);
    expect(Array.isArray(report.callDurations)).toBe(true);
  });
});
