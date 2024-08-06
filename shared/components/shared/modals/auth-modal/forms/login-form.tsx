import { FormProvider, useForm } from "react-hook-form";
import { TFormLoginValues, formLoginSchema } from "./schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, FormInput, Title } from "@/shared/components";
import Image from "next/image";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

interface Props {
  onClose?: VoidFunction;
}

export const LoginForm: React.FC<Props> = ({ onClose }) => {
  const form = useForm<TFormLoginValues>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: TFormLoginValues) => {
    try {
      const resp = await signIn("credentials", {
        ...data,
        redirect: false,
      });

      if (!resp?.ok) {
        throw Error();
      }

      toast.success("Successfully logged in", {
        icon: "🎉",
      });

      onClose?.();
    } catch (error) {
      console.error("Error [LOGIN]", error);
      toast.error("Error while login", {
        icon: "❌",
      });
    }
  };

  return (
    <FormProvider {...form}>
      <form
        className="flex flex-col gap-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex justify-between items-center">
          <div className="mr-2">
            <Title text="Login to account" size="md" className="font-bold" />
            <p className="text-gray-400">
              Input your email to login to your account
            </p>
          </div>
          <Image
            src="/assets/images/phone-icon.png"
            alt="phone-icon"
            width={60}
            height={60}
          />
        </div>
        <FormInput name="email" label="Email" required />
        <FormInput name="password" label="Password" type="password" required />
        <Button
          loading={form.formState.isSubmitting}
          className="h-12 text-base"
          type="submit"
        >
          Login
        </Button>
      </form>
    </FormProvider>
  );
};
