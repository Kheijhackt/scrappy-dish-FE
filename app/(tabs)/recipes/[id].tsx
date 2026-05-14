import * as recipeEndpoints from "@/services/recipeEndpoints";
import { Recipe } from "@/types/recipe";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";

export default function DetailedRecipeScreen() {
  const { id } = useLocalSearchParams();
  const recipeId = Number(id);
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    const loadRecipe = async () => {
      const response = await recipeEndpoints.loadOneRecipe(recipeId);
      if (response) {
        setRecipe(response);
      }
    };
    loadRecipe();
  }, []);

  const deleteRecipe = async (id: number) => {
    const response = await recipeEndpoints.deleteRecipe(id);
    if (response) {
      router.back();
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Detailed Recipe Screen for ID: {id}</Text>
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
      <Button title="Delete recipe" onPress={() => deleteRecipe(recipeId)} />
    </View>
  );
}
