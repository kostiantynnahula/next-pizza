"use client";

import React from "react";
import { Title } from "./title";
import { FilterCheckbox } from "./filter-checkbox";
import { Input } from "../ui";
import { RangeSlider } from "./range-slider";
import { CheckboxFiltersGroup } from "./checkbox-filters-group";
import { useFilterIngredients } from "@/hooks/useFilterIngredients";

type Props = {
  className?: string;
};

export const Filters: React.FC<Props> = ({ className }) => {
  const { ingredients, loading, selectedIds, onAddId } = useFilterIngredients();

  const items = ingredients.map((item) => ({
    value: String(item.id),
    text: item.name,
  }));

  return (
    <div className={className}>
      <Title text="Filters" size="sm" className="mb-5 font-bold" />
      <div className="flex flex-col gap-4">
        <FilterCheckbox name="group" text="Can group" value="1" />
        <FilterCheckbox name="news" text="News" value="2" />
      </div>
      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p className="font-bold mb-3">Price from and to:</p>
        <div className="flex gap-3 mb-5">
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={30000}
            defaultValue={0}
          />
          <Input type="number" placeholder="30000" min={100} max={30000} />
        </div>
        <RangeSlider min={0} max={5000} step={10} value={[0, 5000]} />
      </div>
      <CheckboxFiltersGroup
        title="Ingridients"
        name="ingredients"
        className="mt-5"
        limit={6}
        loading={loading}
        defaultItems={items.slice(0, 6)}
        items={items}
        onClickCheckbox={onAddId}
        selectedIds={selectedIds}
      />
    </div>
  );
};
