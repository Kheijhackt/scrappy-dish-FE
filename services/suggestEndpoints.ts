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
    result = {
      id: null,
      title: response.data.data.title,
      description: response.data.data.description,
      ingredientsUsed: response.data.data.ingredients_used,
      steps: response.data.data.steps,
      cookTimeMinutes: response.data.data.cook_time_minutes,
      difficulty: response.data.data.difficulty,
      servings: response.data.data.servings,
      cuisineTags: response.data.data.cuisine_tags,
      dishTags: response.data.data.dish_tags,
      generalTags: response.data.data.general_tags,
      nutritionNotes: response.data.data.nutrition_notes,
    };
  }

  return result;
}
