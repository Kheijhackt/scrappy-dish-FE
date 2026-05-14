import { API_ENDPOINTS } from "@/constants/config";
import { Recipe } from "@/types/recipe";
import * as apiHelper from "../utils/apiHelper";

export async function getOneRecipe(): Promise<Recipe | null> {
  let result = null;

  const response = await apiHelper.fetchEndpoint(
    "GET",
    API_ENDPOINTS.SUGGEST_SINGLE,
  );
  if (response) {
    result = response.data.data;
  }

  return result;
}
