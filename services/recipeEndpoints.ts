import { API_ENDPOINTS } from "@/constants/config";
import { Recipe } from "@/types/recipe";
import * as apiHelper from "../utils/apiHelper";

export async function saveRecipe(recipe: Recipe | null): Promise<boolean> {
  let result = false;

  const finalRecipe = {
    title: recipe?.title,
    description: recipe?.description,
    ingredients_used: recipe?.ingredientsUsed,
    steps: recipe?.steps,
    cook_time_minutes: recipe?.cookTimeMinutes,
    difficulty: recipe?.difficulty,
    servings: recipe?.servings,
    cuisine_tags: recipe?.cuisineTags ?? [],
    dish_tags: recipe?.dishTags ?? [],
    general_tags: recipe?.generalTags ?? [],
    nutrition_notes: recipe?.nutritionNotes,
  };

  const response = await apiHelper.fetchEndpoint(
    "POST",
    API_ENDPOINTS.RECIPE_SAVE,
    finalRecipe,
  );

  if (response) result = true;

  return result;
}
