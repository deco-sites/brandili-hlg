import { type MatchContext } from "@deco/deco/blocks";
export interface Props {
  urlIncludes: string;
}
/**
 * @title URL Includes
 * @description URL Includes
 */
export default function Utm({ urlIncludes }: Props, ctx: MatchContext) {
  const url = new URL(ctx.request.url);
  return url.pathname.includes(urlIncludes) ?? false;
}
