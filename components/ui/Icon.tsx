import { asset } from "$fresh/runtime.ts";
import type { JSX } from "preact";

export type AvailableIcons =
  | "ArrowsPointingOut"
  | "Bars3"
  | "ChevronLeft"
  | "ChevronRight"
  | "ChevronUp"
  | "Close"
  | "ChevronDown"
  | "CreditCard"
  | "Deco"
  | "Diners"
  | "DinersWhite"
  | "Discord"
  | "DiscordWhite"
  | "Discount"
  | "Elo"
  | "Facebook"
  | "FacebookWhite"
  | "FilterList"
  | "Heart"
  | "Instagram"
  | "InstagramWhite"
  | "Linkedin"
  | "LinkedinWhite"
  | "Minus"
  | "MapPin"
  | "MagnifyingGlass"
  | "Mastercard"
  | "MastercardWhite"
  | "Message"
  | "Phone"
  | "Pix"
  | "Plus"
  | "QuestionMarkCircle"
  | "Return"
  | "Ruler"
  | "ShoppingCart"
  | "Star"
  | "Tiktok"
  | "Trash"
  | "Truck"
  | "Twitter"
  | "TwitterWhite"
  | "User"
  | "Visa"
  | "VisaWhite"
  | "VisaWhite"
  | "WhatsApp"
  | "WhatsAppWhite"
  | "XMark"
  | "XMarkSearch"
  | "Zoom"
  | "Alert"
  | "AlertInfo"
  | "AlertSuccess"
  | "AlertWarning"
  | "AlertError"
  | "share"
  | "Orders"
  | "Amex"
  | "AmexWhite"
  | "Boleto"
  | "BoletoWhite"
  | "SocialSA"
  | "SocialSAWhite"
  | "Vtex"
  | "VtexWhite"
  | "YouTube"
  | "ShelfIconBag"
  | "ShelfIconBagMobile"
  | "Wallet"
  | "Percentage"
  | "SizeTable"
  | "AddToCartPDP"
  | "WishlistAdd"
  | "ShippingSim"
  | "ArrowLeftPDP"
  | "ArrowRightPDP"
  | "Algodao"
  | "Elastano"
  | "Poliester"
  | "Peluciado"
  | "Linho"
  | "Security"
  | "SearchBarHeader"
  | "AccountHeader"
  | "AccountHeaderV2"
  | "Help"
  | "AddToCartBTG"
  | "PlusBuyTogether"
  | "EqualsBuyTogether"
  | "BulletPin";

interface Props extends JSX.SVGAttributes<SVGSVGElement> {
  /**
   * Symbol id from element to render. Take a look at `/static/icons.svg`.
   *
   * Example: <Icon id="Bell" />
   */
  id: AvailableIcons;
  size?: number;
}

function Icon(
  { id, strokeWidth, size, width, height, ...otherProps }: Props,
) {
  return (
    <svg
      {...otherProps}
      width={width ?? size}
      height={height ?? size}
      strokeWidth={strokeWidth}
    >
      <use href={asset(`/sprites.svg#${id}`)} />
    </svg>
  );
}

export default Icon;
