import Icon, { AvailableIcons } from "../../components/ui/Icon.tsx";

export interface SocialItem {
  label:
    | "Instagram"
    | "Facebook"
    | "YouTube";
  link: string;
}

export default function Social(
  { content, vertical = false, layout }: {
    content?: { title?: string; items?: SocialItem[] };
    vertical?: boolean;
    layout?: string;
  },
) {
  return (
    <>
      {content && content.items && content.items.length > 0 && (
        <div
          class={`flex flex-col items-center justify-center min-h-[51px] gap-1 border rounded-sm ${
            layout === "Variation Brandili"
              ? "border-white-2"
              : "border-gray-17"
          }`}
        >
          {content.title && (
            <h3
              class={`text-xs ${
                layout === "Variation Brandili" ? "text-white-0" : "text-gray-0"
              }`}
            >
              {content.title}
            </h3>
          )}
          <ul
            class={`flex gap-4 ${
              vertical ? "lg:flex-col lg:items-start" : "flex-wrap items-center"
            }`}
          >
            {content.items.map((item) => {
              return (
                <li>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${item.label} Logo`}
                    class="flex gap-2 items-center"
                  >
                    <span
                      class={layout === "Variation Brandili"
                        ? "text-white-0"
                        : "text-gray-0"}
                    >
                      <Icon size={23} id={item.label} />
                    </span>
                    {vertical && (
                      <div class="text-sm hidden lg:block">{item.label}</div>
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
}
