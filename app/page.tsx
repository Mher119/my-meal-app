import Link from "next/link";

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
    <div className=" container mx-auto">
        <h1 className=" text-center">Meal Categories</h1>
        <ul className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {
            data.categories.map(item => <li 
                key={item.idCategory}
                className=" shadow-lg p-4 bg-green-100"
              >

                  <img className=" w-full" src={item.strCategoryThumb} alt={item.strCategory}/>

                  <div>
                    <h2 className=" italic font-bold text-2xl text-green-900">{item.strCategory}</h2>
                    <p className=" text-green-700">{item.strCategoryDescription.slice(0, 250)}</p>
                    <Link href={`/category/${item.strCategory}`} className="">View meals ...</Link>
                  </div>
                 
            </li>)
          }
        </ul>
    </div>
  );
}
