import Icon from "../../../components/ui/Icon.tsx";
import { formatPrice } from "../../../sdk/format.ts";

interface Props {
  total: number;
  target: number;
  locale: string;
  currency: string;
}

function FreeShippingProgressBar({ target, total, currency, locale }: Props) {
  const remaining = target - total;
  const percent = Math.floor((total / target) * 100);

  return (
    <div class="flex flex-col w-full gap-2">
      <div class="flex justify-center items-center gap-2 text-primary">
        {remaining > 0
          ? (
            <span class="text-xs text-gray-0 font-light">
              Faltam{" "}
              <span class="text-green-0 font-semibold">
                {formatPrice(remaining, currency, locale)}
                {" "}
              </span>
              para ganhar frete grátis!
            </span>
          )
          : (
            <span class="text-green-0 font-semibold">
              Você ganhou frete grátis!
            </span>
          )}
      </div>
      <progress
        class="progress progress-primary w-full"
        value={percent}
        max={100}
      />
    </div>
  );
}

export default FreeShippingProgressBar;
