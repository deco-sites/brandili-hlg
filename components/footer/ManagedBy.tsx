import Icon from "../ui/Icon.tsx";

export interface ManagedItem {
  title: "Managed by";
  label: "SocialSA";
}

export default function ManagedBy({
  content,
  layout,
}: { content?: { title?: string; items?: ManagedItem }; layout?: string }) {
  return (
    <>
      {content && content.items && (
        <div
          class={`flex flex-col items-center justify-center min-h-[51px] gap-1 border rounded-sm ${
            layout === "Variation Brandili"
              ? "border-white-2"
              : "border-gray-17"
          }`}
        >
          {content.title && (
            <h3
              class={`font-normal text-xs ${
                layout === "Variation Brandili" ? "text-white-0" : "text-gray-0"
              }`}
            >
              {content.title}
            </h3>
          )}
          <ul class="grid items-center">
            <li>
              <a href="https://socialsa.com/" target="_blank">
                {layout === "Variation Brandili" && (
                  <Icon
                    width={87}
                    height={22}
                    strokeWidth={1}
                    id="SocialSAWhite"
                  />
                )}
                {layout === "Variation Mundi" && (
                  <Icon
                    width={87}
                    height={22}
                    strokeWidth={1}
                    id="SocialSA"
                  />
                )}
              </a>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
