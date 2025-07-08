import { AnalyticsItem } from "apps/commerce/types.ts";
import Button from "../../../../components/ui/Button.tsx";
import Icon from "../../../../components/ui/Icon.tsx";
import { sendEvent } from "../../../../sdk/analytics.tsx";
import { useUI } from "../../../../sdk/useUI.ts";

interface Props {
  loading: boolean;
  currency: string;
  total: number;
  items: AnalyticsItem[];
}

function CartButton({ loading, currency, total, items }: Props) {
  const { displayCart, qtdItemsMinicart } = useUI();
  const totalItems = items.length;
  qtdItemsMinicart.value = totalItems;

  const onClick = () => {
    sendEvent({
      name: "view_cart",
      params: { currency, value: total, items },
    });
    displayCart.value = true;
  };

  return (
    <div class="indicator">
      <span
        class={`indicator-item badge badge-secondary badge-sm bottom-[5px] right-[5px] ${
          totalItems === 0 ? "hidden" : ""
        }`}
      >
        {totalItems > 9 ? "9+" : totalItems}
      </span>

      <Button
        class="btn-neutral bg-white-0 hover:bg-white-0 outline-0 border-0 hover:border-0"
        aria-label="open cart"
        data-deco={displayCart.value && "open-cart"}
        loading={loading}
        onClick={onClick}
      >
        <Icon id="ShoppingCart" width={22} height={26} strokeWidth={2.65} />
      </Button>
    </div>
  );
}

export default CartButton;
