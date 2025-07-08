import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import { invoke } from "../../runtime.ts";
import type { Product } from "apps/commerce/types.ts";
import type { JSX } from "preact";

export interface Props {
  productID: Product["productID"];
}

function Notify({ productID }: Props) {
  const loading = useSignal(false);
  const errorText = useSignal("");
  const successText = useSignal("");
  const regex =
    /^(([^<>()\[\]\\.,:\s@"]+(\.[^<>()\[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      loading.value = true;

      const name = (e.currentTarget.elements.namedItem("name") as RadioNodeList)
        ?.value;
      const email =
        (e.currentTarget.elements.namedItem("email") as RadioNodeList)?.value;

      if (name !== "" && email !== "" && regex.test(email)) {
        await invoke.vtex.actions.notifyme({ skuId: productID, name, email });
        successText.value =
          "E-mail cadastrado com sucesso. Avisaremos quando o produto retornar aos estoques.";
        errorText.value = "";
        setTimeout(() => {
          successText.value = "";
          errorText.value = "";
        }, 5000);
      } else if (name === "" && !regex.test(email)) {
        errorText.value = "Digite seu nome e um e-mail válido";
        successText.value = "";
        setTimeout(() => {
          successText.value = "";
          errorText.value = "";
        }, 5000);
      } else if (name !== "" && !regex.test(email)) {
        errorText.value = "Digite um e-mail válido";
        successText.value = "";
        setTimeout(() => {
          successText.value = "";
          errorText.value = "";
        }, 5000);
      } else if (name !== "" && regex.test(email)) {
        errorText.value = "Digite seu nome";
        successText.value = "";
        setTimeout(() => {
          successText.value = "";
          errorText.value = "";
        }, 5000);
      }
    } finally {
      loading.value = false;
    }
  };

  return (
    <form
      class="form-control justify-start gap-2 w-full p-4 bg-gray-9 rounded-md"
      onSubmit={handleSubmit}
    >
      <span class="text-lg text-black-1">
        Ops! Este tamanho está indisponivel
      </span>
      <span class="text-xs text-gray-3 mb-4">
        Avisaremos quando o tamanho desejado estiver disponível novamente.
      </span>
      <div class="form-group mb-4">
        <label>Digite seu nome</label>
        <input
          class="w-full h-[38px] text-base-content outline-none px-3 text-gray-8 bg-transparent"
          name="name"
        />
      </div>
      <div class="form-group mb-4">
        <label>Digite seu email</label>
        <input
          class="w-full h-[38px] text-base-content outline-none px-3 text-gray-8 bg-transparent"
          name="email"
        />
      </div>

      <button
        class="bg-black-1 text-white-0 text-xs h-[42px] hover:bg-black-1 rounded-md"
        disabled={loading}
      >
        Avise-me
      </button>
      {errorText.value !== "" && (
        <span class="text-red-1 text-xs font-poppins font-bold -tracking-tighter">
          {errorText.value}
        </span>
      )}
      {successText.value !== "" && (
        <span class="text-green-0 text-xs font-poppins font-bold -tracking-tighter">
          {successText.value}
        </span>
      )}
    </form>
  );
}

export default Notify;
