import Slider from "../components/ui/Slider.tsx";
import { useEffect, useState } from "preact/hooks";

export interface Item {
  href: string;
  label: string;
}

export interface Props {
  items?: Item[];
}

export default function MenuTabs({ items }: Props) {
  const [pathName, setPathName] = useState("");

  useEffect(() => {
    setPathName(window.location.pathname);
  }, []);

  return (
    <>
      <div className="container gap-7 hidden lg:flex lg:max-w-container justify-center mb-16 mt-16">
        {items &&
          items?.map((item) => (
            <a
              href={item.href}
              className={`p-2 rounded-md border border-gray-5 bg-gray-5 text-base text-center max-w-60 min-h-[66px] ${
                item.href === pathName ? "font-semibold" : "font-normal"
              }`}
            >
              {item?.label}
            </a>
          ))}
      </div>
      <Slider class="carousel carousel-center w-full mt-[50px] full-phone:mt-[0px] gap-2.5 sm:gap-5 sm:ml-1/25 lg:ml-0 lg:hidden mb-12">
        {items &&
          items?.map((item: any, index: number) => (
            <Slider.Item
              index={index}
              class="flex flex-col carousel-item first:ml-6 full-phone:first:ml-3 last:mr-6 sm:last:mr-10 lg:last:mr-0 overflow-hidden"
            >
              <a
                href={item.href}
                className={`p-2 rounded-md border border-gray-5 bg-gray-5 text-base text-center max-w-60 min-h-[66px] ${
                  item.href === pathName ? "font-semibold" : "font-normal"
                }`}
              >
                {item?.label}
              </a>
            </Slider.Item>
          ))}
      </Slider>
    </>
  );
}
