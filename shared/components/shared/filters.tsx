"use client";

import { Title } from "./title";
import { Input } from "../ui";
import { RangeSlider } from "./range-slider";
import { CheckboxFiltersGroup } from "./checkbox-filters-group";
import { useFilters, useQueryFilters, useIngredients } from "@/shared/hooks";

type Props = {
  className?: string;
};

export const Filters: React.FC<Props> = ({ className }) => {
  const { ingredients, loading } = useIngredients();
  const filters = useFilters();
  useQueryFilters(filters);

  const items = ingredients.map((item) => ({
    value: String(item.id),
    text: item.name,
  }));

  const updatePrices = ([from, to]: number[]) => {
    filters.setPrice("from", from);
    filters.setPrice("to", to);
  };

  return (
    <div className={className}>
      <Title text="Filters" size="sm" className="mb-5 font-bold" />
      <CheckboxFiltersGroup
        name="types"
        className="mt-5"
        title="Types"
        onClickCheckbox={filters.setTypes}
        selected={filters.types}
        items={[
          { value: "1", text: "Thin" },
          { value: "2", text: "Traditional" },
        ]}
      />
      <CheckboxFiltersGroup
        name="sizes"
        className="mt-5"
        title="Sizes"
        onClickCheckbox={filters.setSizes}
        selected={filters.sizes}
        items={[
          { value: "20", text: "20 sm" },
          { value: "30", text: "30 sm" },
          { value: "40", text: "40 sm" },
        ]}
      />
      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p className="font-bold mb-3">Price from and to:</p>
        <div className="flex gap-3 mb-5">
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={1000}
            value={filters.price.from}
            onChange={(e) => filters.setPrice("from", Number(e.target.value))}
          />
          <Input
            type="number"
            placeholder="1000"
            min={100}
            max={1000}
            value={filters.price.to}
            onChange={(e) => filters.setPrice("to", Number(e.target.value))}
          />
        </div>
        <RangeSlider
          min={0}
          max={1000}
          step={10}
          value={[filters.price.from || 0, filters.price.to || 1000]}
          onValueChange={updatePrices}
        />
      </div>
      <CheckboxFiltersGroup
        title="Ingridients"
        name="ingredients"
        className="mt-5"
        limit={6}
        loading={loading}
        defaultItems={items.slice(0, 6)}
        items={items}
        onClickCheckbox={filters.setSelectedIngredients}
        selected={filters.selectedIngredients}
      />
    </div>
  );
};
