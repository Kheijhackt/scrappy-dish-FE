import Dialog from "@/components/ui/Dialog";
import Loading from "@/components/ui/Loading";
import RecipeAccordion from "@/components/ui/RecipeAccordion";
import * as recipeEndpoints from "@/services/recipeEndpoints";
import * as suggestEndpoints from "@/services/suggestEndpoints";
import { Recipe } from "@/types/recipe";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Accordion, Heading, ScrollView, YStack } from "tamagui";

export default function HomeScreen() {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false);

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
    setShowDialog(true);
  };

  return (
    <ScrollView backgroundColor="$background" flex={1}>
      <SafeAreaView>
        <YStack padding="$4" gap="$4" flex={1} justifyContent="center">
          <Loading isLoading={loading} />

          <Heading
            size="$7"
            textAlign="center"
            color="$color"
            marginBottom="$1"
          >
            Recipe You Might Like
          </Heading>

          {recipe ? (
            <>
              <Accordion
                type="multiple"
                value={expandedItems}
                onValueChange={setExpandedItems}
              >
                <RecipeAccordion
                  recipe={recipe}
                  index={0}
                  onSave={saveRecipe}
                />
              </Accordion>
              <Dialog
                isShowing={showDialog}
                description="Recipe successfully saved."
                button1Name="Okay"
                button1Callback={() => setShowDialog(false)}
                onClose={() => setShowDialog(false)} // Allows clicking outside to dismiss safely
              />
            </>
          ) : (
            <></>
          )}
        </YStack>
      </SafeAreaView>
    </ScrollView>
  );
}
