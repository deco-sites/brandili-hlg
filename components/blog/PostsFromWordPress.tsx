import type { Post, Posts } from "site/loaders/PostsFromWP.ts";
import Slider from "../../components/ui/Slider.tsx";
import SliderJS from "../../islands/SliderJS.tsx";
import { clx } from "../../sdk/clx.ts";
import { useId } from "../../sdk/useId.ts";
import Icon from "../../components/ui/Icon.tsx";
import Image from "apps/website/components/Image.tsx";

export interface Props {
  WpPosts: Posts | null;
  layout?: {
    showArrows?: boolean;
    dots?: boolean;
  };
}

const PostsFromWordPress = ({ WpPosts, layout }: Props) => {
  const id = useId();
  const posts = WpPosts?.WpPosts ?? [];

  const slideDesktop = {
    1: "cs-min-desktop:w-full",
    2: "cs-min-desktop:w-1/2",
    3: "cs-min-desktop:w-1/3",
    4: "cs-min-desktop:w-1/4",
    5: "cs-min-desktop:w-1/5",
  };

  const slideBigTablet = {
    1: "full-tablet:w-full",
    2: "full-tablet:w-1/2",
    3: "full-tablet:w-1/3",
    4: "full-tablet:w-1/4",
    5: "full-tablet:w-1/5",
  };

  const slideSmallTablet = {
    1: "md-tablet:w-full",
    2: "md-tablet:w-1/2",
    3: "md-tablet:w-1/3",
    4: "md-tablet:w-1/4",
    5: "md-tablet:w-1/5",
  };

  const slideMobile = {
    1: "full-phone:w-full",
    2: "full-phone:w-1/2",
    3: "full-phone:w-1/3",
    4: "full-phone:w-1/4",
    5: "full-phone:w-1/5",
  };

  return (
    <div class="relative container flex flex-col gap-[16px] pb-8 lg:pb-10 mb-11 mt-5">
      <div class="title">
        <span class="text-[22px] font-semibold text-gray-0 full-phone:text-lg">
          Conheça o nosso blog
        </span>
      </div>

      <div
        id={id}
        class={clx(
          "grid",
          layout?.showArrows &&
            "grid-cols-[4px_1fr_4px] full-phone:grid-cols-[1fr]",
          "px-0",
        )}
      >
        <Slider class="carousel carousel-center sm:carousel-end row-start-2 row-end-5">
          {posts.map((post: Post, key: number) => (
            <Slider.Item
              index={key}
              class={clx(
                "carousel-item",
                slideDesktop[4],
                slideBigTablet[3],
                slideSmallTablet[2],
                slideMobile[1],
              )}
            >
              <div
                class="post-wrapper max-w-[345px] full-tablet:mx-auto"
                key={key}
              >
                <a href={post.link} rel="nofollow">
                  <div class="image-wrapper min-h-[280px] max-h-[280px] flex items-center overflow-hidden">
                    <Image
                      src={post.image}
                      width={345}
                      height={230}
                      loading="lazy"
                      class="mb-1 scale-150"
                    />
                  </div>
                  <div class="title-excerpt flex flex-col">
                    <span class="excerpt-config font-semibold text-xl text-gray-0 py-1">
                      {post.title}
                    </span>
                    <span
                      class="excerpt-config font-regular text-sm text-gray-0"
                      dangerouslySetInnerHTML={{
                        __html: post.excerpt,
                      }}
                    />
                  </div>
                </a>
              </div>
            </Slider.Item>
          ))}
        </Slider>
        {layout?.showArrows && (
          <>
            <div class="relative block z-10 col-start-1 row-start-3 full-phone:hidden">
              <Slider.PrevButton class="absolute left-12 flex justify-center items-center bg-gray-17 h-7 w-7 rounded-full">
                <Icon
                  size={24}
                  id="ChevronLeft"
                  strokeWidth={2.75}
                  class="w-5"
                />
              </Slider.PrevButton>
            </div>
            <div class="relative block z-10 col-start-3 row-start-3 full-phone:hidden">
              <Slider.NextButton class="absolute right-11 flex justify-center items-center bg-gray-17 h-7 w-7 rounded-full">
                <Icon size={24} id="ChevronRight" strokeWidth={3} />
              </Slider.NextButton>
            </div>
          </>
        )}
        {layout?.dots && (
          <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 z-10 block">
            <style
              dangerouslySetInnerHTML={{
                __html: `
              @property --dot-progress {
                syntax: '<percentage>';
                inherits: false;
                initial-value: 0%;
              }
              `,
              }}
            />
            <ul class="carousel justify-center items-end gap-4 z-10">
              {posts.map((_: Post, index: number) => (
                <li class="carousel-item">
                  <Slider.Dot index={index}>
                    <div class="w-3 h-3 rounded-full border border-transparent group-disabled:border-gray-0 flex items-center justify-center">
                      <div class="bg-gray-10 w-2 h-2 rounded-full border border-transparent group-disabled:animate-progress group-disabled:bg-gray-0 group-disabled:border-gray-0 bg-gradient-to-r from-base-100 from-[length:var(--dot-progress)] to-[rgba(255,255,255,0.4)] to-[length:var(--dot-progress)]" />
                    </div>
                  </Slider.Dot>
                </li>
              ))}
            </ul>
          </div>
        )}

        <SliderJS rootId={id} />
      </div>
    </div>
  );
};

export default PostsFromWordPress;
