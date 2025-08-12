import MealList from "@/app/ui/content/MealList";

type MealBrief = {
  strMeal: string;
  strMealThumb: string;
  idMeal: string;
};

type FilterResponse = {
  meals: MealBrief[];
};

type Params = {
  params: { category: string };
};

export default async function CategoryPage({ params }: Params) {
  const { category } = params;

  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(category)}`,
    { next: { revalidate: 60 } }
  );

  if (!res.ok) throw new Error(`Failed to fetch meals for category ${category}`);

  const data: FilterResponse = await res.json();

  return (
    <div>
       <h1>Meals in {category}</h1>
       <MealList meals={data.meals} category={category} />
    </div>
  );
}
