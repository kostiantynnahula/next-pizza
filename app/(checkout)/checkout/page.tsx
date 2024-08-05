"use client";

import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import {
  CheckoutAddressForm,
  CheckoutCart,
  CheckoutPersonalForm,
  CheckoutSideBar,
  Container,
  Title,
} from "@/shared/components";
import { useCart } from "@/shared/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutFormSchema, CheckoutFormValues } from "@/shared/constants";
import { cn } from "@/shared/lib";

export default function CheckoutPage() {
  const { totalAmount, items, updateItemQuantity, removeCartItem, loading } =
    useCart();

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      address: "",
      comment: "",
    },
  });

  const onSubmit: SubmitHandler<CheckoutFormValues> = (values) => {
    console.log(values);
  };

  return (
    <Container className="mt-10">
      <Title
        text="Order placement"
        className="font-extrabold mb-8 text-[36px]"
      />

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex gap-10">
            <div className="flex flex-col gap-10 flex-1 mb-20">
              <CheckoutCart
                items={items}
                removeCartItem={removeCartItem}
                updateItemQuantity={updateItemQuantity}
                loading={loading}
              />

              <CheckoutPersonalForm
                className={cn({ "opacity-40 pointer-events-none": loading })}
              />

              <CheckoutAddressForm
                className={cn({ "opacity-40 pointer-events-none": loading })}
              />
            </div>
            <div className="w-[450px]">
              <CheckoutSideBar totalAmount={totalAmount} loading={loading} />
            </div>
          </div>
        </form>
      </FormProvider>
    </Container>
  );
}
