import { Head } from "$fresh/runtime.ts";
import HeaderInstagram from "../../components/ui/SectionHeaderCustom.tsx";

interface Props {
  title?: string;
  description?: string;
  link?: string;
  elfsightid?: string;
  titleLayout?: {
    headerAlignment?: "center" | "left";
  };
}

function InstagramElfsight({ title, description, titleLayout, link, elfsightid }: Props) {
  return (
    <>
      <Head>
        <script
          src="https://static.elfsight.com/platform/platform.js"
          data-use-service-core
          defer
        >
        </script>
      </Head>
      <div className="mb-9">
        <HeaderInstagram
          title={title || "Instagram"}
          description={description || "Explore o universo encantador da moda infantil!"}
          link={link}
          alignment={titleLayout?.headerAlignment || "center"}
        />
        <div
          class= {elfsightid}
          data-elfsight-app-lazy="data-elfsight-app-lazy"
        >
        </div>
      </div>
    </>
  );
}

export default InstagramElfsight;
