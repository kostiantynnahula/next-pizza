import { useEffect, useRef } from 'react';
import { useRouter } from "next/navigation";
import { Filters } from "./use-filters";
import qs from "qs";

export const useQueryFilters = ({
  sizes,
  types,
  price,
  selectedIngredients,
}: Filters) => {
  const isMounted = useRef(false);
  const router = useRouter();

  useEffect(() => {
    if (isMounted.current) {
      const filters = {
        ...price,
        types: Array.from(types),
        sizes: Array.from(sizes),
        ingredients: Array.from(selectedIngredients),
      };
  
      const query = qs.stringify(filters, { arrayFormat: "comma" });
  
      router.push(`?${query}`, {
        scroll: false,
      });
    }

    isMounted.current = true;
  }, [sizes, types, price, selectedIngredients, router]);
};