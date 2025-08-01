import Image from "next/image";

type MealDetail = {
    idMeal: string;
    strMeal: string;
    strMealAlternate: string;
    strCategory: string; 
    strArea: string;
    strYoutube: string | null;
    [key: string]: any;
};


type LoopupResponse = {
    meals: MealDetail[];
};


type Params = {
    params: Promise<{ id: string }>;
};


export default async function MealPage({params}: Params) {
  
    const {id} = await params;

    const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${encodeURIComponent(
          id
        )}`,
        { next: { revalidate: 60 } }
      ); 
    if(!res.ok) throw new Error(`Failed to fetch meal with id ${id}`); 
    
    
    const data: LoopupResponse = await res.json();

    if(!data.meals || data.meals.length === 0){
        return <p>No Meal Found with ID {id}.</p>
    }

    const meal = data.meals[0];

    const ingredients: {ingredient: string, measure: string}[] = [];
    for(let i = 0; i<=20; i++){
        const ing = meal[`strIngredient${i}`];
        const meas = meal[`strMeasure${i}`];
        if(ing && ing.trim()){
            ingredients.push({ingredient: ing, measure: meas});
        }
    }
    

    return (
    <div>
        <h1 className=" text-center font-bold text-3xl p-4">{meal.strMeal}</h1>

        <div className="flex gap-8">
                <div>
                    <Image 
                            src={meal.strMealThumb}
                            alt={meal.strMeal}
                            width={400}
                            height={300}
                            priority // Проп priority заставляет Next.js сгенерировать <link rel="preload"> для этого URL и начать загрузку ещё на этапе <head>, то есть сразу при заходе на страницу.
                            style={{
                                objectFit: "cover",
                                width: "100%",    // вы растягиваете только ширину…
                                // height не указан!
                            }}
                    />
                </div>
                <div>
                    <p>
                        <strong>Category: {meal.strCategory}</strong>
                        <strong>Area: {meal.strArea}</strong>
                    </p>

                    <h2>Ingredients</h2>
                    <ul>
                        {
                            ingredients.map( (item, idx) =>  <li key={idx}>
                                {item.ingredient} - {item.measure}
                            </li>)
                        }
                    </ul>

                    {meal.strYoutube && <a href={meal.strYoutube} target="_blank" style={{color: 'blue'}}>Watch on Youtube</a>}    
                            </div>
                </div>


    </div>
  )
}
