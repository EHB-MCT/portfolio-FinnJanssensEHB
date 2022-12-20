import { Response, Request } from "express";
import { getCities } from "../db/queryFunctions";
import getCitiesForEntity from "./getCitiesForEntity";

describe("Get Cities For Entity", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let responseObject = {};

  beforeEach(() => {
    mockRequest = {
      query: {
        entity: "4",
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
    const expectedResponse = await getCities(4);

    await getCitiesForEntity(mockRequest as Request, mockResponse as Response);

    console.log(mockResponse.statusCode);

    expect(mockResponse.statusCode).toBe(expectedStatusCode);
    expect(responseObject).toEqual(expectedResponse);
  });
});