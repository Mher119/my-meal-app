import Image from "next/image";

type MealDetail = {
  idMeal: string;
  strMeal: string;
  strMealAlternate: string;
  strCategory: string;
  strArea: string;
  strMealThumb: string;
  strYoutube: string | null;
  [key: string]: any;
};

type LookupResponse = {
  meals: MealDetail[];
};

type Params = {
  params: { id: string };
};

export default async function MealPage({ params }: Params) {
  const { id } = params;

  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${encodeURIComponent(
      id
    )}`,
    { next: { revalidate: 60 } }
  );

  if (!res.ok) throw new Error(`Failed to fetch meal with id ${id}`);

  const data: LookupResponse = await res.json();

  if (!data.meals || data.meals.length === 0) {
    return <p>No Meal Found with ID {id}.</p>;
  }

  const meal = data.meals[0];

  const ingredients: { ingredient: string; measure: string }[] = [];
  for (let i = 1; i <= 20; i++) {
    const ing = meal[`strIngredient${i}`];
    const meas = meal[`strMeasure${i}`];
    if (ing && ing.trim()) {
      ingredients.push({ ingredient: ing, measure: meas });
    }
  }

  return (
    <div>
      <h1 className="text-center font-bold text-3xl p-4">{meal.strMeal}</h1>

      <div className="flex gap-8 flex-wrap">
        <div style={{ maxWidth: 400 }}>
          <Image
            src={meal.strMealThumb}
            alt={meal.strMeal}
            width={400}
            height={300}
            priority
            style={{
              objectFit: "cover",
              width: "100%",
              height: "auto",
              borderRadius: "8px",
            }}
          />
        </div>

        <div>
          <p>
            <strong>Category:</strong> {meal.strCategory}
          </p>
          <p>
            <strong>Area:</strong> {meal.strArea}
          </p>

          <h2 className="font-semibold mt-4">Ingredients</h2>
          <ul>
            {ingredients.map((item, idx) => (
              <li key={idx}>
                {item.ingredient} - {item.measure}
              </li>
            ))}
          </ul>

          {meal.strYoutube && (
            <a
              href={meal.strYoutube}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "blue", display: "inline-block", marginTop: 8 }}
            >
              Watch on Youtube
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
