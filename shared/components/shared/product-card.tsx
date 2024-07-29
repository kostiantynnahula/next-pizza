import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Title } from "./title";
import { Button } from "../ui";
import { Plus } from "lucide-react";

type Props = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  className?: string;
};

export const ProductCard: React.FC<Props> = ({
  id,
  name,
  price,
  imageUrl,
  className,
}) => {
  return (
    <div className={className}>
      <Link href={`/product/${id}`}>
        <div className="flex justify-center p-6 bg-secondary rounded-lg h-[260px]">
          <Image
            className="w-[215px] h-[215px]"
            src={imageUrl}
            alt="Logo"
            width={215}
            height={215}
          />
        </div>
      </Link>
      <Title text={name} size="sm" className="mb-1 mt-3 font-bold" />
      <p className="text-sm text-gray-400">
        Chicken, mozzarella, cheddar, pickles, tomatoes, cucumbers, red onions,
      </p>
      <div className="flex justify-between items-center mt-4">
        <span className="text-[20px]">
          from <b>{price} $</b>
        </span>

        <Button variant="secondary">
          <Plus size={20} className="mr-1" />
          Add
        </Button>
      </div>
    </div>
  );
};
