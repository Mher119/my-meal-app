import React from "react";
import Link from "next/link";
import Image from "next/image";


type Category = {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
};

interface CategoryListProps {
  categories: Category[];
}

export default function CategoryList({ categories }: CategoryListProps) {
  return (
    <div className="container mx-auto">
      <ul className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((item) => (
          <li
            key={item.idCategory}
            className="shadow-lg p-4 bg-green-100"
          >
            <Image
              className="w-full"
              src={item.strCategoryThumb}
              alt={item.strCategory}
              width={400}
              height={400}
            />

            <div>
              <h2 className="italic font-bold text-2xl text-green-900">
                {item.strCategory}
              </h2>
              <p className="text-green-700">
                {item.strCategoryDescription.slice(0, 250)}
              </p>
              <Link href={`/category/${item.strCategory}`}>
                View meals ...
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

