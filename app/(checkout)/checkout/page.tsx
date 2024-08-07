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
import { createOrder } from "@/app/actions";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Api } from "@/shared/services/api-client";

export default function CheckoutPage() {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const { totalAmount, items, updateItemQuantity, removeCartItem, loading } =
    useCart();

  const { data: session } = useSession();

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

  useEffect(() => {
    async function fetchUserInfo() {
      const data = await Api.auth.getMe();

      const { fullname, email } = data;

      if (fullname) {
        const [firstName, lastName] = fullname.split(" ");
        form.setValue("firstName", firstName);
        form.setValue("lastName", lastName);
      }

      form.setValue("email", email);
    }

    if (session) {
      fetchUserInfo();
    }
  }, [session, form]);

  const onSubmit: SubmitHandler<CheckoutFormValues> = async (values) => {
    try {
      setSubmitting(true);

      const url = await createOrder(values);

      toast.success("Order created successfully");

      if (url) {
        location.href = url;
      }
    } catch (e) {
      console.error(e);
      setSubmitting(false);
      toast.error("Failed to create order");
    }
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
              <CheckoutSideBar
                totalAmount={totalAmount}
                loading={loading || submitting}
              />
            </div>
          </div>
        </form>
      </FormProvider>
    </Container>
  );
}
