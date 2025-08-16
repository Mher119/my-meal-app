'use client';

import { useState, useMemo, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

type MealBrief = {
  strMeal: string;
  strMealThumb: string;
  idMeal: string;
};

type Props ={
  meals: MealBrief[];
}

export default function AutocompleteMeals({meals}: Props){
  const [query, setQuery] = useState('');
  const [showDropDown, setShowDropDown] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);


  // Подсказки: фильтрация по названию, ограничиваем до 5
  const suggestions = useMemo(()=>{
    if(!query) return [];
    return meals.filter(m => m.strMeal.toLowerCase().includes(query.toLowerCase()))
            .slice(0, 5);
  }, [meals, query]);


  useEffect(()=>{
    
    function handleClickOutside(event: MouseEvent){
    
      if(wrapperRef.current && !wrapperRef.current.contains(event.target as Node)){
        
        setShowDropDown(false);
      }

    }

    document.addEventListener('mousedown', handleClickOutside);    
    
      return ()=>{
        document.removeEventListener('mousedown', handleClickOutside);
      };

  }, []);


  return <div ref={wrapperRef} style={{position: "relative"}} className=" max-w-[500px]">
      <input 
          type="text" 
          placeholder="Search Meal..." 
          value={query} 
          onChange={e=>{
            setQuery(e.target.value);
            setShowDropDown(true);
          }} 
          onFocus={()=>{
            if(query) setShowDropDown(true)
          }}
          />
        {
          showDropDown && suggestions.length > 0 && (
            <ul
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                background: "#fff",
                border: "1px solid #ddd",
                borderRadius: "4px",
                maxHeight: "200px",
                overflowY: "auto",
                zIndex: 10,
                listStyle: "none",
                padding: 0,
                margin: 0,
              }}
            >

              {
                suggestions.map( meal => <li key={meal.idMeal} className="flex">
                  <Image 
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    width={40}
                    height={40}
                  />
                  <Link 
                    href={`/meal/${meal.idMeal}`} 
                    onClick={()=> setShowDropDown(false)}
                    style={{
                      textDecoration: "none",
                      padding: "0.5rem",
                      color: "#333",
                    }}
                    >
                      {meal.strMeal}
                  </Link>
                </li>)
              }


            </ul>
          )
          
        }
  </div>;


}