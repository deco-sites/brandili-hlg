import Image from "apps/website/components/Image.tsx";
import { Logo } from "../../components/header/Header.tsx";

// Make it sure to render it on the server only. DO NOT render it on an island
function TopBar({
  logoBrandili,
  logoMundi,
  bgColor,
  device,
}: {
  logoBrandili?: Logo;
  logoMundi?: Logo;
  device: "mobile" | "desktop" | "tablet";
  bgColor?: "bg-red-0" | "bg-gold-1";
}) {
  return (
    <>
      {/* STATIC MOBILE TOPBAR */}

      <div
        class={`${
          bgColor ?? "bg-red-0"
        } flex items-center w-full cs-min-desktop:hidden h-[34px]`}
      >
        {logoBrandili && (
          <a
            href="/"
            aria-label="Brandili logo"
            className={`block px-2.5 py-1.5 rounded-tr ${
              bgColor === "bg-red-0" ? "bg-white-0" : "opacity-50 "
            }`}
          >
            <Image
              src={logoBrandili.src}
              alt={logoBrandili.alt}
              width={logoBrandili.width || 100}
              height={logoBrandili.height || 13}
            />
          </a>
        )}
        {logoMundi && (
          <a
            href="/mundi"
            aria-label="Mundi logo"
            className={`block  px-2.5 py-1.5 rounded-tl ${
              bgColor === "bg-gold-1" ? "bg-white-0" : "opacity-50 "
            }`}
          >
            <Image
              src={logoMundi.src}
              alt={logoMundi.alt}
              width={logoMundi.width || 100}
              height={logoMundi.height || 13}
            />
          </a>
        )}
      </div>

      {/* FLOATING MOBILE TOPBAR */}

      <div
        class={`${
          bgColor ?? "bg-red-0"
        } cs-min-desktop:hidden flex items-center w-full floating-mobile-topbar-container -z-10 opacity-0 fixed top-0 left-0 h-[34px]`}
      >
        {logoBrandili && (
          <a
            href="/"
            aria-label="Brandili logo"
            className={`block px-2.5 py-1.5 rounded-tr ${
              bgColor === "bg-red-0" ? "bg-white-0" : "opacity-50 "
            }`}
          >
            <Image
              src={logoBrandili.src}
              alt={logoBrandili.alt}
              width={logoBrandili.width || 100}
              height={logoBrandili.height || 13}
            />
          </a>
        )}
        {logoMundi && (
          <a
            href="/mundi"
            aria-label="Mundi logo"
            className={`block  px-2.5 py-1.5 rounded-tl ${
              bgColor === "bg-gold-1" ? "bg-white-0" : "opacity-50 "
            }`}
          >
            <Image
              src={logoMundi.src}
              alt={logoMundi.alt}
              width={logoMundi.width || 100}
              height={logoMundi.height || 13}
            />
          </a>
        )}
      </div>

      {/* STATIC DESKTOP TOPBAR */}

      <div
        className={`${
          bgColor ?? "bg-red-0"
        } flex items-center w-full full-tablet:hidden`}
      >
        <div className="flex">
          {logoBrandili && (
            <a
              href="/"
              aria-label="Brandili logo"
              className={`block px-2.5 py-1.5 rounded-tr ${
                bgColor === "bg-red-0" ? "bg-white-0" : "opacity-50 "
              }`}
            >
              <Image
                src={logoBrandili.src}
                alt={logoBrandili.alt}
                width={logoBrandili.width || 100}
                height={logoBrandili.height || 13}
              />
            </a>
          )}
          {logoMundi && (
            <a
              href="/mundi"
              aria-label="Mundi logo"
              className={`block  px-2.5 py-1.5 rounded-tl ${
                bgColor === "bg-gold-1" ? "bg-white-0" : "opacity-50 "
              }`}
            >
              <Image
                src={logoMundi.src}
                alt={logoMundi.alt}
                width={logoMundi.width || 100}
                height={logoMundi.height || 13}
              />
            </a>
          )}
        </div>
      </div>

      {/* FLOATING DESKTOP TOPBAR */}

      <div
        className={`${
          bgColor ?? "bg-red-0"
        } full-tablet:hidden flex items-center w-full floating-desktop-topbar-container transition-3s -z-10 opacity-0 fixed top-0 left-0`}
      >
        <div className="flex">
          {logoBrandili && (
            <a
              href="/"
              aria-label="Brandili logo"
              className={`block px-2.5 py-1.5 rounded-tr ${
                bgColor === "bg-red-0" ? "bg-white-0" : "opacity-50 "
              }`}
            >
              <Image
                src={logoBrandili.src}
                alt={logoBrandili.alt}
                width={logoBrandili.width || 100}
                height={logoBrandili.height || 13}
              />
            </a>
          )}
          {logoMundi && (
            <a
              href="/mundi"
              aria-label="Mundi logo"
              className={`block  px-2.5 py-1.5 rounded-tl ${
                bgColor === "bg-gold-1" ? "bg-white-0" : "opacity-50 "
              }`}
            >
              <Image
                src={logoMundi.src}
                alt={logoMundi.alt}
                width={logoMundi.width || 100}
                height={logoMundi.height || 13}
              />
            </a>
          )}
        </div>
      </div>
    </>
  );
}

export default TopBar;
