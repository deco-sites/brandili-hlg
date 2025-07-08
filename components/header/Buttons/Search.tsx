import Button from "../../../components/ui/Button.tsx";
import Icon from "../../../components/ui/Icon.tsx";
import { useUI } from "../../../sdk/useUI.ts";

export default function SearchButton() {
  const { displaySearchDrawer, displaySearchPopup } = useUI();

  return (
    <>
      <Button
        class="btn-circle btn-sm btn-ghost hidden lg:flex"
        aria-label="search icon button"
        onClick={() => {
          displaySearchPopup.value = !displaySearchPopup.value;
        }}
      >
        <Icon id="SearchBarHeader" width={14} height={14} strokeWidth={1} />
      </Button>
      <Button
        class="btn-circle btn-sm btn-ghost lg:hidden scale-150"
        aria-label="search icon button"
        onClick={() => {
          displaySearchDrawer.value = !displaySearchDrawer.value;
        }}
      >
        <Icon id="SearchBarHeader" width={14} height={14} strokeWidth={1} />
      </Button>
    </>
  );
}
