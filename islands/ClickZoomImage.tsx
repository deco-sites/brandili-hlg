import { signal } from "@preact/signals";

export const openModal = signal(false);

const ClickZoomImage = () => {
  return (
    <>
      <button
        class="bg-transparent border-0 absolute w-full h-full z-20"
        onClick={() => openModal.value = true}
      >
      </button>
    </>
  );
};

export default ClickZoomImage;
