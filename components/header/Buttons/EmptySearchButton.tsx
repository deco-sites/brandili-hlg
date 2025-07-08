import Button from "../../../components/ui/Button.tsx";
import Icon from "../../../components/ui/Icon.tsx";
import { useUI } from "../../../sdk/useUI.ts";

export default function EmptySearchButton() {
  const { displaySearchPopup } = useUI();

  return (
    <>
      <a
        class="flex items-center justify-center font-normal text-md text-white-0 h-12 align-center min-h-12 bg-blue-0 border border-blue-0 rounded-xl px-4"
        href="/"
      >
        <Icon
          id="ChevronLeft"
          size={20}
          strokeWidth={2.2}
          class="text-white-0"
        />
        Voltar para o início
      </a>
    </>
  );
}
