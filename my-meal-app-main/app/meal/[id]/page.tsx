import Meal from "@/app/ui/content/Meal";

export default async function MealPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${encodeURIComponent(id)}`,
    { next: { revalidate: 60 } }
  );

  if (!res.ok) throw new Error(`Failed to fetch meal with id ${id}`);

  const data = await res.json();

  if (!data.meals || data.meals.length === 0) {
    return <p className="text-center mt-10 text-red-600">No Meal Found with ID {id}.</p>;
  }

  const meal = data.meals[0];

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ing = meal[`strIngredient${i}`];
    const meas = meal[`strMeasure${i}`];
    if (ing && ing.trim()) {
      ingredients.push({ ingredient: ing.trim(), measure: meas?.trim() ?? "" });
    }
  }

  return (
    <div>
      <h1 className="text-4xl font-extrabold text-green-900 mb-4">{meal.strMeal}</h1>
      {/* Ուղղակի փոխանցում Meal կոմպոնենտին meal և ingredients */}
      <Meal meal={meal} ingredients={ingredients} />
    </div>
  );
}

