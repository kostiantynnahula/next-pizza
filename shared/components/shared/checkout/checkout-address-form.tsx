import { Input, Textarea } from "../../ui";
import { WhiteBlock } from "../white-block";

interface Props {
  className?: string;
}

export const CheckoutAddressForm: React.FC<Props> = ({ className }) => {
  return (
    <WhiteBlock title="3. Delivery address">
      <div className="flex flex-col gap-5">
        <Input name="address" className="text-base" placeholder="Addresss" />
        <Textarea className="text-base" placeholder="Comment" rows={5} />
      </div>
    </WhiteBlock>
  );
};
