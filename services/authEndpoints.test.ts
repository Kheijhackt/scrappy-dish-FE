import * as apiHelper from "../utils/apiHelper";
import * as authStore from "../utils/authStore";
import { googleAuth, logout, verifyMe } from "./authEndpoints";

jest.mock("../utils/apiHelper");
jest.mock("../utils/authStore");

describe("authEndpoints logic", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("verifyMe", () => {
    test("should return false if no token is found", async () => {
      (authStore.getToken as jest.Mock).mockResolvedValue(null);

      const result = await verifyMe();

      expect(result).toBe(false);
      expect(apiHelper.fetchEndpoint).not.toHaveBeenCalled();
    });

    test("should return true if API returns 200", async () => {
      (authStore.getToken as jest.Mock).mockResolvedValue("fake-token");
      (apiHelper.fetchEndpoint as jest.Mock).mockResolvedValue({ status: 200 });

      const result = await verifyMe();

      expect(result).toBe(true);
    });
  });

  describe("googleAuth", () => {
    test("should save token and return true on successful login", async () => {
      const mockToken = "valid-auth-token";
      (apiHelper.fetchEndpoint as jest.Mock).mockResolvedValue({
        status: 200,
        data: { token: mockToken },
      });
      (authStore.saveToken as jest.Mock).mockResolvedValue(mockToken);

      const result = await googleAuth("google-id-token");

      expect(authStore.saveToken).toHaveBeenCalledWith(mockToken);
      expect(result).toBe(true);
    });
  });

  describe("logout", () => {
    test("should delete token only if API logout is successful", async () => {
      (apiHelper.fetchEndpoint as jest.Mock).mockResolvedValue({ status: 200 });

      const result = await logout({ logoutAll: false });

      expect(result).toBe(true);
      expect(authStore.deleteToken).toHaveBeenCalled();
    });
  });

  describe("logoutAll", () => {
    test("shuold delete token only if API logoutAll is successful", async () => {
      (apiHelper.fetchEndpoint as jest.Mock).mockResolvedValue({ status: 200 });

      const result = await logout({ logoutAll: true });

      expect(result).toBe(true);
      expect(authStore.deleteToken).toHaveBeenCalled();
    });
  });
});
