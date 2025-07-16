import { invoke } from "../../runtime.ts";
import { useSignal } from "@preact/signals";
import type { JSX } from "preact";
import Logo from "../../components/footer/Logo.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import { type FnContext } from "@deco/deco";
export interface Form {
  placeholder?: string;
  buttonText?: string;
  buttonColor?: "bg-blue-0 text-white-0" | "bg-gold-0 text-white-0";
  /** @format html */
  helpText?: string;
}
export interface Props {
  content: {
    title?: string;
    /** @format textarea */
    description?: string;
    logo?: {
      image?: ImageWidget;
      width?: number;
      height?: number;
    };
    form?: Form;
  };
  layout?: {
    tiled?: boolean;
  };
  device: "mobile";
}
function Newsletter({ content = {} }: Props, { device }: Props) {
  const loading = useSignal(false);
  const _logo = <Logo logo={content?.logo} />;
  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      loading.value = true;
      const name = (e.currentTarget.elements.namedItem("name") as RadioNodeList)
        ?.value;
      const email =
        (e.currentTarget.elements.namedItem("email") as RadioNodeList)?.value;
      const terms =
        (e.currentTarget.elements.namedItem("terms") as HTMLInputElement)
          ?.checked;
      const date = new Date().toISOString().split("T")[0];
      await invoke.vtex.actions.masterdata.createDocument({
        data: { email, name, terms },
        acronym: "NL",
      });
      await fetch(
        "https://brandili.app.n8n.cloud/webhook/b44993d7-119e-4520-86eb-801f9800af50",
        {
          method: "POST",
          body: JSON.stringify({
            "nome": name,
            "email": email,
            "dataCadastro": date,
            "urlPagina": globalThis.window.location.href,
          }),
        },
      );
    } finally {
      (document.getElementById("form-newsletter") as HTMLFormElement).reset();
      setTimeout(() => {
        loading.value = false;
      }, 2500);
    }
  };
  return (
    <div class="flex flex-col gap-y-3.5 bg-gray-9 w-full py-8 px-4">
      <div class="w-full max-w-[1440px] m-auto">
        <div class="flex flex-col">
          {content?.title && (
            <h4 class="flex flex-row items-center gap-x-1 text-2xl text-gray-0 font-medium">
              {content?.title} <i class="w-8 h-7">{_logo}</i>
            </h4>
          )}
          {content?.description && (
            <div class="text-gray-1 text-sm font-normal">
              {content?.description}
            </div>
          )}
        </div>
        <div class="flex flex-col gap-4 mt-3">
          <form
            id="form-newsletter"
            class="flex flex-col gap-4 form-control relative"
            onSubmit={handleSubmit}
          >
            <div class="grid justify-between gap-4 grid-cols-[37%_37%_23%] full-phone:grid-cols-1">
              <div class="form-group">
                <label>{content?.form?.placeholder || "Digite seu nome"}</label>
                <input
                  name="name"
                  class="w-full h-9 text-base-content outline-none px-3 text-gray-8 bg-transparent"
                  required
                />
              </div>
              <div class="form-group peer">
                <label>
                  {content?.form?.placeholder || "Digite seu e-mail"}
                </label>
                <input
                  name="email"
                  class="w-full h-9 text-base-content outline-none px-3 text-gray-8 bg-transparent"
                  type="email"
                  required
                />
              </div>
              {content?.form?.helpText && device === "mobile" && (
                <div class="checkbox-newsletter flex flex-row sm:hidden items-center">
                  <input
                    class="aceite rounded"
                    type="checkbox"
                    id="aceite"
                    name="terms"
                  />
                  <span class="check-aceite"></span>
                  <label
                    class="text-sm"
                    dangerouslySetInnerHTML={{
                      __html: content?.form?.helpText,
                    }}
                  />
                </div>
              )}
              <button
                type="submit"
                class={`disabled:loading h-10 min-h-10 font-normal text-xs rounded w-full  ${
                  content?.form?.buttonColor ?? "btn"
                }`}
                disabled={loading}
              >
                {content?.form?.buttonText || "Cadastrar"}
              </button>
            </div>
            {content?.form?.helpText && (
              <div class="checkbox-newsletter flex flex-row items-center">
                <input
                  class="aceite rounded"
                  type="checkbox"
                  id="aceite"
                  name="terms"
                  required
                />
                <span class="check-aceite"></span>
                <label
                  class="text-sm"
                  dangerouslySetInnerHTML={{ __html: content?.form?.helpText }}
                />
              </div>
            )}
            <div
              class={`${
                loading.value ? "flex" : "hidden"
              } message-success items-center justify-center bg-gray-9 font-semibold text-green-0 text-2xl absolute left-0 -top-1.5 right-0 h-full w-full`}
            >
              Cadastrado com sucesso!
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Newsletter;
