import { default as MenuButtonComponent } from "../../components/header/Buttons/Menu.tsx";
import { default as SearchButtonComponent } from "../../components/header/Buttons/Search.tsx";
import { default as EmptySearchButtonComponent } from "../../components/header/Buttons/EmptySearchButton.tsx";

export function MenuButton() {
  return <MenuButtonComponent />;
}

export function SearchButton() {
  return <SearchButtonComponent />;
}

export function EmptySearchButton() {
  return <EmptySearchButtonComponent />;
}
