import { Metadata } from "next";
import { getAllPosts } from "../../lib/getPost";
import { draftMode } from "next/headers";

import { notFound } from "next/navigation";
import SidebarWrapper from "../../components/Sidebar";
import getPostContent from "../../components/Post/getPostContent";
import slugify from "slugify";
import Layout from "../../components/Blog/Layout";

export async function generateStaticParams() {
  const posts = await getAllPosts(["slug"]);

  const staticParams = posts.map((post) => {
    const slug = post.slug.split("/").map((e) => slugify(e, { lower: true }));
    return { slug: slug };
  });

  return [...staticParams, { slug: ["/"] }];
}

async function getData({ params }: any, draft: boolean = false) {
  const postContent = await getPostContent(params);
  return postContent;
}

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({
  params,
}: Props): // parent: ResolvingMetadata
Promise<Metadata> {
  const { page } = await getPostContent({ params });
  if (!page?.title) return { title: "Not found" };

  const postUrl = page.slug;

  return {
    title: page.meta.title || page.title,
    description: page.meta?.description,
    // canonical: postUrl,
    openGraph: {
      url: postUrl,
      title: page.meta.title || page.title,
      description: page.meta?.description,
      /*images: [
        {
          url: page.meta?.image?.filename
            ? `https://res.cloudinary.com/di13i8ts4/image/upload/c_fill,h_630,w_1200/${page.meta.image.filename}.jpg`
            : "https://defaultimage", // 1200:630
          alt: page.meta?.image?.alt,
        },
      ],*/
      type: "article",
    },
  };
}

export default async function Page(args: any) {
  const { isEnabled: isDraftMode } = draftMode();

  const data: any = await getData(args, isDraftMode);

  const { post, posts, propTypes } = data.props;

  return <Layout posts={posts} post={post} propTypes={propTypes} />;
}

export const revalidate = 0;
