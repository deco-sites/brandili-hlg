export interface Props {
  /**
   * @title Número máximo de posts
   * @default 4
   * */
  maxNumberOfPosts?: number
}

export interface Post {
  link: string
  title: string
  excerpt: string
  image: string
}

interface WpApiReturn {
  link: string
  title: {
    rendered: string
  }
  excerpt: {
    rendered: string
  }
  yoast_head: string
}
export interface Posts {
  WpPosts: Post[]
}

export default async function GetPosts({ maxNumberOfPosts = 8 }: Props): Promise<Posts | null> {

  function extractImageUrl(yoastHead: string) {
    const regex = /<meta property="og:image" content="(.*?)"/;

    const match = yoastHead.match(regex);

    if (match && match[1]) {
      const imageUrl = match[1];
      return imageUrl
    } else {
      return null
    }
  }

  const timeout = new Promise<undefined>((resolve) => {
    setTimeout(() => {
      resolve(undefined);
    }, 5_000);
  });

  const response = await Promise.race([
    fetch(
      `https://conteudo.brandili.com.br/wp-json/wp/v2/posts?_fields=link,title,excerpt,yoast_head&per_page=${maxNumberOfPosts}`,
    ),
    timeout,
  ]);

  if (!response) {
    throw Error("Não foi possível buscar os posts do WP");
  }

  const fetchedPosts = await response?.json();

  return {
    WpPosts: fetchedPosts.map((post: WpApiReturn) => ({
      link: post.link,
      title: post.title.rendered,
      excerpt: post.excerpt.rendered,
      image: extractImageUrl(post.yoast_head),
    })),
  };
}
