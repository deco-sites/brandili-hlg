/**
 * This component renders the filter and selectors for skus.
 * TODO: Figure out a better name for this component.
 */

const colors: Record<string, string> = {
  "preto": "bg-[#000000]",
  "azul": "bg-[#00bfff]",
  "azul-clara": "bg-[#87CEFA]",
  "azul-marinho": "bg-[#000080]",
  "amarelo": "bg-[#ff0]",
  "bege": "bg-[beige]",
  "branca": "bg-[#FFFFFF]",
  "cinza": "bg-[gray]",
  "cinza-escura": "bg-[#A9A9A9]",
  "laranja": "bg-[orange]",
  "preta": "bg-[#161616]",
  "verde": "bg-[green]",
  "verde-clara": "bg-[#90EE90]",
  "vermelha": "bg-[#FF0000]",
  "vermelho": "bg-[red]",
  "roxo": "bg-[purple]",
  "rosa": "bg-[pink]",
  "marrom": "bg-[brown]",
  "natural": "bg-[#f3f3f1]",
  "lilás": "bg-[#e0b0ff]",
  "lilas": "bg-[#e0b0ff]",
  "bordô": "bg-[maroon]",
  "bordo": "bg-[maroon]",

  // Color variants - only applied when no color as content is passed
  "active":
    "active text-sm border border-black-0 border-solid rounded-sm text-black-0 w-[52px] h-10",
  "disabled":
    "disabled text-sm border border-gray-11 border-dashed rounded-sm text-gray-11 w-[52px] h-10",
  "default":
    "default text-sm border border-gray-11 border-solid rounded-sm text-black-0 w-[52px] h-10",
};

interface Props {
  variant?: "active" | "disabled" | "default";
  content: string;
}

const variants = {
  active: "var-active",
  disabled: "var-disabled",
  default: "var-default",
};

function Avatar({ content, variant = "default" }: Props) {
  return (
    <div
      class={`avatar placeholder ${colors[content] ?? colors[variant]} ${
        variants[variant]
      }`}
    >
      <div
        class={`${colors[content] ?? colors[variant]} ${variants[variant]}`}
      >
        <span class="uppercase ">
          {colors[content] ? "" : content.substring(0, 2)}
        </span>
      </div>
    </div>
  );
}

export default Avatar;
