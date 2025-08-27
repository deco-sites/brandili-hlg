import Icon, { AvailableIcons } from "../../components/ui/Icon.tsx";

export type Item = {
  label: string;
  description?: string;
  href?: string;
};

export type Section = {
  label: string;
  items: Item[];
  textColor?: "text-white-1" | "text-gray-0";
};

export default function FooterItems({
  sections,
  justify = false,
}: {
  sections: Section[];
  justify: boolean;
}) {
  return (
    <>
      {sections.length > 0 && (
        <>
          {/* Tablet and Desktop view */}
          <ul class="hidden w-full full-desktop:grid grid-cols-[33%_33%_33%] gap-2 full-desktop:justify-start">
            {sections.map((section) => (
              <li>
                <div class="flex flex-col gap-2">
                  <h5
                    class={`font-medium text-base ${
                      section.textColor ?? "text-black-0"
                    }`}
                  >
                    {section.label}
                  </h5>
                  <ul class="flex flex-col gap-1 flex-wrap text-sm">
                    {section.items?.map((item) => (
                      <li>
                        <a
                          href={item.href}
                          class={`block py-1 no-underline text-xs font-normal footerItems ${
                            section.textColor ?? "text-black-0"
                          }`}
                        >
                          {item.label}
                        </a>
                        {item.description && (
                          <span
                            class={`text-xs font-light ${
                              section.textColor ?? "text-black-0"
                            }`}
                            dangerouslySetInnerHTML={{
                              __html: item.description,
                            }}
                          />
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>

          {/* Mobile view */}
          <ul class="flex flex-col full-desktop:hidden my-4">
            {sections.map((section) => (
              <li>
                <div
                  class={`footer-items collapse collapse-arrow border-b rounded-none ${
                    section.textColor === "text-white-1"
                      ? "border-white-1"
                      : "border-gray-17"
                  }`}
                >
                  <input id={section.label} type="checkbox" class="min-h-0" />
                  <label
                    htmlFor={section.label}
                    class={`collapse-title min-h-0 flex items-center gap-2 font-normal text-sm ${
                      section.textColor ?? "text-black-0"
                    }`}
                  >
                    <span class={section.textColor ?? "text-black-0"}>
                      {section.label}
                    </span>
                  </label>
                  <div class="collapse-content">
                    <ul class={`flex flex-col gap-1.5 pl-0 pt-0`}>
                      {section.items?.map((item) => (
                        <li>
                          <a
                            href={item.href}
                            class={`block py-1 link link-hover font-normal text-sm ${
                              section.textColor ?? "text-black-0"
                            }`}
                          >
                            {item.label}
                          </a>
                          {item.description && (
                            <span
                              class={`font-normal text-sm ${
                                section.textColor ?? "text-black-0"
                              }`}
                              dangerouslySetInnerHTML={{
                                __html: item.description,
                              }}
                            />
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}
