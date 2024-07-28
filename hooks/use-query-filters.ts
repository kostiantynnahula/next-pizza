import { useEffect } from 'react';
import { useRouter } from "next/navigation";
import { Filters } from "./use-filters";
import qs from "qs";

export const useQueryFilters = ({
  sizes,
  types,
  price,
  selectedIngredients,
}: Filters) => {
  const router = useRouter();

  useEffect(() => {
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
  }, [sizes, types, price, selectedIngredients, router]);
};