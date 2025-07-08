import Icon from "../ui/Icon.tsx";

export interface PaymentItem {
  label: "Diners" | "Elo" | "Mastercard" | "Pix" | "Visa" | "Amex" | "Boleto";
}

export default function PaymentMethods({
  content,
  layout,
}: { content?: { title?: string; items?: PaymentItem[] }; layout?: string }) {
  return (
    <>
      {content && content.items && content.items.length > 0 && (
        <div
          class={`flex flex-col items-center justify-center gap-1 border rounded-sm min-h-[51px] ${
            layout === "Variation Brandili"
              ? "border-white-2"
              : "border-gray-17"
          }`}
        >
          {content.title && (
            <h3
              class={`font-normal text-xs ${
                layout === "Variation Brandili" ? "text-white-0" : "text-gray-0"
              }`}
            >
              {content.title}
            </h3>
          )}
          {layout === "Variation Brandili" && (
            <ul class="grid grid-cols-5 items-center">
              <li>
                <Icon
                  width={18}
                  height={11}
                  strokeWidth={1}
                  id="MastercardWhite"
                />
              </li>
              <li>
                <Icon
                  width={18}
                  height={15}
                  strokeWidth={1}
                  id="DinersWhite"
                />
              </li>
              <li>
                <Icon
                  width={17}
                  height={15}
                  strokeWidth={1}
                  id="VisaWhite"
                />
              </li>
              <li>
                <Icon
                  width={28}
                  height={11}
                  strokeWidth={1}
                  id="AmexWhite"
                />
              </li>
              <li>
                <Icon
                  width={18}
                  height={11}
                  strokeWidth={1}
                  id="BoletoWhite"
                />
              </li>
            </ul>
          )}
          {layout === "Variation Mundi" && (
            <ul class="grid grid-cols-5 items-center">
              <li>
                <Icon
                  width={18}
                  height={11}
                  strokeWidth={1}
                  id="Mastercard"
                />
              </li>
              <li>
                <Icon
                  width={18}
                  height={15}
                  strokeWidth={1}
                  id="Diners"
                />
              </li>
              <li>
                <Icon
                  width={17}
                  height={15}
                  strokeWidth={1}
                  id="Visa"
                />
              </li>
              <li>
                <Icon
                  width={28}
                  height={11}
                  strokeWidth={1}
                  id="Amex"
                />
              </li>
              <li>
                <Icon
                  width={18}
                  height={11}
                  strokeWidth={1}
                  id="Boleto"
                />
              </li>
            </ul>
          )}
        </div>
      )}
    </>
  );
}
