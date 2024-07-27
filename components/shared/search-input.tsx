"use client";

import { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useClickAway, useDebounce } from "react-use";
import Link from "next/link";
import Image from "next/image";
import { Api } from "@/services/api-client";
import { Product } from "@prisma/client";

type Props = {
  className?: string;
};

export const SearchInput: React.FC<Props> = ({ className }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [focused, setFocused] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const ref = useRef(null);

  useDebounce(
    async () => {
      try {
        const response = await Api.products.search(searchQuery);
        setProducts(response);
      } catch (error) {
        console.log(error);
      }
    },
    100,
    [searchQuery]
  );

  useClickAway(ref, () => {
    setFocused(false);
  });

  const onClickItem = () => {
    setFocused(false);
    setSearchQuery("");
    setProducts([]);
  };

  return (
    <>
      {focused && (
        <div className="fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-30" />
      )}
      <div
        ref={ref}
        className={cn(
          "flex rounded-2xl flex-1 justify-between relative h-11 z-30",
          className
        )}
      >
        <Search className="absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400" />
        <input
          className="rounded-2xl outline-none w-full bg-gray-50 pl-11"
          type="text"
          placeholder="Find a pizza..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setFocused(true)}
        />
        {products.length > 0 && (
          <div
            className={cn(
              "absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30",
              focused && "visible opacity-100 top-12"
            )}
          >
            {products.map(({ id, name, imageUrl }) => (
              <Link
                key={id}
                className="flex items-center gap-3 w-full px-3 py-2 hover:bg-primary/10"
                href={`/product/${id}`}
                onClick={onClickItem}
              >
                <Image
                  className="rounded-sm"
                  src={imageUrl}
                  width={32}
                  height={32}
                  alt={name}
                />
                <span>{name}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
