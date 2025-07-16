import Icon from "../../components/ui/Icon.tsx";

const NotFound = () => {
  return (
    <div class="empty-search-wrapper mx-auto full-phone:px-4 container my-10 py-8">
      <div class="text-center flex flex-col items-center">
        <span class="text-2xl text-gray-0 font-semibold mb-6">
          Não encontramos essa página
        </span>
        <span class="mb-8 erro-404">
        </span>
        <a
          href="/"
          class="flex items-center justify-center font-normal text-md text-white-0 h-12 align-center min-h-12 bg-blue-0 border border-blue-0 rounded-xl px-4"
        >
          <Icon
            id="ChevronLeft"
            size={20}
            strokeWidth={2.2}
            class="text-white-0"
          />
          Voltar para o início
        </a>
      </div>
    </div>
  );
};

export default NotFound;
