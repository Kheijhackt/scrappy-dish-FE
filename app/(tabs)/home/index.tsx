import Loading from "@/components/ui/Loading";
import RecipeAccordion from "@/components/ui/RecipeAccordion"; // Adjust path if needed
import * as recipeEndpoints from "@/services/recipeEndpoints";
import * as suggestEndpoints from "@/services/suggestEndpoints";
import { Recipe } from "@/types/recipe";
import { useEffect, useState } from "react";
import { Accordion, Heading, ScrollView, YStack } from "tamagui";

export default function HomeScreen() {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);

  // Track which accordion item is open. "recipe-0" targets our single item index fallback.
  const [expandedItems, setExpandedItems] = useState<string[]>(["recipe-0"]);

  useEffect(() => {
    const suggestRecipe = async () => {
      setLoading(true);
      const response = await suggestEndpoints.getOneRecipe();
      setRecipe(response);
      setLoading(false);
    };
    suggestRecipe();
  }, []);

  const saveRecipe = async () => {
    setLoading(true);
    if (recipe) {
      await recipeEndpoints.saveRecipe(recipe);
    }
    setLoading(false);
  };

  return (
    <ScrollView backgroundColor="$background" flex={1}>
      <YStack padding="$4" gap="$4" flex={1} justifyContent="center">
        <Loading isLoading={loading} />

        <Heading size="$7" textAlign="center" color="$color" marginBottom="$1">
          Recipe You Might Like
        </Heading>

        {recipe ? (
          /* 
            Tamagui Accordion Root Wrapper
            - type="multiple" or "single" allows control handling
            - value & onValueChange controls state sync
          */
          <Accordion
            type="multiple"
            value={expandedItems}
            onValueChange={setExpandedItems}
          >
            <RecipeAccordion recipe={recipe} index={0} onSave={saveRecipe} />
          </Accordion>
        ) : null}
      </YStack>
    </ScrollView>
  );
}
