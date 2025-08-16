'use client';


import {
    createContext,
    useState,
    useContext,
    ReactNode,
    useEffect
} from 'react';

export type Meal = {
    strMeal: string;
    strMealThumb: string;
    idMeal: string
};

type SearchContextType = {
    query: string;
    setQuery: (q: string) => void;
    results: Meal[];
    isLoading: boolean
}

const SearchContext = createContext<SearchContextType>({
    query: '',
    setQuery: ()=>{},
    results: [],
    isLoading: false
});

export function SearchProvider({children}: {children: ReactNode}){
    

    const [query, setQuery] = useState('');
    const [results, setResutls] = useState<Meal[]>([]);
    const [isLoading, setLoading] = useState(false);

    useEffect(()=>{

        if(query.trim().length === 0){
            setResutls([]);
            return;
        }

        setLoading(true);
        
        const ac = new AbortController();
        
        const timer = setTimeout(async()=>{
          
         try {
            const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`, {
                signal: ac.signal
            });
            if(!res.ok) throw new Error('Fetch Error');

            const data = await res.json();
            setResutls(data.meals ?? []); // nullish coalescing operator - ES2020
         } catch (err) {
            if((err as Error ).name !== 'AbortController') console.error(err);
            setResutls([]);
         }finally{
            setLoading(false);
         }

        }, 300);

          return ()=>{
            clearTimeout(timer);
            ac.abort();
         }

    }, [query])

      

    return (
        <SearchContext.Provider value={{query, setQuery, results, isLoading}}>
            {children}
        </SearchContext.Provider>
    );
}


export const useSearch = ()=> useContext(SearchContext);

