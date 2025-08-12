


import CategoryList from "./ui/content/CategoryList";

type Category = {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

type CategoriesResponse = {
  categories: Category[];
};


export default async function HomePage() {


  const res = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php', {next: {revalidate: 60}});
  if(!res.ok) throw new Error("Failed to fetch categories");

  const data: CategoriesResponse = await res.json();

  return (
      <div>
         <h1 className=" text-center">Meal Categories</h1>
         <CategoryList categories={data.categories} />
      </div>
  );
}
