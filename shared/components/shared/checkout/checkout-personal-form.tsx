import { FormInput } from "@/shared/components/shared/form";
import { Input } from "../../ui";
import { WhiteBlock } from "../white-block";

interface Props {
  className?: string;
}

export const CheckoutPersonalForm: React.FC<Props> = ({ className }) => {
  return (
    <WhiteBlock title="2. Personal info">
      <div className="grid grid-cols-2 gap-5">
        <Input
          name="firstName"
          className="text-base"
          placeholder="First name"
        />
        <Input name="lastName" className="text-base" placeholder="Last name" />
        <Input name="email" className="text-base" placeholder="Email" />
        <FormInput name="phone" className="text-base" placeholder="Phone" />
      </div>
    </WhiteBlock>
  );
};
