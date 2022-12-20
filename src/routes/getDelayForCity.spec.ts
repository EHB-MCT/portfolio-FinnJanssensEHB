import { Response, Request } from "express";
import getDelayForCity from "./getDelayForCity";

describe("Get Delay For City", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let responseObject = {};

  beforeEach(() => {
    mockRequest = {
      query: {
        cityNumber: "1122",
      },
    };
    mockResponse = {
      statusCode: 0,
      send: jest.fn().mockImplementation((result) => {
        responseObject = result;
      }),
    };
  });

  test("200 - cities (entity = 4)", async () => {
    const expectedStatusCode = 200;
    const expectedResponse = {};

    await getDelayForCity(mockRequest as Request, mockResponse as Response);

    console.log(mockResponse.statusCode);

    expect(mockResponse.statusCode).toBe(expectedStatusCode);
    expect(responseObject).toEqual(expectedResponse);
  });
});
