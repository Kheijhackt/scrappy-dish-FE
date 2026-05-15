import { API_ENDPOINTS } from "@/constants/config";
import { UserPreferences } from "@/types/userPreferences";
import * as apiHelper from "../utils/apiHelper";

export async function getUserPreferences(): Promise<UserPreferences | null> {
  let result = null;

  const response = await apiHelper.fetchEndpoint(
    "GET",
    API_ENDPOINTS.USER_PREFERENCES,
  );

  if (response) {
    result = {
      available_ingredients: response.data.data.available_ingredients,
      dietary_preferences: response.data.data.dietary_preferences,
      cuisine_preferences: response.data.data.cuisine_preferences,
      dish_preferences: response.data.data.dish_preferences,
      available_equipments: response.data.data.available_equipments,
    };
  }

  return result;
}

export async function updateUserPreferences(
  userPreferences: Partial<UserPreferences>,
): Promise<UserPreferences | null> {
  let result = null;

  const response = await apiHelper.fetchEndpoint(
    "PATCH",
    API_ENDPOINTS.USER_PREFERENCES,
    userPreferences,
  );

  if (response) {
    result = {
      available_ingredients: response.data.data.available_ingredients,
      dietary_preferences: response.data.data.dietary_preferences,
      cuisine_preferences: response.data.data.cuisine_preferences,
      dish_preferences: response.data.data.dish_preferences,
      available_equipments: response.data.data.available_equipments,
    };
  }

  return result;
}
