import { clx } from "../../sdk/clx.ts";

export interface Props {
  title?: string;
  fontSize?: "Small" | "Normal" | "Large";
  description?: string;
  /** @description href */
  link?: string;
  alignment?: "center" | "left";
  colorReverse?: boolean;
}

function HeaderCustom(props: Props) {
  return (
    <>
      {props.title || props.description
        ? (
          <div
            class={`flex flex-col mb-6 ${
              props.alignment === "left" ? "text-left" : "text-center"
            }`}
          >
            {props.title &&
              (
                <>
                  <h2 class="text-xl text-gray-0 font-poppins font-medium capitalize mb-[3px]">
                    <a
                      href={props.link ??
                        "https://www.instagram.com/mundioficial/"}
                      target="_blank"
                      title="@brandili_oficial"
                    >
                      {props.title}
                    </a>
                  </h2>
                  <span class="border borer-gray-0 w-14 h-[1px] text-center block mx-auto mb-1" />
                </>
              )}
            {props.description &&
              (
                <h3 class="text-base full-phone:text-xs text-gray-1 font-poppins font-normal">
                  <a
                    href={props.link ??
                      "https://www.instagram.com/brandili_oficial/"}
                    target="_blank"
                    title="@brandili_oficial"
                  >
                    {props.description}
                  </a>
                </h3>
              )}
          </div>
        )
        : null}
    </>
  );
}

export default HeaderCustom;
