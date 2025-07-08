import Icon from "../ui/Icon.tsx";

export interface PlatformItem {
  title: "Plataforma";
  label: "Vtex";
}

export default function Platform({
  content,
  layout,
}: { content?: { title?: string; items?: PlatformItem }; layout?: string }) {
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
            {layout === "Variation Brandili" && (
              <li>
                <Icon
                  width={59}
                  height={22}
                  strokeWidth={1}
                  id="VtexWhite"
                />
              </li>
            )}
            {layout === "Variation Mundi" && (
              <li>
                <Icon
                  width={59}
                  height={22}
                  strokeWidth={1}
                  id="Vtex"
                />
              </li>
            )}
          </ul>
        </div>
      )}
    </>
  );
}
