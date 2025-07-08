import Divider from "../../components/footer/Divider.tsx";
import ExtraLinks from "../../components/footer/ExtraLinks.tsx";
import FooterItems from "../../components/footer/FooterItems.tsx";
import Logo from "../../components/footer/Logo.tsx";
import PaymentMethods from "./PaymentMethods.tsx";
import ManagedBy from "./ManagedBy.tsx";
import Platform from "./Platform.tsx";
import Social from "../../components/footer/Social.tsx";
import Newsletter from "../../islands/Newsletter.tsx";
import { clx } from "../../sdk/clx.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";
import PoweredByDeco from "apps/website/components/PoweredByDeco.tsx";

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

export interface SocialItem {
  label:
    | "Instagram"
    | "Facebook"
    | "YouTube";
  link: string;
}

export interface PaymentItem {
  label: "Diners" | "Elo" | "Mastercard" | "Pix" | "Visa" | "Amex" | "Boleto";
}

export interface ManagedItem {
  label: "SocialSA";
}

export interface PlatformItem {
  label: "Vtex";
}

export interface NewsletterForm {
  placeholder?: string;
  buttonText?: string;
  buttonColor?: "bg-blue-0 text-white-0" | "bg-gold-0 text-white-0";
  /** @format html */
  helpText?: string;
}

export interface Layout {
  backgroundColor?:
    | "Primary"
    | "Secondary"
    | "Accent"
    | "Base 100"
    | "Base 100 inverted";
  variation?:
    | "Variation 1"
    | "Variation 2"
    | "Variation 3"
    | "Variation 4"
    | "Variation 5"
    | "Variation Brandili"
    | "Variation Mundi";
  hide?: {
    newsletter?: boolean;
    sectionLinks?: boolean;
    socialLinks?: boolean;
    paymentMethods?: boolean;
    mobileApps?: boolean;
    regionOptions?: boolean;
    extraLinks?: boolean;
  };
}

export interface Props {
  logo?: {
    image: ImageWidget;
    description?: string;
  };
  newsletter?: {
    title?: string;
    logo?: {
      image?: ImageWidget;
      width?: number;
      height?: number;
    };
    /** @format textarea */
    description?: string;
    form?: NewsletterForm;
  };
  sections?: Section[];
  social?: {
    title?: string;
    items: SocialItem[];
  };
  payments?: {
    title?: string;
    items: PaymentItem[];
  };
  managed?: {
    title?: string;
    items: ManagedItem;
  };
  platform?: {
    title?: string;
    items: PlatformItem;
  };
  extraLinks?: Item[];
  /** @format textarea */
  textFooter?: string;
  layout?: Layout;
}

const LAYOUT = {
  "Primary": "bg-primary text-primary-content",
  "Secondary": "bg-secondary text-secondary-content",
  "Accent": "bg-accent text-accent-content",
  "Base 100": "bg-base-100 text-base-content",
  "Base 100 inverted": "bg-base-content text-base-100",
};

function Footer({
  logo,
  newsletter = {
    title: "Newsletter",
    description: "",
    form: {
      placeholder: "",
      buttonText: "",
      buttonColor: "bg-blue-0 text-white-0",
      helpText: "",
    },
  },
  sections = [
    {
      label: "Atendimento",
      items: [
        {
          href: "/centraldeatendimento",
          label: "Contato",
          description:
            "Segunda a sexta-feira, das 8h às 20h<br />e aos sábados, das 9h às 18h.<br />Telefone: (11) 4637-3951",
        },
        {
          href: "/whatsapp",
          label: "Fale conosco pelo WhatsApp",
        },
        {
          href: "/trocaedevolucao",
          label: "Troca e devolução",
        },
      ],
    },
    {
      label: "Sobre",
      items: [
        {
          href: "/quem-somos",
          label: "Quem somos",
        },
        {
          href: "/termos-de-uso",
          label: "Termos de uso",
        },
        {
          href: "/trabalhe-conosco",
          label: "Trabalhe conosco",
        },
      ],
    },
    {
      label: "Minha conta",
      items: [
        {
          href: "/centraldeatendimento",
          label: "Central de atendimento",
        },
        {
          href: "/whatsapp",
          label: "Fale conosco pelo WhatsApp",
        },
        {
          href: "/trocaedevolucao",
          label: "Troca e devolução",
        },
      ],
    },
  ],
  managed = {
    title: "Managed by",
    items: {
      label: "SocialSA",
    },
  },
  platform = {
    title: "Plataforma",
    items: {
      label: "Vtex",
    },
  },
  payments = {
    title: "Formas de pagamento",
    items: [{ label: "Mastercard" }, { label: "Visa" }, { label: "Pix" }],
  },
  social = {
    title: "Redes sociais",
    items: [{ label: "Instagram", link: "/" }, { label: "Tiktok", link: "/" }],
  },
  textFooter = "Todos os direitos reservados.",
  extraLinks = [],
  layout = {
    backgroundColor: "Primary",
    variation: "Variation 1",
    hide: {
      newsletter: false,
      sectionLinks: false,
      socialLinks: false,
      paymentMethods: false,
      mobileApps: false,
      regionOptions: false,
      extraLinks: false,
    },
  },
}: Props) {
  const _logo = (
    <Logo class="footer-logo text-center" logo={logo} logoFooter={true} />
  );
  const _newsletter = layout?.hide?.newsletter ? <></> : (
    <Newsletter
      content={newsletter}
      layout={{
        tiled: layout?.variation == "Variation 4" ||
          layout?.variation == "Variation 5" ||
          layout?.variation == "Variation Brandili" ||
          layout?.variation == "Variation Mundi",
      }}
    />
  );
  const _sectionLinks = layout?.hide?.sectionLinks ? null : (
    <FooterItems
      sections={sections}
      justify={layout?.variation == "Variation 2" ||
        layout?.variation == "Variation 3"}
    />
  );
  const _platform = <Platform content={platform} layout={layout?.variation} />;
  const _managed = <ManagedBy content={managed} layout={layout?.variation} />;
  const _payments = layout?.hide?.paymentMethods
    ? <></>
    : <PaymentMethods content={payments} layout={layout?.variation} />;
  const _social = layout?.hide?.socialLinks ? <></> : (
    <Social
      content={social}
      vertical={layout?.variation == "Variation 3"}
      layout={layout?.variation}
    />
  );
  const _links = layout?.hide?.extraLinks
    ? <></>
    : <ExtraLinks content={extraLinks} />;

  return (
    <footer
      class={clx(
        "w-full flex flex-col pt-5 gap-10",
        LAYOUT[layout?.backgroundColor ?? "Primary"],
      )}
    >
      <div class="">
        {(!layout?.variation || layout?.variation == "Variation 1") && (
          <div class="flex flex-col gap-10">
            <div class="flex flex-col md:flex-row md:justify-between md:flex-wrap lg:flex-nowrap gap-8 lg:gap-12">
              {_logo}
              {_sectionLinks}
              {_newsletter}
            </div>
            <Divider />
            <div class="flex flex-col md:flex-row gap-10 md:gap-14 md:items-end">
              {_payments}
              {_social}
            </div>
            <Divider />
            <div class="flex flex-col-reverse md:flex-row md:justify-between gap-10">
              <PoweredByDeco />
              {_links}
            </div>
          </div>
        )}
        {layout?.variation == "Variation 2" && (
          <div class="flex flex-col gap-10">
            <div class="flex flex-col md:flex-row gap-10">
              <div class="flex flex-col gap-10 lg:w-1/2">
                {_logo}
                {_social}
                {_payments}
              </div>
              <div class="flex flex-col gap-10 lg:gap-20 lg:w-1/2 lg:pr-10">
                {_newsletter}
                {_sectionLinks}
              </div>
            </div>
            <Divider />
            <div class="flex flex-col-reverse md:flex-row md:justify-between gap-10">
              <PoweredByDeco />
              {_links}
            </div>
          </div>
        )}
        {layout?.variation == "Variation 3" && (
          <div class="flex flex-col gap-10">
            {_logo}
            <div class="flex flex-col lg:flex-row gap-14">
              <div class="flex flex-col md:flex-row lg:flex-col md:justify-between lg:justify-normal gap-10 lg:w-2/5">
                {_newsletter}
                <div class="flex flex-col gap-10">
                  {_payments}
                </div>
              </div>
              <div class="flex flex-col gap-10 lg:gap-20 lg:w-3/5 lg:items-end">
                <div class="flex flex-col md:flex-row gap-10">
                  {_sectionLinks}
                  {_social}
                </div>
              </div>
            </div>
            <Divider />
            <div class="flex flex-col-reverse md:flex-row md:justify-between gap-10">
              <PoweredByDeco />
              {_links}
            </div>
          </div>
        )}
        {layout?.variation == "Variation 4" && (
          <div class="flex flex-col gap-10">
            {_newsletter}
            {layout?.hide?.newsletter ? <></> : <Divider />}
            <div class="flex flex-col lg:flex-row gap-10 lg:gap-20 lg:justify-between">
              {_sectionLinks}
              <div class="flex flex-col md:flex-row lg:flex-col gap-10 lg:gap-10 lg:w-2/5 lg:pl-10">
                <div class="flex flex-row md:flex-row gap-10 lg:gap-20">
                  <div class="lg:flex-auto">
                    {_payments}
                  </div>
                  <div class="lg:flex-auto">
                    {_social}
                  </div>
                </div>
              </div>
            </div>
            <Divider />
            <div class="flex flex-col md:flex-row md:justify-between gap-10 md:items-center">
              {_logo}
              <PoweredByDeco />
            </div>
          </div>
        )}
        {layout?.variation == "Variation 5" && (
          <div class="flex flex-col gap-10">
            {_newsletter}
            {layout?.hide?.newsletter ? <></> : <Divider />}
            {_logo}
            <div class="flex flex-col md:flex-row gap-10 lg:gap-20 md:justify-between">
              {_sectionLinks}
              <div class="flex flex-col gap-10 md:w-2/5 lg:pl-10">
                {_payments}
                {_social}
              </div>
            </div>
            <Divider />
            <div class="flex flex-col-reverse md:flex-row md:justify-between gap-10 md:items-center">
              <PoweredByDeco />
              <div class="flex flex-col md:flex-row gap-10 md:items-center">
                {_links}
              </div>
            </div>
          </div>
        )}
        {layout?.variation == "Variation Brandili" && (
          <div class="flex flex-col gap-16">
            {_newsletter}
            <div class="flex flex-col gap-10 bg-blue-0 py-6 px-3">
              <div class="flex flex-col w-full max-w-[1440px] m-auto gap-y-9 mt-2">
                <div class="w-full flex flex-col full-desktop:grid md:grid-cols-[20%_80%]">
                  <div class="flex full-tablet:items-center full-tablet:justify-center cs-min-desktop:mt-[35px]">
                    {_logo}
                  </div>
                  {_sectionLinks}
                </div>
                <div class="flex flex-col gap-10">
                  <div class="flex flex-row gap-3 full-tablet:grid full-phone:grid-cols-2 xsm-tablet:grid-cols-2 full-tablet:grid-cols-4 xxsm-phone:gap-2">
                    <div class="flex-auto">
                      {_platform}
                    </div>
                    <div class="flex-auto">
                      {_managed}
                    </div>
                    <div class="flex-auto">
                      {_payments}
                    </div>
                    <div class="flex-auto">
                      {_social}
                    </div>
                  </div>
                </div>
                <div
                  class="block text-xs text-center text-white-0"
                  dangerouslySetInnerHTML={{ __html: textFooter }}
                />
              </div>
            </div>
          </div>
        )}
        {layout?.variation == "Variation Mundi" && (
          <div class="flex flex-col gap-16">
            {_newsletter}
            <div class="flex flex-col gap-10 bg-gold-2 py-6 px-3">
              <div class="flex flex-col w-full max-w-[1440px] m-auto gap-y-9 mt-2">
                <div class="w-full flex flex-col full-desktop:grid md:grid-cols-[20%_80%]">
                  <div class="flex full-tablet:items-center full-tablet:justify-center cs-min-desktop:mt-[35px]">
                    {_logo}
                  </div>
                  {_sectionLinks}
                </div>
                <div class="flex flex-col gap-10">
                  <div class="flex flex-row gap-3 full-tablet:grid full-phone:grid-cols-2 xsm-tablet:grid-cols-2 full-tablet:grid-cols-4 xxsm-phone:gap-2 ">
                    <div class="lg:flex-auto">
                      {_platform}
                    </div>
                    <div class="lg:flex-auto">
                      {_managed}
                    </div>
                    <div class="lg:flex-auto">
                      {_payments}
                    </div>
                    <div class="lg:flex-auto">
                      {_social}
                    </div>
                  </div>
                </div>
                <div
                  class="block text-xs text-center text-gray-0"
                  dangerouslySetInnerHTML={{ __html: textFooter }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </footer>
  );
}

export default Footer;
