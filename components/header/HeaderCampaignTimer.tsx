import { useId } from "../../sdk/useId.ts";
import type { HTMLWidget } from "apps/admin/widgets.ts";
import { scriptAsDataURI } from "apps/utils/dataURI.ts";
import { Buttons } from "../../components/header/Header.tsx";

export interface Props {
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
  buttons?: Buttons;
  link?: string;
  ctaText?: string;
}

const snippet = (expiresAt: string, rootId: string) => {
  const expirationDate = new Date(expiresAt).getTime();

  const getDelta = () => {
    const delta = expirationDate - new Date().getTime();

    const days = Math.floor(delta / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (delta % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor((delta % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((delta % (1000 * 60)) / 1000);

    return {
      days,
      hours,
      minutes,
      seconds,
    };
  };

  const setValue = (id: string, value: number) => {
    const elem = document.getElementById(id);

    if (!elem) return;

    elem.style.setProperty("--value", value.toString());
  };

  const start = () =>
    setInterval(() => {
      const { days, hours, minutes, seconds } = getDelta();
      const isExpired = days + hours + minutes + seconds < 0;

      if (isExpired) {
        const expired = document.getElementById(`${rootId}::expired`);
        const counter = document.getElementById(`${rootId}::counter`);

        expired && expired.classList.remove("hidden");
        counter && counter.classList.add("hidden");
      } else {
        setValue(`${rootId}::days`, days);
        setValue(`${rootId}::hours`, hours);
        setValue(`${rootId}::minutes`, minutes);
        setValue(`${rootId}::seconds`, seconds);
      }
    }, 1_000);

  document.readyState === "complete"
    ? start()
    : addEventListener("load", start);
};

function HeaderCampaignTimer({
  expiresAt = `${new Date()}`,
  labels = {
    days: "dias",
    hours: "horas",
    minutes: "min",
    seconds: "seg",
  },
  text = "",
  buttons,
  link,
  ctaText,
}: Props) {
  const id = useId();
  interface TimeComponentProps {
    id: string;
    label: string | undefined;
    time: string;
  }

  const TimeComponent: preact.FunctionalComponent<TimeComponentProps> = ({
    id,
    label,
    time,
  }) => (
    <div class="flex flex-col items-center">
      <span class="countdown text-[28px] text-white-0">
        <span
          class={`text-2lg text-white-0 font-medium ${
            time === "seconds" ? "full-phone:hidden" : ""
          }`}
          id={`${id}::${time}`}
        />
      </span>
      <span
        class={`text-[10px] text-white-0 font-thin ${
          time === "seconds" ? "full-phone:hidden" : ""
        }`}
      >
        {label || ""}
      </span>
    </div>
  );

  return (
    !buttons?.hideHeaderCampaignTimer && (
      <>
        <div class="bg-blue-0 cs-min-desktop:max-h-[50px]">
          <div class="container mx-auto flex flex-row items-center justify-center full-phone:justify-around py-1 gap-14 full-tablet:gap-6 full-phone:px-1 full-phone:gap-[6px]">
            <div class="flex flex-wrap gap-8 items-center justify-center">
              <div id={`${id}::counter`}>
                <div class="grid grid-flow-col gap-2 full-phone:gap-1 text-center full-phone:text-xs auto-cols-max items-center text-white-0">
                  <TimeComponent id={id} label={labels?.days} time="days" />:
                  <TimeComponent id={id} label={labels?.hours} time="hours" />:
                  <TimeComponent
                    id={id}
                    label={labels?.minutes}
                    time="minutes"
                  />

                  <TimeComponent
                    id={id}
                    label={labels?.seconds}
                    time="seconds"
                  />
                </div>
              </div>
            </div>
            <div
              class="text-xl full-phone:text-xs text-center font-semibold text-white-0 full-phone:max-w-[200px]"
              dangerouslySetInnerHTML={{ __html: text }}
            >
            </div>
            {ctaText && (
              <div class="max-w-lg">
                <a
                  class="flex items-center justify-center text-lg full-phone:text-xs text-center uppercase bg-white-0 w-auto h-auto rounded-md px-6 py-1 full-phone:p-1"
                  href={link ?? "#"}
                >
                  <span class="text-blue-0 text-sm full-phone:text-xs font-semibold">
                    {ctaText ?? "Vou levar"}
                  </span>
                </a>
              </div>
            )}
          </div>
        </div>
        <script defer src={scriptAsDataURI(snippet, expiresAt, id)} />
      </>
    )
  );
}

export default HeaderCampaignTimer;
