import Icon from "../../components/ui/Icon.tsx";

// deno-lint-ignore-file no-explicit-any
export interface Link {
  href: string;
  label: string;
}

export interface Props {
  links?: Link[];
}

export default function customizableBreadcrumb({ links }: Props) {
  return (
    <div class="w-full container px-16 full-tablet:px-4 mx-auto breadcrumbs my-5 full-tablet:my-3 overflow-hidden truncate">
      <ul>
        <li>
          <a class="text-sm" href="/">
            Home
          </a>
        </li>
        <li>
          {links?.map((link: any) => (
            <a href={link?.href} class="text-sm">
              {link?.label}
            </a>
          ))}
        </li>
      </ul>
    </div>
  );
}
