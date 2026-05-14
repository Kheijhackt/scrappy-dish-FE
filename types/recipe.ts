export interface Recipe {
  id: number | null;
  title: string;
  description: string;
  ingredients_used: string[];
  steps: string[];
  cook_time_minutes: number;
  difficulty: number;
  servings: number;
  cuisine_tags: string[];
  dish_tags: string[];
  general_tags: string[];
  nutrition_notes: string;
}
