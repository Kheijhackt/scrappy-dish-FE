import * as recipeEndpoints from "@/services/recipeEndpoints";
import * as suggestEndpoints from "@/services/suggestEndpoints";
import { Recipe } from "@/types/recipe";
import { useEffect, useState } from "react";
import { Button } from "react-native";
import { Text, View } from "tamagui";

export default function HomeScreen() {
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    const suggestRecipe = async () => {
      const response = await suggestEndpoints.getOneRecipe();
      setRecipe(response);
    };
    suggestRecipe();
  }, []);

  const saveRecipe = async () => {
    if (recipe) {
      const response = await recipeEndpoints.saveRecipe(recipe);
    }
  };
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home Screen</Text>
      <Text>{recipe?.title}</Text>
      <Text>{recipe?.description}</Text>
      <Text>{recipe?.ingredients_used[0]}</Text>
      <Text>{recipe?.steps[0]}</Text>
      <Text>{recipe?.cook_time_minutes}</Text>
      <Text>{recipe?.difficulty}</Text>
      <Text>{recipe?.servings}</Text>
      <Text>{recipe?.cuisine_tags[0]}</Text>
      <Text>{recipe?.dish_tags[0]}</Text>
      <Text>{recipe?.general_tags[0]}</Text>
      <Text>{recipe?.nutrition_notes}</Text>

      <Button title="Save recipe" onPress={saveRecipe} />
    </View>
  );
}
