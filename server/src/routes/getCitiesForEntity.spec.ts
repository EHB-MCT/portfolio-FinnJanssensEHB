import { Response, Request } from "express";
import { dbGetCitiesForEntity } from "../db/queryFunctions";
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
    const expectedResponse = await dbGetCitiesForEntity(4);

    await getCitiesForEntity(mockRequest as Request, mockResponse as Response);

    console.log(mockResponse.statusCode);

    expect(mockResponse.statusCode).toBe(expectedStatusCode);
    expect(responseObject).toEqual(expectedResponse);
  });

  test("412 - cities (no entity specified)", async () => {
    const expectedStatusCode = 412;
    mockRequest.query = {
      entity: "",
    };

    await getCitiesForEntity(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.statusCode).toBe(expectedStatusCode);
  });
  test("412 - cities (wrong entity specified)", async () => {
    const expectedStatusCode = 412;
    mockRequest.query = {
      entity: "a",
    };

    await getCitiesForEntity(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.statusCode).toBe(expectedStatusCode);
  });
  test("412 - cities (entity number is not in range 1-5)", async () => {
    const expectedStatusCode = 412;
    mockRequest.query = {
      entity: "6",
    };

    await getCitiesForEntity(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.statusCode).toBe(expectedStatusCode);
  });
});
