import Image from "next/image";

type Ingredient = {
  ingredient: string;
  measure: string;
};

type MealProps = {
  meal: {
    strCategory: string;
    strArea: string;
    strMealThumb: string;
    strMeal: string;
    strYoutube?: string;
  };
  ingredients: Ingredient[];
};

export default function Meal({ meal, ingredients }: MealProps) {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-8">
      <p className="mb-4 text-green-800 space-x-4">
        <strong>Category:</strong> <span>{meal.strCategory}</span>{" "}
        <strong>Area:</strong> <span>{meal.strArea}</span>
      </p>

      <div className="w-full h-72 relative rounded overflow-hidden mb-6 shadow-md">
        <Image
          src={meal.strMealThumb}
          alt={meal.strMeal}
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
          priority
        />
      </div>

      <h2 className="text-2xl font-semibold text-green-900 mb-3">Ingredients</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6 list-disc list-inside text-green-800">
        {ingredients.map((item, idx) => (
          <li key={idx}>
            {item.ingredient} — {item.measure}
          </li>
        ))}
      </ul>

      {meal.strYoutube && (
        <a
          href={meal.strYoutube}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-green-900 font-semibold hover:text-green-700 transition-colors duration-200 underline"
        >
          ▶ Watch on YouTube
        </a>
      )}
    </div>
  );
}
