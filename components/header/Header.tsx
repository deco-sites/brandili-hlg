import { AppContext } from "site/apps/site.ts";
import type { Props as SearchbarProps } from "site/components/search/Searchbar.tsx";
import Drawers from "site/islands/Header/Drawers.tsx";
import ScrollHeader from "site/islands/ScrollHeader.tsx";
import { usePlatform } from "site/sdk/usePlatform.tsx";
import type { HTMLWidget, ImageWidget } from "apps/admin/widgets.ts";
import type { SiteNavigationElement } from "apps/commerce/types.ts";
import Navbar from "./Navbar.tsx ";
import TopBar from "./TopBar.tsx ";
import HeaderCampaignTimer from "./HeaderCampaignTimer.tsx";
import { type SectionProps } from "@deco/deco";
export interface Logo {
    src: ImageWidget;
    alt: string;
    width?: number;
    height?: number;
}
export interface Buttons {
    hideSearchButton?: boolean;
    hideAccountButton?: boolean;
    hideWishlistButton?: boolean;
    hideCartButton?: boolean;
    hideHeaderCampaignTimer?: boolean;
}
export interface Props {
    /** @title Header Campaign Timer */
    headerCampaignTimer?: {
        /**
         * @title Text
         * @default Time left for a campaign to end with a link
         */
        text?: HTMLWidget;
        /**
         * @title Expires at date
         * @format datetime
         */
        expiresAt?: string;
        labels?: {
            days?: string;
            hours?: string;
            minutes?: string;
            seconds?: string;
        };
        link?: string;
        ctaText?: string;
    };
    /** @title Top Bar */
    topBar?: {
        /** @title Logo Brandili */
        logoBrandili?: Logo;
        /** @title Logo Mundi */
        logoMundi?: Logo;
        /** @title Background Color */
        bgColor?: "bg-red-0" | "bg-gold-1";
    };
    /** @title Search Bar */
    searchbar?: Omit<SearchbarProps, "platform">;
    /**
     * @title Navigation items
     * @description Navigation items used both on mobile and desktop menus
     */
    navItems?: SiteNavigationElement[] | null;
    /** @title Logo */
    logo?: Logo;
    logoLink?: string;
    logoPosition?: "left" | "center";
    buttons?: Buttons;
}
function Header({ searchbar, navItems = [
    {
        "@type": "SiteNavigationElement",
        name: "Feminino",
        url: "/",
    },
    {
        "@type": "SiteNavigationElement",
        name: "Masculino",
        url: "/",
    },
    {
        "@type": "SiteNavigationElement",
        name: "Sale",
        url: "/",
    },
    {
        "@type": "SiteNavigationElement",
        name: "Linktree",
        url: "/",
    },
], topBar = {
    logoMundi: {
        src: "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2291/986b61d4-3847-4867-93c8-b550cb459cc7",
        width: 100,
        height: 16,
        alt: "Logo",
    },
    logoBrandili: {
        src: "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2291/986b61d4-3847-4867-93c8-b550cb459cc7",
        width: 100,
        height: 16,
        alt: "Logo",
    },
    bgColor: "bg-red-0",
}, logo = {
    src: "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2291/986b61d4-3847-4867-93c8-b550cb459cc7",
    width: 100,
    height: 16,
    alt: "Logo",
}, logoLink = "/", headerCampaignTimer = {
    expiresAt: `${new Date()}`,
    labels: {
        days: "days",
        hours: "hours",
        minutes: "minutes",
        seconds: "seconds",
    },
    text: "",
    link: "#",
    ctaText: "Vou levar",
}, logoPosition = "center", buttons, device, }: SectionProps<typeof loader>) {
    const platform = usePlatform();
    const items = navItems ?? [];
    return (<>
      <header>
        <div class={`scrollHeader top-0 bg-base-100 w-full z-50 rounded-b-2xl shadow-blg`}>
          <ScrollHeader />
          <Drawers menu={{ items }} searchbar={searchbar} platform={platform}/>
          <div>
            <HeaderCampaignTimer expiresAt={headerCampaignTimer.expiresAt} labels={headerCampaignTimer.labels} text={headerCampaignTimer.text} link={headerCampaignTimer.link} ctaText={headerCampaignTimer.ctaText} buttons={buttons}/>
            <TopBar device={device} logoBrandili={topBar?.logoBrandili} logoMundi={topBar?.logoMundi} bgColor={topBar?.bgColor}/>
            <Navbar device={device} items={items} searchbar={searchbar && { ...searchbar, platform }} logo={logo} logoLink={logoLink} logoPosition={logoPosition} buttons={buttons}/>
          </div>
        </div>
      </header>
    </>);
}
export const loader = (props: Props, _req: Request, ctx: AppContext) => {
    return { ...props, device: ctx.device };
};
export default Header;
