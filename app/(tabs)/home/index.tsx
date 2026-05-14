import * as recipeEndpoints from "@/services/recipeEndpoints";
import * as suggestEndpoints from "@/services/suggestEndpoints";
import { Recipe } from "@/types/recipe";
import { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";

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
      <Text>{recipe?.ingredientsUsed[0]}</Text>
      <Text>{recipe?.steps[0]}</Text>
      <Text>{recipe?.cookTimeMinutes}</Text>
      <Text>{recipe?.difficulty}</Text>
      <Text>{recipe?.servings}</Text>
      <Text>{recipe?.cuisineTags[0]}</Text>
      <Text>{recipe?.dishTags[0]}</Text>
      <Text>{recipe?.generalTags[0]}</Text>
      <Text>{recipe?.nutritionNotes}</Text>

      <Button title="Save recipe" onPress={saveRecipe} />
    </View>
  );
}
