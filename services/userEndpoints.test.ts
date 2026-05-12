import * as apiHelper from "../utils/apiHelper";

jest.mock("../utils/apiHelper");
jest.mock("./userEndpoints");

describe("userEndpoints logic", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const responsePayload = {
    id: 1,
    name: "John Doe",
    avatar: "https://example.com/avatar.jpg",
  };

  const result = (apiHelper.fetchEndpoint as jest.Mock).mockResolvedValue(
    responsePayload,
  );

  expect(result).toBe(responsePayload);
});
