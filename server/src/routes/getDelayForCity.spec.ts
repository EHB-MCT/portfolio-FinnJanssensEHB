/**Tests for getDelayForCity Route */

import { Response, Request } from "express";
import getDelayForCity from "./getDelayForCity";

describe("Get Delay For City", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let responseObject = {};

  beforeEach(() => {
    mockRequest = {
      query: {
        city: "leuven",
      },
    };
    mockResponse = {
      statusCode: 0,
      send: jest.fn().mockImplementation((result) => {
        responseObject = result;
      }),
    };
  });

  test("200 - delay (cityNumber = 1122)", async () => {
    const expectedStatusCode = 200;
    const expectedResponse = {};

    await getDelayForCity(mockRequest as Request, mockResponse as Response);

    console.log(mockResponse.statusCode);

    expect(mockResponse.statusCode).toBe(expectedStatusCode);
    expect(responseObject).toEqual(expectedResponse);
  });

  test("412 - delay (cityNumber not specified)", async () => {
    const expectedStatusCode = 412;

    await getDelayForCity(mockRequest as Request, mockResponse as Response);

    console.log(mockResponse.statusCode);

    expect(mockResponse.statusCode).toBe(expectedStatusCode);
  });
});
