import { EmptySearchButton } from "../../islands/Header/Buttons.tsx";
import EmptySearchParams from "../../islands/EmptySearchParams.tsx";
import Icon from "../../components/ui/Icon.tsx";

const EmptySearch = () => {
  return (
    <div class="empty-search-wrapper container my-10 py-8 min-h-[400px] flex items-center justify-center">
      <div class="text-center flex flex-col items-center">
        <span class="text-2xl text-gray-0 font-semibold mb-8 max-w-xs">
          Oops! Não encontramos o que você procura.
        </span>
        <EmptySearchButton />
      </div>
    </div>
  );
};

export default EmptySearch;
