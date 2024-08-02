"use client";

import {
  CheckoutItem,
  CheckoutSideBar,
  Container,
  Title,
  WhiteBlock,
} from "@/shared/components/shared";
import { Input, Textarea } from "@/shared/components/ui";
import { PizzaSize, PizzaType } from "@/shared/constants/pizza";
import { useCart } from "@/shared/hooks";
import { getCartItemDetails } from "@/shared/lib";

const VAT = 15;
const DELIVERY_PRICE = 250;

export default function CheckoutPage() {
  const { totalAmount, items, updateItemQuantity, removeCartItem } = useCart();

  const onClickCountButton = (
    id: number,
    quantity: number,
    type: "plus" | "minus"
  ) => {
    const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

  const vatPrice = (totalAmount * VAT) / 100;

  const totalPrice = totalAmount + vatPrice + DELIVERY_PRICE;

  return (
    <Container className="mt-10">
      <Title
        text="Order placement"
        className="font-extrabold mb-8 text-[36px]"
      />

      <div className="flex gap-10">
        <div className="flex flex-col gap-10 flex-1 mb-20">
          <WhiteBlock title="1. Cart">
            <div className="flex flex-col gap-5">
              {items.map((item) => (
                <CheckoutItem
                  key={item.id}
                  id={item.id}
                  imageUrl={item.imageUrl}
                  name={item.name}
                  price={item.price}
                  quantity={item.quantity}
                  disabled={item.disabled}
                  details={getCartItemDetails(
                    item.ingredients,
                    item.pizzaType as PizzaType,
                    item.pizzaSize as PizzaSize
                  )}
                  onClickCountButton={(type) =>
                    onClickCountButton(item.id, item.quantity, type)
                  }
                  onClickRemove={() => removeCartItem(item.id)}
                />
              ))}
            </div>
          </WhiteBlock>

          <WhiteBlock title="2. Personal info">
            <div className="grid grid-cols-2 gap-5">
              <Input
                name="firstName"
                className="text-base"
                placeholder="First name"
              />
              <Input
                name="lastName"
                className="text-base"
                placeholder="Last name"
              />
              <Input name="email" className="text-base" placeholder="Email" />
              <Input name="phone" className="text-base" placeholder="Phone" />
            </div>
          </WhiteBlock>

          <WhiteBlock title="3. Delivery address">
            <div className="flex flex-col gap-5">
              <Input
                name="address"
                className="text-base"
                placeholder="Addresss"
              />
              <Textarea className="text-base" placeholder="Comment" rows={5} />
            </div>
          </WhiteBlock>
        </div>
        <div className="w-[450px]">
          <CheckoutSideBar totalAmount={totalAmount} />
        </div>
      </div>
    </Container>
  );
}
