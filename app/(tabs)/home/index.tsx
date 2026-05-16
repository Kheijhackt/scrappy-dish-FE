import * as recipeEndpoints from "@/services/recipeEndpoints";
import * as suggestEndpoints from "@/services/suggestEndpoints";
import { Recipe } from "@/types/recipe";
import { useEffect, useState } from "react";
import {
  Button,
  Heading,
  Paragraph,
  ScrollView,
  SizableText,
  View,
  XStack,
  YStack,
} from "tamagui";

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
      await recipeEndpoints.saveRecipe(recipe);
    }
  };

  return (
    <ScrollView backgroundColor="$background" flex={1}>
      <YStack padding="$4" gap="$4" flex={1} justifyContent="center">
        <Heading size="$7" textAlign="center" color="$color" marginBottom="$1">
          Daily Suggestion
        </Heading>

        {recipe ? (
          <YStack
            gap="$4"
            backgroundColor="$background"
            padding="$4"
            borderRadius="$4"
            borderWidth={1}
            borderColor="$borderColor"
          >
            {/* Title & Description */}
            <YStack gap="$1">
              <Heading size="$6" color="$color">
                {recipe.title}
              </Heading>
              <Paragraph size="$3" color="$color" opacity={0.9}>
                {recipe.description}
              </Paragraph>
            </YStack>

            {/* Meta Tags - Using accent components naturally */}
            <XStack gap="$2" flexWrap="wrap">
              {recipe.difficulty && (
                <SizableText
                  size="$2"
                  fontWeight="600"
                  backgroundColor="$backgroundHover"
                  color="$accentColor"
                  paddingHorizontal="$3"
                  paddingVertical="$1"
                  borderRadius="$2"
                >
                  ⚡ {recipe.difficulty}
                </SizableText>
              )}
              {recipe.cook_time_minutes && (
                <SizableText
                  size="$2"
                  fontWeight="600"
                  backgroundColor="$backgroundHover"
                  color="$accentColor"
                  paddingHorizontal="$3"
                  paddingVertical="$1"
                  borderRadius="$2"
                >
                  ⏱️ {recipe.cook_time_minutes} mins
                </SizableText>
              )}
              {recipe.servings && (
                <SizableText
                  size="$2"
                  fontWeight="600"
                  backgroundColor="$backgroundHover"
                  color="$accentColor"
                  paddingHorizontal="$3"
                  paddingVertical="$1"
                  borderRadius="$2"
                >
                  👥 {recipe.servings} servings
                </SizableText>
              )}
            </XStack>

            {/* Ingredients List */}
            {recipe.ingredients_used && recipe.ingredients_used.length > 0 && (
              <YStack
                gap="$2"
                borderTopWidth={1}
                borderColor="$borderColor"
                paddingTop="$3"
              >
                <SizableText size="$3" fontWeight="700" color="$color">
                  Ingredients
                </SizableText>
                <YStack gap="$1.5" paddingLeft="$1">
                  {recipe.ingredients_used.map((ingredient, index) => (
                    <XStack
                      key={`ingredient-${index}`}
                      gap="$2.5"
                      alignItems="center"
                    >
                      {/* Bullet point perfectly tracks your active accent color */}
                      <View
                        width={5}
                        height={5}
                        borderRadius={2.5}
                        backgroundColor="$accentColor"
                      />
                      <Paragraph size="$3" color="$color">
                        {ingredient}
                      </Paragraph>
                    </XStack>
                  ))}
                </YStack>
              </YStack>
            )}

            {/* Steps / Instructions */}
            {recipe.steps && recipe.steps.length > 0 && (
              <YStack
                gap="$2"
                borderTopWidth={1}
                borderColor="$borderColor"
                paddingTop="$3"
              >
                <SizableText size="$3" fontWeight="700" color="$color">
                  Instructions
                </SizableText>
                <YStack gap="$3">
                  {recipe.steps.map((step, index) => (
                    <XStack
                      key={`step-${index}`}
                      gap="$3"
                      alignItems="flex-start"
                    >
                      {/* Step numbers match your active theme accent */}
                      <SizableText
                        size="$3"
                        fontWeight="700"
                        color="$accentColor"
                        minWidth={18}
                      >
                        {index + 1}.
                      </SizableText>
                      <Paragraph size="$3" color="$color" flex={1}>
                        {step}
                      </Paragraph>
                    </XStack>
                  ))}
                </YStack>
              </YStack>
            )}

            {/* Categorization Tags */}
            <YStack
              borderTopWidth={1}
              borderColor="$borderColor"
              paddingTop="$3"
            >
              <XStack gap="$2" flexWrap="wrap">
                {recipe.cuisine_tags?.map((tag, index) => (
                  <SizableText
                    key={`cuisine-${index}`}
                    size="$1"
                    color="$accentColor"
                    opacity={0.8}
                  >
                    #{tag}
                  </SizableText>
                ))}
                {recipe.dish_tags?.map((tag, index) => (
                  <SizableText
                    key={`dish-${index}`}
                    size="$1"
                    color="$accentColor"
                    opacity={0.8}
                  >
                    #{tag}
                  </SizableText>
                ))}
                {recipe.general_tags?.map((tag, index) => (
                  <SizableText
                    key={`general-${index}`}
                    size="$1"
                    color="$accentColor"
                    opacity={0.8}
                  >
                    #{tag}
                  </SizableText>
                ))}
              </XStack>
            </YStack>

            {recipe.nutrition_notes && (
              <Paragraph
                size="$2"
                fontStyle="italic"
                color="$color"
                opacity={0.6}
              >
                Note: {recipe.nutrition_notes}
              </Paragraph>
            )}

            {/* The primary button locks to your active accent background fill */}
            <Button
              backgroundColor="$accentBackground"
              marginTop="$2"
              onPress={saveRecipe}
              hoverStyle={{ opacity: 0.9, scale: 0.98 }}
              pressStyle={{ opacity: 0.8, scale: 0.95 }}
            >
              <SizableText fontWeight="700" color="$background">
                Save Recipe
              </SizableText>
            </Button>
          </YStack>
        ) : (
          <Paragraph
            size="$4"
            textAlign="center"
            color="$color"
            opacity={0.4}
            marginTop="$8"
          >
            Looking for a great recipe...
          </Paragraph>
        )}
      </YStack>
    </ScrollView>
  );
}
