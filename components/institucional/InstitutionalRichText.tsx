import type { HTMLWidget } from "apps/admin/widgets.ts";

export interface Props {
  /**
   * @title Título
   */
  title?: string;

  /**
   * @title Conteúdo Institucional
   * @default
   */
  text?: HTMLWidget;
}

const InstitutionalRichText = ({ title, text }: Props) => {
  return (
    <div class="container mb-20">
      {title && (
        <h1 class="font-medium text-gray-0 text-center text-5xl full-phone:text-2xl mt-6 mb-7">
          {title}
        </h1>
      )}
      {text && (
        <div
          class="w-full text-sm text-gray-1 font-light content-institutional"
          dangerouslySetInnerHTML={{ __html: text }}
        />
      )}
    </div>
  );
};

export default InstitutionalRichText;
