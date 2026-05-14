export interface Recipe {
  id: number | null;
  title: string;
  description: string;
  ingredientsUsed: string[];
  steps: string[];
  cookTimeMinutes: number;
  difficulty: number;
  servings: number;
  cuisineTags: string[];
  dishTags: string[];
  generalTags: string[];
  nutritionNotes: string;
}
