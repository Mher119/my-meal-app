import AutocompleteMeals from "@/components/AutocompleteMeals";
import PaginatedMealsGrid from "@/components/PaginatedMealsGrid";



type MealBrief = {
    strMeal: string;
    strMealThumb: string; 
    idMeal: string;
};

type FilterResponse = {
    meals: MealBrief[];
};

type Params = {
    params: Promise<{ category: string }>;
}


export default async function CategoryPage({params}: Params){
    const {category} = await params;
  
    const res = await fetch( `https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(
        category
      )}`, {next: {revalidate: 60}});

    if (!res.ok) throw new Error(`Failed to fetch meals for category ${category}`)

    const data: FilterResponse = await res.json();

    return (
        <div className=" container mx-auto">
            <h1> Meals in {category} </h1>
            {
                data.meals ? <>
                     <AutocompleteMeals meals={data.meals} />
                     <PaginatedMealsGrid meals={data.meals} />
                </>: 
                <p> No Meals found for category {category} </p>
            }
        </div>
    );


}
