import { AnalyticsItem } from "apps/commerce/types.ts";
import Button from "../../../components/ui/Button.tsx";
import { sendEvent } from "../../../sdk/analytics.tsx";
import { formatPrice } from "../../../sdk/format.ts";
import { useUI } from "../../../sdk/useUI.ts";
import CartItem, { Item, Props as ItemProps } from "./CartItem.tsx";
import Coupon, { Props as CouponProps } from "./Coupon.tsx";
import FreeShippingProgressBar from "./FreeShippingProgressBar.tsx";
import { useEffect } from "preact/hooks";
import { invoke } from "../../../runtime.ts";
import { useSignal } from "@preact/signals";

interface Props {
  items: Item[];
  loading: boolean;
  total: number;
  subtotal: number;
  discounts: number;
  locale: string;
  currency: string;
  coupon?: string;
  freeShippingTarget: number;
  checkoutHref: string;
  onAddCoupon?: CouponProps["onAddCoupon"];
  onRemoveCoupon?: CouponProps["onRemoveCoupon"];
  onUpdateQuantity: ItemProps["onUpdateQuantity"];
  itemToAnalyticsItem: ItemProps["itemToAnalyticsItem"];
}

function Cart({
  items,
  total,
  locale,
  coupon,
  loading,
  currency,
  discounts,
  freeShippingTarget,
  checkoutHref,
  itemToAnalyticsItem,
  onUpdateQuantity,
  onAddCoupon,
  onRemoveCoupon,
}: Props) {
  const { displayCart } = useUI();
  const isEmpty = items.length === 0;
  const newCurrentCoupon = useSignal(coupon);
  const newCurrentTotal = useSignal(total - discounts);
  const newCurrentDiscounts = useSignal(discounts);

  // Novo cálculo do subtotal considerando sale quando disponível
  const subtotal = items.reduce((acc, item) => {
    const itemPrice = item.price.withoutDiscount > 0 ? item.price.withoutDiscount : item.price.list;
    return acc + itemPrice * item.quantity;
  }, 0);
  
  useEffect(() => {
    const calculatedTotal = subtotal - newCurrentDiscounts.value;
    newCurrentTotal.value = calculatedTotal;
  }, [subtotal, newCurrentDiscounts.value]);


  const handleRemoveCoupon = async () => {
    try {
      if (onRemoveCoupon) {
        await onRemoveCoupon();
      }
      newCurrentCoupon.value = undefined;
      newCurrentTotal.value = subtotal;
      newCurrentDiscounts.value = 0;
      await invoke.vtex.actions.cart.updateCoupons({
        text: "",
      });
    } catch (error) {
      console.error("Erro ao remover o cupom:", error);
    }
  };
  const handleAddCoupon = async (text: string) => {
    try {
      newCurrentCoupon.value = text;
      newCurrentTotal.value = subtotal - discounts;
      newCurrentDiscounts.value = discounts;
    } catch (error) {
      console.error("Erro ao Adicionar o cupom:", error);
    }
  };

  

  return (
    <div
      class={`flex flex-col justify-center items-center overflow-hidden border-none`}
      style={{ minWidth: "calc(min(100vw, 375px))", maxWidth: "375px" }}
    >
      {isEmpty ? (
        <div class="flex flex-col items-center justify-center">
          <span class="block font-normal text-2xl text-gray-0">
            Sacola vazia
          </span>
          <span class="block text-xs text-gray-3 font-light">
            Sua sacola está esperando por novas aventuras.
          </span>
          <Button
            class="bg-blue-0 hover:bg-blue-0 text-white-0 font-medium border-none outline-none rounded-[50px] w-56 h-12 mt-3.5"
            onClick={() => {
              displayCart.value = false;
            }}
          >
            Escolher produtos
          </Button>
        </div>
      ) : (
        <>
          {/* Free Shipping Bar */}
          <div class="px-2 py-4 w-full">
            <FreeShippingProgressBar
              total={newCurrentTotal.value}
              locale={locale}
              currency={currency}
              target={freeShippingTarget}
            />
          </div>

          {/* Cart Items */}
          <ul
            role="list"
            class="minicart--product-list px-2 flex-grow overflow-y-auto flex flex-col w-full"
          >
            {items.map((item, index) => (
              <li key={index} class="py-4">
                <CartItem
                  item={item}
                  index={index}
                  locale={locale}
                  currency={currency}
                  onUpdateQuantity={onUpdateQuantity}
                  itemToAnalyticsItem={itemToAnalyticsItem}
                />
              </li>
            ))}
          </ul>

          {/* Cart Footer */}
          <footer class="w-full">
            {/* Subtotal */}
            <div class="border-t border-base-200 py-2 px-5 flex flex-col">
              <div class="w-full flex justify-between py-2 text-sm border-b border-b-gray-6">
                <span class="text-sm text-gray-0 font-semibold">Subtotal</span>
                <span class="text-sm text-gray-0 font-semibold">
                  {formatPrice(subtotal, currency, locale)}
                </span>
              </div>
              {newCurrentDiscounts.value > 0 && (
                <div class="flex justify-between items-center pt-2">
                  <span class="text-sm text-gray-0 font-semibold">
                    Descontos
                  </span>
                  <span class="text-sm text-gray-0 font-semibold">
                    -{formatPrice(newCurrentDiscounts.value, currency, locale)}
                  </span>
                </div>
              )}
              {onAddCoupon && (
                <Coupon
                  onAddCoupon={ async (text) => {
                    await onAddCoupon?.(text);    
                    await handleAddCoupon(text);              
                  }}
                  coupon={newCurrentCoupon.value}
                  onRemoveCoupon={handleRemoveCoupon}
                />
              )}
            </div>

            {/* Total */}
            <div class="px-5 flex flex-col justify-end items-end gap-2">
              <div class="py-2 flex justify-between border-b border-b-gray-6 items-center w-full">
                <span class="font-semibold text-lg text-gray-0">Total</span>
                <span class="font-semibold text-lg  text-gray-0">
                  {formatPrice(newCurrentTotal.value, currency, locale)}
                </span>
              </div>
              <span class="py-2 block text-xs">
                O preço exibido no <strong>checkout</strong> é o{" "}
                <strong>valor válido</strong> para a compra do produto. {" "}
                <strong>O Frete</strong> será calculado no {" "}
                <strong>checkout</strong>
              </span>
            </div>

            <div class="py-2 px-5 mb-2 flex flex-col w-full gap-3">
              <a class="inline-block w-full" href={checkoutHref}>
                <Button
                  data-deco="buy-button"
                  class="bg-blue-0 hover:bg-blue-0 text-white-0 border-none outline-none rounded btn-block h-10"
                  disabled={loading || isEmpty}
                  onClick={() => {
                    sendEvent({
                      name: "begin_checkout",
                      params: {
                        coupon: newCurrentCoupon.value,
                        currency,
                        value: newCurrentTotal.value,
                        items: items
                          .map((_, index) => itemToAnalyticsItem(index))
                          .filter((x): x is AnalyticsItem => Boolean(x)),
                      },
                    });
                  }}
                >
                  Finalizar compra
                </Button>
              </a>
              <Button
                class="bg-white-0 hover:bg-white-0 text-blue-0 font-medium border-blue-0 outline-none rounded btn-block h-10"
                onClick={() => {
                  displayCart.value = false;
                }}
              >
                Continuar comprando
              </Button>
            </div>
          </footer>
        </>
      )}
    </div>
  );
}

export default Cart;