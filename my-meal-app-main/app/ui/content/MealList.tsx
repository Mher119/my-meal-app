import PaginatedMealsGrid from "@/components/PaginatedMealsGrid";

type MealBrief = {
  strMeal: string;
  strMealThumb: string;
  idMeal: string;
};

type MealListProps = {
  meals: MealBrief[];
  category: string;
};

export default function MealList({ meals, category }: MealListProps) {
  return (
    <div className="container mx-auto">
      
      {meals && meals.length > 0 ? (
        <PaginatedMealsGrid meals={meals} />
      ) : (
        <p>No Meals found for category {category}</p>
      )}
    </div>
  );
}
