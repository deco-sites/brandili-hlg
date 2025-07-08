import { Signal, useSignal } from "@preact/signals";
import { useCallback } from "preact/hooks";
import Button from "../../components/ui/Button.tsx";
import { formatPrice } from "../../sdk/format.ts";
import { useCart } from "apps/vtex/hooks/useCart.ts";
import type { SimulationOrderForm, SKU, Sla } from "apps/vtex/utils/types.ts";
import Icon from "site/components/ui/Icon.tsx";

export interface Props {
  items: Array<SKU>;
}

const formatShippingEstimate = (estimate: string) => {
  const [, time, type] = estimate.split(/(\d+)/);

  if (type === "bd") return `${time} dias úteis`;
  if (type === "d") return `${time} dias`;
  if (type === "h") return `${time} horas`;
};

function ShippingContent({ simulation }: {
  simulation: Signal<SimulationOrderForm | null>;
}) {
  const { cart } = useCart();

  const methods = simulation.value?.logisticsInfo?.reduce(
    (initial, { slas }) => [...initial, ...slas],
    [] as Sla[],
  ) ?? [];

  const locale = cart.value?.clientPreferencesData.locale || "pt-BR";
  const currencyCode = cart.value?.storePreferencesData.currencyCode || "BRL";

  if (simulation.value == null) {
    return null;
  }

  if (methods.length === 0) {
    return (
      <div class="p-2">
        <span>CEP inválido</span>
      </div>
    );
  }

  return (
    <ul class="flex flex-col gap-4 py-4">
      {methods.map((method) => (
        <li class="flex justify-between gap-7 items-start border-base-200 not-first-child:border-t">
          <div class="flex flex-col">
            <span class="text-sm text-left w-full">
              {method.name}
            </span>
            <span class="text-xs font-light w-full">
              Pedido pronto em até{" "}
              {formatShippingEstimate(method.shippingEstimate)}
            </span>
          </div>
          <span class="text-sm font-semibold text-right">
            {method.price === 0 ? "Grátis" : (
              formatPrice(method.price / 100, currencyCode, locale)
            )}
          </span>
        </li>
      ))}
    </ul>
  );
}

function ShippingSimulation({ items }: Props) {
  const postalCode = useSignal("");
  const loading = useSignal(false);
  const simulateResult = useSignal<SimulationOrderForm | null>(null);
  const { simulate, cart } = useCart();

  const handleSimulation = useCallback(async () => {
    if (postalCode.value.length !== 8) {
      return;
    }

    try {
      loading.value = true;
      simulateResult.value = await simulate({
        items: items,
        postalCode: postalCode.value,
        country: cart.value?.storePreferencesData.countryCode || "BRA",
      });
    } finally {
      loading.value = false;
    }
  }, [items, postalCode.value]);

  return (
    <div class="flex flex-col gap-2 full-phone:px-4">
      <div class="flex gap-1 items-center">
        <Icon id="ShippingSim" size={15} stroke-width={1} />
        <span class="text-base text-gray-0 font-poppins font-medium">
          Calcular o frete
        </span>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSimulation();
        }}
        class="flex w-full items-center"
      >
        <input
          as="input"
          type="text"
          class="input border-black-1 focus-visible:border-black-1 input-bordered focus-visible:outline-none join-item max-w-full w-full rounded-tl-md rounded-bl-md rounded-tr-none rounded-br-none"
          placeholder="Digite seu CEP"
          value={postalCode.value}
          maxLength={8}
          size={8}
          onChange={(e: { currentTarget: { value: string } }) => {
            postalCode.value = e.currentTarget.value;
          }}
        />
        <Button
          type="submit"
          loading={loading.value}
          class="join-item bg-black-0 border-black-0 border-solid border hover:bg-black-0 text-white-0 hover:text-white-0 font-poppins font-normal w-[110px]"
        >
          Calcular
        </Button>
      </form>

      <div class="w-full">
        <a
          href="https://buscacepinter.correios.com.br/app/endereco/index.php?t"
          class="underline text-gray-0 text-xs"
        >
          Não sei meu CEP
        </a>
      </div>

      <div>
        <div>
          <ShippingContent simulation={simulateResult} />
        </div>
      </div>
    </div>
  );
}

export default ShippingSimulation;
