import { useId } from "../../sdk/useId.ts";
import { useSignal } from "@preact/signals";
import { ComponentChildren } from "preact";
import { useEffect, useState } from "preact/hooks";
import Button from "../../components/ui/Button.tsx";
import Icon from "../../components/ui/Icon.tsx";

interface Props {
  onClose?: () => void;
  open?: boolean;
  class?: string;
  style?: string;
  children?: ComponentChildren;
  loading?: "eager" | "lazy";
}

function ModalQuickBuy(props: Props) {
  const { children, open, onClose, loading = "lazy" } = props;
  const lazy = useSignal(loading === "lazy" && !open);
  const id = useId();

  useEffect(() => {
    const handler = (e: KeyboardEvent) =>
      (e.key === "Escape" || e.keyCode === 27) && open && onClose?.();

    addEventListener("keydown", handler);

    return () => {
      removeEventListener("keydown", handler);
    };
  }, [open]);

  useEffect(() => {
    lazy.value = false;
  }, []);

  return (
    <>
      <input
        id={id}
        checked={open}
        type="checkbox"
        class="modal-toggle quick-buy"
        onChange={(e) => e.currentTarget.checked === false && onClose?.()}
      />
      <div class="modal">
        <Button
          aria-label="X"
          class="btn btn-ghost bg-white-0 hover:bg-white-0 border-white-0 outline-0  absolute top-0 right-0"
          onClick={onClose}
        >
          <Icon id="XMark" width={13} height={13} strokeWidth={1} />
        </Button>
        {!lazy.value && children}
        <label class="modal-backdrop" for={id}></label>
      </div>
    </>
  );
}

export default ModalQuickBuy;
