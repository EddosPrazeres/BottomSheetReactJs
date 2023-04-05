import { IElementMap } from "~/utils";
import {
  BagDetails,
  PaymentCardItau,
  CheckListModal,
  AddressBottomSheet,
  PriceFilterModal,
} from "~/components";
import { useBottomSheet } from "~/context";

export const BottomSheetController = () => {
  const { bsName } = useBottomSheet();

  const BottomSheets: IElementMap = {
    bagDetails: <BagDetails />,
    paymentCardItau: <PaymentCardItau />,
    CheckListModal: <CheckListModal />,
    addressBottomSheet: <AddressBottomSheet />,
    priceFilterModal: <PriceFilterModal />,
  };

  return BottomSheets[bsName] || <></>
};