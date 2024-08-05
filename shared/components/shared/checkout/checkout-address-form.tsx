import { FormInput } from "@/shared/components/shared/form";
import { FormTextarea } from "../form/form-textarea";
import { WhiteBlock } from "../white-block";

interface Props {
  className?: string;
}

export const CheckoutAddressForm: React.FC<Props> = ({ className }) => {
  return (
    <WhiteBlock title="3. Delivery address" className={className}>
      <div className="flex flex-col gap-5">
        {/* TODO: Implement google address search */}
        <FormInput
          name="address"
          className="text-base"
          placeholder="Addresss"
        />
        <FormTextarea
          name="comment"
          className="text-base"
          placeholder="Comment"
          rows={5}
        />
      </div>
    </WhiteBlock>
  );
};
