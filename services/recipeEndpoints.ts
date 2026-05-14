import { API_ENDPOINTS } from "@/constants/config";
import { Recipe } from "@/types/recipe";
import * as apiHelper from "../utils/apiHelper";

export async function saveRecipe(recipe: Recipe | null): Promise<boolean> {
  let result = false;

  const response = await apiHelper.fetchEndpoint(
    "POST",
    API_ENDPOINTS.RECIPE_SAVE,
    recipe,
  );

  if (response) result = true;

  return result;
}

export async function loadSummaryRecipes(
  pageNumber: number,
  perPage: number,
): Promise<Recipe[] | null> {
  let result = null;

  const response = await apiHelper.fetchEndpoint(
    "GET",
    API_ENDPOINTS.RECIPES(pageNumber, perPage),
  );

  if (response) {
    result = response.data.data.recipes;
  }

  return result;
}

export async function loadOneRecipe(id: number): Promise<Recipe | null> {
  let result = null;

  const response = await apiHelper.fetchEndpoint(
    "GET",
    API_ENDPOINTS.RECIPE(id),
  );

  if (response) {
    result = response.data.data;
  }

  return result;
}

export async function deleteRecipe(id: number): Promise<boolean> {
  let result = false;

  const response = await apiHelper.fetchEndpoint(
    "DELETE",
    API_ENDPOINTS.RECIPE(id),
  );

  if (response) {
    result = true;
  }

  return result;
}
