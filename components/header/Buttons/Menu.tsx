import Button from "../../../components/ui/Button.tsx";
import Icon from "../../../components/ui/Icon.tsx";
import { useUI } from "../../../sdk/useUI.ts";

export default function MenuButton() {
  const { displayMenu } = useUI();

  return (
    <Button
      class="btn btn-circle md:btn-sm btn-xs btn-ghost scale-150"
      aria-label="open menu"
      onClick={() => {
        displayMenu.value = !displayMenu.value;
      }}
    >
      <Icon id="Bars3" width={20} height={20} strokeWidth={0.01} />
    </Button>
  );
}
