'use client';
import Image from "next/image";

import { useSearch, Meal } from "./SearchContext";
import Link from "next/link";
import {useEffect, useState, useRef} from 'react';


export function GlobalSearch() {
  const {query, setQuery, results, isLoading} = useSearch();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);


  useEffect(()=>{

    const onClick = (e: MouseEvent)=>{
        if(ref.current && !ref.current.contains(e.target as Node)){
          setOpen(false);
        }
    }

    document.addEventListener('mousedown', onClick);

    return ()=> document.removeEventListener('mousedown', onClick);

  }, []);
 

  return <div className=" relative w-[400px] bg-slate-300" ref={ref}>
    <input 
        type="text" 
        placeholder="Search Meals..." 
        value={query} 
        onChange={(e)=> {setQuery(e.target.value); setOpen(true);} }
        onFocus={()=> setOpen(true)} 
        className="w-full p-2 text-xl text-slate-500"
    />
    {open && (
      <ul className=" absolute z-10 bg-slate-300 w-full top-full max-h-[200px] overflow-y-auto">
        {isLoading && <li>Loading ...</li>}
        {!isLoading && results.length === 0 && query.trim().length > 0 && <li>No Result</li>}
        {!isLoading && results.slice(0, 5).map((meal: Meal) => <li key={meal.idMeal} className="m-2">
            <Link 
                href={`/meal/${meal.idMeal}`} 
                onClick={()=> setOpen(false)}
                className=" flex gap-4 shadow"
              >
                <Image 
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  width={20}
                  height={20}
                />

                <span>{meal.strMeal}</span>
            </Link>
        </li>)}
      </ul>
    )}

  </div>



}
