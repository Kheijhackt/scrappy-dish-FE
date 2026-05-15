import * as recipeEndpoints from "@/services/recipeEndpoints";
import * as suggestEndpoints from "@/services/suggestEndpoints";
import { Recipe } from "@/types/recipe";
import { RecipeRequest } from "@/types/recipeRequest";
import { logger } from "@/utils/logger";
import { router } from "expo-router";
import { useState } from "react";
import { Button, FlatList, Text, View } from "react-native";

export default function SuggestScreen() {
  const [suggestedRecipes, setSuggestedRecipes] = useState<Recipe[] | null>(
    null,
  );
  const mockPreferences: RecipeRequest = {
    cook_time_minutes: 10,
    difficulty: 5,
    servings: 5,
    additional_instructions: "I want it yummy.",
  };

  const suggestMultipleRecipes = async () => {
    const response = await suggestEndpoints.getMultipleRecipes(mockPreferences);
    logger(SuggestScreen.name, JSON.stringify(response, null, 2));
    if (response) {
      setSuggestedRecipes(response);
    }
  };

  const saveRecipe = async (recipe: Recipe) => {
    const response = await recipeEndpoints.saveRecipe(recipe);
  };

  const Item = ({ recipe }: { recipe: Recipe }) => {
    return (
      <View>
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
        <Button title="Save" onPress={() => saveRecipe(recipe)} />
      </View>
    );
  };

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Text>Suggest Screen</Text>
      <Button
        title="Preferences"
        onPress={() => {
          router.push("/suggest/preferences");
        }}
      />
      <Button title="Suggest recipes" onPress={suggestMultipleRecipes} />

      {suggestedRecipes ? (
        <FlatList
          data={suggestedRecipes}
          renderItem={(x) => <Item recipe={x.item} />}
          keyExtractor={(_, index) => index.toString()}
        />
      ) : (
        <></>
      )}
    </View>
  );
}
