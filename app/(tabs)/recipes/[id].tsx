import * as recipeEndpoints from "@/services/recipeEndpoints";
import { Recipe } from "@/types/recipe";
import { router, useLocalSearchParams } from "expo-router";
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

export default function DetailedRecipeScreen() {
  const { id } = useLocalSearchParams();
  const recipeId = Number(id);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRecipe = async () => {
      setLoading(true);
      const response = await recipeEndpoints.loadOneRecipe(recipeId);
      if (response) {
        setRecipe(response);
      }
      setLoading(false);
    };
    loadRecipe();
  }, [recipeId]);

  const deleteRecipe = async (id: number) => {
    setLoading(true);
    const response = await recipeEndpoints.deleteRecipe(id);
    if (response) {
      router.back();
    }

    setLoading(false);
  };

  return (
    <ScrollView backgroundColor="$background" flex={1}>
      <YStack padding="$4" gap="$4">
        {recipe ? (
          <YStack gap="$4">
            {/* Header Section */}
            <YStack gap="$1">
              <Heading size="$7" color="$color">
                {recipe.title}
              </Heading>
              <Paragraph size="$3" color="$color" opacity={0.9}>
                {recipe.description}
              </Paragraph>
            </YStack>

            {/* Meta Attributes Group */}
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

            {/* Ingredients Section */}
            {recipe.ingredients_used && recipe.ingredients_used.length > 0 && (
              <YStack
                gap="$2"
                borderTopWidth={1}
                borderColor="$borderColor"
                paddingTop="$3"
              >
                <SizableText size="$4" fontWeight="700" color="$color">
                  Ingredients
                </SizableText>
                <YStack gap="$1.5" paddingLeft="$1">
                  {recipe.ingredients_used.map((ingredient, index) => (
                    <XStack
                      key={`ingredient-${index}`}
                      gap="$2.5"
                      alignItems="center"
                    >
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

            {/* Steps Section */}
            {recipe.steps && recipe.steps.length > 0 && (
              <YStack
                gap="$2"
                borderTopWidth={1}
                borderColor="$borderColor"
                paddingTop="$3"
              >
                <SizableText size="$4" fontWeight="700" color="$color">
                  Instructions
                </SizableText>
                <YStack gap="$3">
                  {recipe.steps.map((step, index) => (
                    <XStack
                      key={`step-${index}`}
                      gap="$3"
                      alignItems="flex-start"
                    >
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

            {/* Metadata Tags */}
            <YStack
              borderTopWidth={1}
              borderColor="$borderColor"
              paddingTop="$3"
            >
              <XStack gap="$2" flexWrap="wrap">
                {recipe.cuisine_tags?.map((tag, index) => (
                  <SizableText
                    key={`cuisine-${index}`}
                    size="$2"
                    color="$accentColor"
                    opacity={0.8}
                  >
                    #{tag}
                  </SizableText>
                ))}
                {recipe.dish_tags?.map((tag, index) => (
                  <SizableText
                    key={`dish-${index}`}
                    size="$2"
                    color="$accentColor"
                    opacity={0.8}
                  >
                    #{tag}
                  </SizableText>
                ))}
                {recipe.general_tags?.map((tag, index) => (
                  <SizableText
                    key={`general-${index}`}
                    size="$2"
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

            {/* Delete Action Button matching your exact accent configuration */}
            <Button
              backgroundColor="$accentBackground"
              marginTop="$4"
              onPress={() => deleteRecipe(recipeId)}
              hoverStyle={{ opacity: 0.9, scale: 0.98 }}
              pressStyle={{ opacity: 0.8, scale: 0.95 }}
            >
              <SizableText fontWeight="700" color="$background">
                Delete Recipe
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
            Loading recipe details...
          </Paragraph>
        )}
      </YStack>
    </ScrollView>
  );
}
