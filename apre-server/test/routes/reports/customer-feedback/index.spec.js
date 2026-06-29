/**
 * Author: Professor Krasso
 * Date: 10 September 2024
 * File: index.spec.js
 * Description: Test the customer feedback API
 */

// Require the modules
const request = require("supertest");
const app = require("../../../../src/app");
const { mongo } = require("../../../../src/utils/mongo");

jest.mock("../../../../src/utils/mongo");

// Test the customer feedback API
describe("Apre Customer Feedback API", () => {
  beforeEach(() => {
    mongo.mockClear();
  });

  // Test the channel-rating-by-month endpoint
  it("should fetch average customer feedback ratings by channel for a specified month", async () => {
    mongo.mockImplementation(async (callback) => {
      const db = {
        collection: jest.fn().mockReturnThis(),
        aggregate: jest.fn().mockReturnValue({
          toArray: jest.fn().mockResolvedValue([
            {
              channels: ["Email", "Phone"],
              ratingAvg: [4.5, 3.8],
            },
          ]),
        }),
      };
      await callback(db);
    });

    const response = await request(app).get(
      "/api/reports/customer-feedback/channel-rating-by-month?month=1",
    ); // Send a GET request to the channel-rating-by-month endpoint

    // Expect a 200 status code
    expect(response.status).toBe(200);

    // Expect the response body to match the expected data
    expect(response.body).toEqual([
      {
        channels: ["Email", "Phone"],
        ratingAvg: [4.5, 3.8],
      },
    ]);
  });

  // Test the channel-rating-by-month endpoint with missing parameters
  it("should return 400 if the month parameter is missing", async () => {
    const response = await request(app).get(
      "/api/reports/customer-feedback/channel-rating-by-month",
    ); // Send a GET request to the channel-rating-by-month endpoint with missing month
    expect(response.status).toBe(400); // Expect a 400 status code

    // Expect the response body to match the expected data
    expect(response.body).toEqual({
      message: "month and channel are required",
      status: 400,
      type: "error",
    });
  });

  // Test the channel-rating-by-month endpoint with an invalid month
  it("should return 404 for an invalid endpoint", async () => {
    // Send a GET request to an invalid endpoint
    const response = await request(app).get(
      "/api/reports/customer-feedback/invalid-endpoint",
    );
    expect(response.status).toBe(404); // Expect a 404 status code

    // Expect the response body to match the expected data
    expect(response.body).toEqual({
      message: "Not Found",
      status: 404,
      type: "error",
    });
  });

  /**
   * M-107: Customer Feedback by Region
   * Added three new unit tests for the /by-region API endpoint
   * as part of Sprint 3 Major Task requirements.
   */

  describe("GET /api/reports/customer-feedback/by-region", () => {
    // Mock the MongoDB response for grouped region data
    it("should group feedback records by region", async () => {
      mongo.mockImplementation(async (callback) => {
        await callback({
          collection: () => ({
            aggregate: () => ({
              toArray: () =>
                Promise.resolve([
                  {
                    regions: ["North", "South"],
                    counts: [2, 1],
                  },
                ]),
            }),
          }),
        });
      });

      // Send GET request to the /by-region endpoint
      const res = await request(app)
        .get("/api/reports/customer-feedback/by-region")
        .expect(200);

      // Expect the regions and counts arrays to match the mocked data
      expect(res.body[0].regions).toEqual(["North", "South"]);
      expect(res.body[0].counts).toEqual([2, 1]);
    });

    it("should return empty arrays when no feedback exists", async () => {
      // Mock the MongoDB response with empty arrays
      mongo.mockImplementation(async (callback) => {
        await callback({
          collection: () => ({
            aggregate: () => ({
              toArray: () => Promise.resolve([{ regions: [], counts: [] }]),
            }),
          }),
        });
      });

      // Send GET request to the /by-region endpoint
      const res = await request(app)
        .get("/api/reports/customer-feedback/by-region")
        .expect(200); // Expect a 200 status code

      // Expect empty arrays when no records are found
      expect(res.body[0].regions).toEqual([]);
      expect(res.body[0].counts).toEqual([]);
    });

    it("should return JSON response", async () => {
      // Mock the MongoDB response with a single region
      mongo.mockImplementation(async (callback) => {
        await callback({
          collection: () => ({
            aggregate: () => ({
              toArray: () =>
                Promise.resolve([{ regions: ["West"], counts: [1] }]),
            }),
          }),
        });
      });

      // Send GET request to the /by-region endpoint
      const res = await request(app)
        .get("/api/reports/customer-feedback/by-region")
        .expect("Content-Type", /json/) // Expect JSON content type
        .expect(200); // Expect a 200 status code

      // Expect the response body to be an array
      expect(Array.isArray(res.body)).toBe(true);
    });
  });
});
