import * as recipeEndpoints from "@/services/recipeEndpoints";
import { Recipe } from "@/types/recipe";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { FlatList } from "react-native";
import {
  Button,
  Heading,
  Paragraph,
  SizableText,
  XStack,
  YStack,
} from "tamagui";

export default function RecipesScreen() {
  const [recipes, setRecipes] = useState<Recipe[] | null>(null);

  useFocusEffect(
    useCallback(() => {
      const getSummaryRecipes = async () => {
        const response = await recipeEndpoints.loadSummaryRecipes(1, 15);
        setRecipes(response);
      };
      getSummaryRecipes();
    }, []),
  );

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
    <YStack
      backgroundColor="$background"
      padding="$4"
      borderRadius="$4"
      borderWidth={1}
      borderColor="$borderColor"
      marginBottom="$3"
      gap="$2"
    >
      <XStack justifyContent="space-between" alignItems="flex-start" gap="$2">
        <YStack flex={1} gap="$1">
          {/* Main Recipe Title */}
          <Heading size="$5" color="$color">
            {title}
          </Heading>

          {/* Subtle Recipe Description */}
          <Paragraph size="$3" color="$color" opacity={0.8}>
            {description}
          </Paragraph>
        </YStack>
      </XStack>

      {/* Primary Action Row mapping cleanly to your accent configuration */}
      <XStack justifyContent="flex-end" marginTop="$2">
        <Button
          backgroundColor="$accentBackground"
          size="$3"
          onPress={() => openRecipe(id ?? 0)}
          hoverStyle={{ opacity: 0.9, scale: 0.98 }}
          pressStyle={{ opacity: 0.8, scale: 0.95 }}
        >
          <SizableText fontWeight="700" color="$background">
            Open
          </SizableText>
        </Button>
      </XStack>
    </YStack>
  );

  return (
    <YStack
      backgroundColor="$background"
      flex={1}
      paddingHorizontal="$4"
      paddingTop="$4"
    >
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
        showsVerticalScrollIndicator={false}
      />
    </YStack>
  );
}
