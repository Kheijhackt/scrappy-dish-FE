import Button from "@/components/ui/Button";
import Dialog from "@/components/ui/Dialog";
import Loading from "@/components/ui/Loading";
import RecipeAccordion from "@/components/ui/RecipeAccordion";
import * as recipeEndpoints from "@/services/recipeEndpoints";
import * as suggestEndpoints from "@/services/suggestEndpoints";
import { Recipe } from "@/types/recipe";
import { RecipeRequest } from "@/types/recipeRequest";
import { logger } from "@/utils/logger";
import { Settings, Sparkles } from "@tamagui/lucide-icons-2";
import { useState } from "react";
import { FlatList } from "react-native";
import {
  Accordion,
  Heading,
  Paragraph,
  ScrollView,
  Sheet,
  SizableText,
  Button as TButton,
  TextArea,
  View,
  XStack,
  YStack,
} from "tamagui";

export default function SuggestScreen() {
  const [suggestedRecipes, setSuggestedRecipes] = useState<Recipe[] | null>(
    null,
  );
  const [isSheetOpen, setIsSheetOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  // Accordion open/close state tracking
  const [openRecipes, setOpenRecipes] = useState<string[]>([]);

  // Stepper boundary rules variables
  const [cookTime, setCookTime] = useState(10);
  const [difficulty, setDifficulty] = useState(5);
  const [servings, setServings] = useState(5);
  const [instructions, setInstructions] = useState("I want it yummy.");

  const suggestMultipleRecipes = async () => {
    setLoading(true);
    const payload: RecipeRequest = {
      cook_time_minutes: cookTime,
      difficulty: difficulty,
      servings: servings,
      additional_instructions: instructions,
    };

    setIsSheetOpen(false);
    const response = await suggestEndpoints.getMultipleRecipes(payload);
    logger(SuggestScreen.name, JSON.stringify(response, null, 2));

    if (response) {
      setSuggestedRecipes(response);
      // Reset expanded accordions back to defaults on fresh fetches
      setOpenRecipes([]);
    }

    setLoading(false);
  };

  const saveRecipe = async (recipe: Recipe) => {
    setLoading(true);
    await recipeEndpoints.saveRecipe(recipe);
    setLoading(false);
    setShowDialog(true);
  };

  // Clamps adjustable parameters between a safe lower and optional upper boundary
  const adjustValue = (
    current: number,
    setter: (v: number) => void,
    step: number,
    min: number,
    max: number = Infinity,
  ) => {
    setter(Math.min(max, Math.max(min, current + step)));
  };

  return (
    <View backgroundColor="$background" flex={1} position="relative">
      {/* Primary Canvas Container */}
      <YStack padding="$4" flex={1}>
        <Loading isLoading={loading} />
        <Dialog
          isShowing={showDialog}
          title="Notice"
          description="Recipe saved!"
          button1Name="Okay"
          button1Callback={() => setShowDialog(false)}
        />

        {suggestedRecipes ? (
          <Accordion
            type="multiple"
            value={openRecipes}
            onValueChange={setOpenRecipes}
            width="100%"
          >
            <FlatList
              data={suggestedRecipes}
              keyExtractor={(_, index) => index.toString()}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 80 }}
              renderItem={({ item: recipe, index }) => (
                <RecipeAccordion
                  recipe={recipe}
                  index={index}
                  onSave={saveRecipe}
                />
              )}
            />
          </Accordion>
        ) : (
          <YStack flex={1} justifyContent="center" alignItems="center" gap="$2">
            <Paragraph size="$4" color="$color" opacity={0.5}>
              No suggestions generated yet.
            </Paragraph>
            <Button
              onPress={() => setIsSheetOpen(true)}
              name="Configure Preferences"
              icon={<Settings />}
            />
          </YStack>
        )}
      </YStack>

      {/* Floating Action Config Entry Point */}
      {suggestedRecipes && (
        <Button
          onPress={() => setIsSheetOpen(true)}
          name=""
          icon={<Sparkles />}
        />
      )}

      {/* Slidable Variable Entry Configuration Frame */}
      <Sheet
        modal
        open={isSheetOpen}
        onOpenChange={setIsSheetOpen}
        snapPoints={[85]}
        dismissOnSnapToBottom
      >
        <Sheet.Overlay />
        <Sheet.Handle />
        <Sheet.Frame backgroundColor="$background" padding="$4" gap="$4">
          <ScrollView showsVerticalScrollIndicator={false}>
            <YStack gap="$4" paddingBottom="$6">
              <YStack gap="$1">
                <Heading size="$5" color="$color">
                  AI Generation Engine
                </Heading>
                <Paragraph
                  size="$2"
                  color="$color"
                  opacity={0.6}
                  lineHeight="$2"
                >
                  This system crafts tailored menus dynamically using advanced
                  artificial intelligence patterns. Fine-tune your constraints
                  below to generate optimal suggestions matching your local
                  kitchen setup perfectly.
                </Paragraph>
              </YStack>

              {/* Bounded Configuration Item Controllers */}
              <YStack gap="$3" marginTop="$2">
                {/* Cook Time - Locked at a minimum threshold of 5 minutes */}
                <XStack
                  justifyContent="space-between"
                  alignItems="center"
                  borderWidth={1}
                  borderColor="$borderColor"
                  padding="$3"
                  borderRadius="$3"
                >
                  <YStack>
                    <SizableText size="$3" fontWeight="600" color="$color">
                      Cook Time
                    </SizableText>
                    <Paragraph size="$1" color="$color" opacity={0.5}>
                      Minimum 5 mins threshold
                    </Paragraph>
                  </YStack>
                  <XStack gap="$3" alignItems="center">
                    <TButton
                      size="$2"
                      circular
                      backgroundColor="$backgroundHover"
                      onPress={() => adjustValue(cookTime, setCookTime, -5, 5)}
                    >
                      -
                    </TButton>
                    <SizableText
                      size="$3"
                      fontWeight="700"
                      color="$color"
                      minWidth={45}
                      textAlign="center"
                    >
                      {cookTime}m
                    </SizableText>
                    <TButton
                      size="$2"
                      circular
                      backgroundColor="$backgroundHover"
                      onPress={() => adjustValue(cookTime, setCookTime, 5, 5)}
                    >
                      +
                    </TButton>
                  </XStack>
                </XStack>

                {/* Difficulty Metric - Strict boundary encapsulation [1 to 10] */}
                <XStack
                  justifyContent="space-between"
                  alignItems="center"
                  borderWidth={1}
                  borderColor="$borderColor"
                  padding="$3"
                  borderRadius="$3"
                >
                  <YStack>
                    <SizableText size="$3" fontWeight="600" color="$color">
                      Difficulty Ceiling
                    </SizableText>
                    <Paragraph size="$1" color="$color" opacity={0.5}>
                      Strict scale limit [1 - 10]
                    </Paragraph>
                  </YStack>
                  <XStack gap="$3" alignItems="center">
                    <TButton
                      size="$2"
                      circular
                      backgroundColor="$backgroundHover"
                      onPress={() =>
                        adjustValue(difficulty, setDifficulty, -1, 1, 10)
                      }
                    >
                      -
                    </TButton>
                    <SizableText
                      size="$3"
                      fontWeight="700"
                      color="$color"
                      minWidth={45}
                      textAlign="center"
                    >
                      {difficulty}
                    </SizableText>
                    <TButton
                      size="$2"
                      circular
                      backgroundColor="$backgroundHover"
                      onPress={() =>
                        adjustValue(difficulty, setDifficulty, 1, 1, 10)
                      }
                    >
                      +
                    </TButton>
                  </XStack>
                </XStack>

                {/* Servings Metric - Bound minimum floor at 0 */}
                <XStack
                  justifyContent="space-between"
                  alignItems="center"
                  borderWidth={1}
                  borderColor="$borderColor"
                  padding="$3"
                  borderRadius="$3"
                >
                  <YStack>
                    <SizableText size="$3" fontWeight="600" color="$color">
                      Target Servings
                    </SizableText>
                    <Paragraph size="$1" color="$color" opacity={0.5}>
                      Portion index starting at 1
                    </Paragraph>
                  </YStack>
                  <XStack gap="$3" alignItems="center">
                    <TButton
                      size="$2"
                      circular
                      backgroundColor="$backgroundHover"
                      onPress={() => adjustValue(servings, setServings, -1, 1)}
                    >
                      -
                    </TButton>
                    <SizableText
                      size="$3"
                      fontWeight="700"
                      color="$color"
                      minWidth={45}
                      textAlign="center"
                    >
                      {servings}
                    </SizableText>
                    <TButton
                      size="$2"
                      circular
                      backgroundColor="$backgroundHover"
                      onPress={() => adjustValue(servings, setServings, 1, 1)}
                    >
                      +
                    </TButton>
                  </XStack>
                </XStack>
              </YStack>

              {/* Intent Instruction Text Container */}
              <YStack gap="$1.5">
                <SizableText size="$3" fontWeight="600" color="$color">
                  Additional Instructions
                </SizableText>
                <TextArea
                  backgroundColor="$background"
                  borderColor="$borderColor"
                  color="$color"
                  value={instructions}
                  onChangeText={setInstructions}
                  placeholder="Specify descriptive constraints here (e.g., crispy textures, spicy hints)..."
                  height={100}
                  textAlignVertical="top"
                />
              </YStack>

              <Button
                name="Generate Recipes"
                onPress={suggestMultipleRecipes}
                icon={<Sparkles />}
              />
            </YStack>
          </ScrollView>
        </Sheet.Frame>
      </Sheet>
    </View>
  );
}
