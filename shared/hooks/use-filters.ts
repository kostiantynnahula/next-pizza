import { useState } from "react";
import { useSet } from "react-use";
import { useSearchParams } from "next/navigation";

interface PriceProps {
  from?: number;
  to?: number;
}

interface QueryFilters extends PriceProps {
  types: string[];
  sizes: string[];
  ingredients: string[];
}

export interface Filters {
  sizes: Set<string>;
  types: Set<string>;
  selectedIngredients: Set<string>;
  price: PriceProps;
}

interface ReturnProps extends Filters {
  setPrice: (name: keyof PriceProps, value: number) => void;
  setTypes: (value: string) => void;
  setSizes: (value: string) => void;
  setSelectedIngredients: (value: string) => void;
}

export const useFilters = (): ReturnProps => {
  const searchParams = useSearchParams() as unknown as Map<
    keyof QueryFilters,
    string
  >;
  
  const querySizes = searchParams.get("sizes")?.split(",") || [];
  const queryTypes = searchParams.get("types")?.split(",") || [];
  const queryIngredients = searchParams.get("ingredients")?.split(",");
  
  const [selectedIngredients, { toggle: toggleIngredients }] = useSet(new Set<string>(queryIngredients));
  
  const [sizes, { toggle: toggleSizes }] = useSet(new Set<string>(querySizes));
  const [types, { toggle: toggleTypes }] = useSet(new Set<string>(queryTypes));
  const [price, setPrice] = useState<PriceProps>({
    from: Number(searchParams.get("from")) || undefined,
    to: Number(searchParams.get("to")) || undefined,
  });

  const updatePrice = (name: keyof PriceProps, value: number) => {
    setPrice((prev) => ({ ...prev, [name]: value }));
  };

  return { 
    sizes,
    types, 
    price,
    selectedIngredients,
    setPrice: updatePrice,
    setSizes: toggleSizes,
    setTypes: toggleTypes,
    setSelectedIngredients: toggleIngredients
  };
};