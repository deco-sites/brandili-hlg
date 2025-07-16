import Button from "../../../components/ui/Button.tsx";
import { useEffect, useState } from "preact/hooks";
import Icon from "site/components/ui/Icon.tsx";

export interface Props {
  coupon?: string;
  onAddCoupon: (text: string) => Promise<void>;
  onRemoveCoupon?: () => void;
}

function Coupon({ coupon, onAddCoupon, onRemoveCoupon }: Props) {
  const [loading, setLoading] = useState(false);
  const [display, setDisplay] = useState(!coupon);
  const [displayError, setDisplayError] = useState(false);

  useEffect(() => {
    if (!coupon) {
      setDisplay(true);
    }
  }, [coupon]);

  function removeCoupon() {
    setDisplay(true);
    if (onRemoveCoupon) {
      onRemoveCoupon();
    }
  }

  return (
    <div class="flex justify-between items-center py-2 border-b border-b-gray-6">
      <span class="text-sm text-gray-1 font-light">Cupom De Desconto</span>
      {display
        ? (
          <div class="relative">
            <form
              class="join"
              onSubmit={async (e) => {
                setDisplayError(false);
                e.preventDefault();
                const { currentTarget: { elements } } = e;

                const input = elements.namedItem("coupon") as HTMLInputElement;
                const text = input.value;

                if (!text) {
                  setDisplayError(true);
                  return;
                }

                try {
                  setLoading(true);
                  await onAddCoupon(text);
                  setDisplay(false);
                } finally {
                  setLoading(false);
                }
              }}
            >
              <input
                name="coupon"
                class={`font-medium placeholder:font-light text-sm placeholder:text-xs  text-gray-0 placeholder:text-gray-1 border hover:border  ${
                  displayError ? "border-red-0" : "border-gray-7"
                } rounded-l-[3px] h-9 outline-none pl-3 max-w-[173px] xsm-phone:max-w-[160px] required`}
                type="text"
                value={coupon ?? ""}
                placeholder={"Digite seu Cupom"}
              />
              <Button
                class="bg-black-0 hover:bg-black-0 border border-black-0 hover:border-black-0 text-xs outline-0 text-white-0 font-light h-9 min-h-9 m-0 rounded-r-[3px] rounded-l-none"
                type="submit"
                htmlFor="coupon"
                loading={loading}
              >
                OK
              </Button>
            </form>
            {displayError && (
              <p className="text-red-0 text-[9px] bottom-0">
                Digite o cupom
              </p>
            )}
          </div>
        )
        : (
          <div class="flex items-center gap-3">
            <Button
              class="btn-ghost underline font-semibold h-auto min-h-fit bg-inherit p-0 border-0 outline-0 hover:bg-white-0"
              onClick={() => setDisplay(true)}
            >
              {coupon || "Adicionar"}
            </Button>
            {coupon && (
              <Button
                class="btn-ghost underline font-semibold h-auto min-h-fit bg-inherit p-0 border-0 outline-0 hover:bg-white-0"
                onClick={removeCoupon}
              >
                <Icon id="Close" width={13} height={13} />
              </Button>
            )}
          </div>
        )}
    </div>
  );
}

export default Coupon;
