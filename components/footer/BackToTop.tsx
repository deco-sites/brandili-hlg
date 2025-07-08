import Icon from "../../components/ui/Icon.tsx";

export interface Props {
  content?: string;
}

export default function BackToTop({ content }: Props) {
  return (
    <>
      {content && (
        <button
          class="btn w-full max-w-40 m-auto"
          onClick={() => {
            globalThis.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
        >
          {content} <Icon id="ChevronUp" width={24} height={24} />
        </button>
      )}
    </>
  );
}
