import * as recipeEndpoints from "@/services/recipeEndpoints";
import { Recipe } from "@/types/recipe";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Button, FlatList, Text, View } from "react-native";

export default function RecipesScreen() {
  const [recipes, setRecipes] = useState<Recipe[] | null>(null);

  useEffect(() => {
    const getSummaryRecipes = async () => {
      const response = await recipeEndpoints.loadSummaryRecipes(1, 15);
      setRecipes(response);
    };
    getSummaryRecipes();
  }, []);

  const openRecipe = (recipeId: number) => {
    router.push(`/recipes/${recipeId}`);
  };

  const Item = ({
    title,
    description,
    id,
  }: {
    id: number | null;
    title: string;
    description: string;
  }) => (
    <View>
      <Text>{id}</Text>
      <Text>{title}</Text>
      <Text>{description}</Text>
      <Button title="Open" onPress={() => openRecipe(id ?? 0)} />
    </View>
  );

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Recipes Screen</Text>
      <FlatList
        data={recipes}
        renderItem={(x) => (
          <Item
            id={x.item.id}
            title={x.item.title}
            description={x.item.description}
          />
        )}
        keyExtractor={(_, index) => index.toString()}
      />
    </View>
  );
}
