import Icon, { AvailableIcons } from "../../components/ui/Icon.tsx";
import Header from "../../components/ui/SectionHeader.tsx";

interface Benefit {
  label: string;
  /**
   * @format icon-select
   * @options deco-sites/storefront/loaders/availableIcons.ts
   */
  icon: AvailableIcons;
  description: string;
}

export interface Props {
  /**
   * @default Benefits
   */
  title?: string;
  /**
   * @default Check out the benefits
   */
  description?: string;
  benefits?: Array<Benefit>;
  layout?: {
    variation?: "Simple" | "With border" | "Color reverse";
    headerAlignment?: "center" | "left";
    iconColor?: "text-blue-2" | "text-gold-0";
  };
}

export default function Benefits(
  props: Props,
) {
  const {
    title = "",
    description = "",
    benefits = [{
      icon: "Truck",
      label: "Entrega em todo Brasil",
      description: "Consulte o prazo no fechamento da compra.",
    }, {
      icon: "Discount",
      label: "15% na primeira compra",
      description: "Aplicado direto na sacola de compras.",
    }, {
      icon: "ArrowsPointingOut",
      label: "Devolução grátis",
      description: "Veja as condições para devolver seu produto.",
    }],
    layout,
  } = props;

  const listOfBenefits = benefits.map((benefit, index) => {
    const showDivider = index < benefits.length - 1;
    const reverse = layout?.variation === "Color reverse";
    const benefitLayout = !layout?.variation || layout?.variation === "Simple"
      ? "tiled"
      : "piledup";

    return (
      <div class="bg-gray-5 py-3 px-5 flex justify-between items-center rounded-lg gap-5 w-full max-w-[300px] min-w-[300px]">
        <div class="flex-none">
          <Icon
            id={benefit.icon}
            class={`text-base-content ${layout?.iconColor ?? "text-gray-0"}`}
            width={36}
            height={36}
            strokeWidth={0.01}
            fill="currentColor"
          />
        </div>
        <div class="flex-auto flex flex-col">
          <div class="text-sm text-gray-0 font-bold uppercase">
            {benefit.label}
          </div>
          <p
            class={`text-sm text-gray-0 ${
              benefitLayout == "piledup" ? "hidden lg:block" : ""
            }`}
          >
            {benefit.description}
          </p>
        </div>
      </div>
    );
  });

  return (
    <>
      {!layout?.variation || layout?.variation === "Simple"
        ? (
          <div class="w-full container px-4 mt-6 mb-12 full-phone:mb-10 full-phone:mt-0 flex flex-col gap-1 lg:px-0">
            <Header
              title={title}
              description={description}
              alignment={layout?.headerAlignment || "center"}
            />
            <div class="w-full flex justify-center">
              <div class="listOfBenefits flex justify-between sm:flex gap-4 lg:gap-8 w-full overflow-x-auto pb-1 lg:px-[14px]">
                {listOfBenefits}
              </div>
            </div>
          </div>
        )
        : ""}
      {layout?.variation === "With border" && (
        <div class="w-full container flex flex-col px-4 py-8 gap-8 lg:gap-10 lg:py-10 lg:px-0">
          <Header
            title={title}
            description={description}
            alignment={layout?.headerAlignment || "center"}
          />
          <div class="w-full flex justify-center">
            <div class="grid grid-cols-2 gap-4 w-full py-6 px-4 border border-base-300 lg:gap-8 lg:grid-flow-col lg:auto-cols-fr lg:p-10">
              {listOfBenefits}
            </div>
          </div>
        </div>
      )}
      {layout?.variation === "Color reverse" && (
        <div class="w-full container flex flex-col px-4 py-8 gap-8 lg:gap-10 lg:py-10 lg:px-0">
          <Header
            title={title}
            description={description}
            alignment={layout?.headerAlignment || "center"}
          />
          <div class="w-full flex justify-center">
            <div class="grid grid-cols-2 gap-4 w-full lg:gap-8 lg:grid-flow-col lg:auto-cols-fr">
              {listOfBenefits}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
