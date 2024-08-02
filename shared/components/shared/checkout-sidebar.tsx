import React from "react";
import { CheckoutItemDetails } from "./checkout-item-details";
import { ArrowRight, Package, Percent, Truck } from "lucide-react";
import { Button } from "../ui";
import { WhiteBlock } from "./white-block";
import { cn } from "@/shared/lib";

type Props = {
  totalAmount: number;
  className?: string;
};

const VAT = 15;
const DELIVERY_PRICE = 250;

export const CheckoutSideBar: React.FC<Props> = ({
  totalAmount,
  className,
}) => {
  const vatPrice = (totalAmount * VAT) / 100;
  const totalPrice = totalAmount + vatPrice + DELIVERY_PRICE;

  return (
    <WhiteBlock className={cn("p-6 sticky top-4", className)}>
      <div className="flex flex-col gap-1">
        <span className="flex-xl">Total: </span>
        <span className="text-[34px] font-extrabold">{totalPrice} $</span>
      </div>

      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <Package size={18} className="mr-2 text-gray-300" />
            Cart price:
          </div>
        }
        value={`${totalAmount} $`}
      />
      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <Percent size={18} className="mr-2 text-gray-300" />
            Tax:
          </div>
        }
        value={`${vatPrice} $`}
      />
      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <Truck size={18} className="mr-2 text-gray-300" />
            Delivery:
          </div>
        }
        value={`${DELIVERY_PRICE} $`}
      />

      <Button
        type="submit"
        className="w-full h-14 rounded-2xl mt-6 text-base font-bold"
      >
        Go to payment
        <ArrowRight className="w-5 ml-2" />
      </Button>
    </WhiteBlock>
  );
};
