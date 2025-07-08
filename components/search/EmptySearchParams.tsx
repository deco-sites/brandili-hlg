import { useMemo } from "preact/hooks";

const QUERY_PARAM = "q";

const useURL = () =>
  useMemo(() => {
    const urlSearchParams = new URLSearchParams(
      globalThis.location?.search,
    );
    return urlSearchParams.get(QUERY_PARAM) ?? "";
  }, []);

const EmptySearchParams = () => {
  const urlSearchParams: string = useURL();

  return (
    <>
      <span class="font-bold text-gray-0 text-xl">
        "{urlSearchParams}"
      </span>
    </>
  );
};

export default EmptySearchParams;
