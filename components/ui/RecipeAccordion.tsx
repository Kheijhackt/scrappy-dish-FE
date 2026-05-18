import { Recipe } from "@/types/recipe";
import React from "react";
import {
  Accordion,
  Button,
  Heading,
  Paragraph,
  SizableText,
  XStack,
  YStack,
} from "tamagui";

interface RecipeAccordionProps {
  recipe: Recipe;
  index?: number;
  onSave?: (recipe: Recipe) => void | Promise<void>;
}

export default function RecipeAccordion({
  recipe,
  index = 0,
  onSave,
}: RecipeAccordionProps) {
  const itemValue = `recipe-${index}`;

  return (
    <Accordion.Item
      value={itemValue}
      borderWidth={1}
      borderColor="$borderColor"
      borderRadius="$4"
      marginBottom="$3"
      overflow="hidden"
    >
      {/* Collapsible Recipe Trigger Header */}
      <Accordion.Trigger backgroundColor="$backgroundHover" padding="$4">
        {({ open }: { open: boolean }) => (
          <YStack width="100%" gap="$2">
            <XStack
              justifyContent="space-between"
              alignItems="flex-start"
              width="100%"
            >
              <Heading size="$5" color="$color" flex={1} paddingRight="$2">
                {recipe?.title}
              </Heading>
              <SizableText size="$2" color="$accentColor" fontWeight="700">
                {open ? "▲ CLOSE" : "▼ OPEN"}
              </SizableText>
            </XStack>

            <Paragraph
              size="$3"
              color="$color"
              opacity={0.7}
              numberOfLines={open ? undefined : 2}
            >
              {recipe?.description}
            </Paragraph>

            {/* Preview tags visible directly on the header layout */}
            <XStack gap="$2" flexWrap="wrap" marginTop="$1">
              <SizableText
                size="$1"
                fontWeight="600"
                backgroundColor="$background"
                borderColor="$borderColor"
                borderWidth={1}
                paddingHorizontal="$2"
                paddingVertical="$0.5"
                borderRadius="$2"
              >
                ⚡ Diff: {recipe?.difficulty}
              </SizableText>
              <SizableText
                size="$1"
                fontWeight="600"
                backgroundColor="$background"
                borderColor="$borderColor"
                borderWidth={1}
                paddingHorizontal="$2"
                paddingVertical="$0.5"
                borderRadius="$2"
              >
                ⏱️ {recipe?.cook_time_minutes}m
              </SizableText>
              <SizableText
                size="$1"
                fontWeight="600"
                backgroundColor="$background"
                borderColor="$borderColor"
                borderWidth={1}
                paddingHorizontal="$2"
                paddingVertical="$0.5"
                borderRadius="$2"
              >
                👥 {recipe?.servings} servings
              </SizableText>
            </XStack>
          </YStack>
        )}
      </Accordion.Trigger>

      {/* Full Recipe Metadata Content Body */}
      <Accordion.Content backgroundColor="$background" padding="$4" gap="$4">
        {/* Ingredients Segment */}
        <YStack gap="$1">
          <SizableText size="$3" fontWeight="700" color="$color">
            Ingredients Used
          </SizableText>
          {recipe?.ingredients_used?.map((ing, i) => (
            <Paragraph key={i} size="$3" color="$color" opacity={0.9}>
              • {ing}
            </Paragraph>
          )) || (
            <Paragraph
              size="$3"
              color="$color"
              opacity={0.5}
              fontStyle="italic"
            >
              None listed
            </Paragraph>
          )}
        </YStack>

        {/* Direction Steps Segment */}
        <YStack gap="$1.5">
          <SizableText size="$3" fontWeight="700" color="$color">
            Preparation Steps
          </SizableText>
          {recipe?.steps?.map((step, i) => (
            <XStack key={i} gap="$2" alignItems="flex-start">
              <SizableText size="$3" fontWeight="700" color="$color">
                {i + 1}.
              </SizableText>
              <Paragraph flex={1} size="$3" color="$color" opacity={0.9}>
                {step}
              </Paragraph>
            </XStack>
          )) || (
            <Paragraph
              size="$3"
              color="$color"
              opacity={0.5}
              fontStyle="italic"
            >
              No steps provided
            </Paragraph>
          )}
        </YStack>

        {/* FIX: Combined Metadata Hashtags (Cuisine, Dish, & Tags all on one line) */}
        <XStack gap="$2" flexWrap="wrap" marginTop="$1">
          {recipe?.cuisine_tags?.map((tag, index) => (
            <SizableText
              key={`cuisine-${index}`}
              size="$2"
              color="$accentColor"
              opacity={0.8}
            >
              #{tag}
            </SizableText>
          ))}
          {recipe?.dish_tags?.map((tag, index) => (
            <SizableText
              key={`dish-${index}`}
              size="$2"
              color="$accentColor"
              opacity={0.8}
            >
              #{tag}
            </SizableText>
          ))}
          {recipe?.general_tags?.map((tag, index) => (
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

        {/* Nutrition Metadata Column */}
        {recipe?.nutrition_notes ? (
          <YStack
            gap="$1"
            borderLeftWidth={2}
            borderLeftColor="$accentColor"
            paddingLeft="$3"
          >
            <SizableText size="$2" fontWeight="700" color="$color">
              Nutrition Notes
            </SizableText>
            <Paragraph size="$2" color="$color" opacity={0.8}>
              {recipe.nutrition_notes}
            </Paragraph>
          </YStack>
        ) : null}

        {/* Local Persistence Action Trigger */}
        {onSave && (
          <Button
            backgroundColor="$accentBackground"
            marginTop="$2"
            onPress={() => onSave(recipe)}
            hoverStyle={{ opacity: 0.9, scale: 0.98 }}
            pressStyle={{ opacity: 0.8, scale: 0.95 }}
          >
            <SizableText fontWeight="700" color="$accent12">
              Save This Recipe
            </SizableText>
          </Button>
        )}
      </Accordion.Content>
    </Accordion.Item>
  );
}
