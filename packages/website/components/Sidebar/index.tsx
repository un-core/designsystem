"use client";
import React from "react";

import {
  Link,
  Wrapper,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbHome,
  Tag,
  Tab,
  Text,
  Tabs,
} from "@wfp/react";
import { MDXRemote } from "next-mdx-remote";
import NextLink from "next/link";
import styles from "./sidebar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

import components from "../Blog/Mdx";
import References from "../Blog/References";
import TableOfContent from "../Blog/References/TableOfContent";
import slugifyWithSlashes from "../../lib/slugifyWithSlashes";
// import { NextSeo } from "next-seo";
import PropTypes from "../PropTypes";
import NextTab from "./NextTab";
import SidebarNavigation from "./SidebarNavigation";
import { useParams } from "next/navigation";
import removeSegmentIfMatch from "../../lib/removeSegementsFromUrl";
import { createSlug } from "../Blog/Mdx/Headings";

interface SidebarWrapperProps {
  content?: any;
  post: any;
  posts: any;
  propTypes: any;
  // data?: any;
}

export const CustomTab = ({ children, ...props }: any) => {
  return (
    <Tab {...props}>
      <div className={styles.tab}>{children}</div>
    </Tab>
  );
};

export default function SidebarWrapper({
  // data,
  post,
  posts,
  propTypes,
}: SidebarWrapperProps) {
  const params = useParams();

  const lastUrlPath = params?.slug ? params.slug[params.slug.length - 1] : "";

  const filteredPosts = posts.filter((p) => {
    const pattern = new RegExp(`^${post.slug}/[^/]+$`); // matches baseSlug followed by a single segment
    return pattern.test(p.slug);
  });

  console.log("filteredPosts", filteredPosts);

  if (!post?.slug) return null;

  console.log("propTypes", propTypes);
  return (
    <>
      {/*<NextSeo
        title={post.title}
        description="Digital Design System"
        openGraph={{
          url: process.env.NEXT_PUBLIC_DOMAIN,
          title: post.title,
          description: post.excerpt,
          images: [
            {
              url: `${process.env.NEXT_PUBLIC_DOMAIN}api/og?title=${post.title}`,
              alt: "Foto",
            },
          ],
          type: "website",
          site_name: process.env.NEXT_PUBLIC_DOMAIN,
        }}
      /> */}
      <Wrapper className={styles.sidebarWrapper} pageWidth="lg">
        <div className={styles.sidebar}>
          <SidebarNavigation posts={posts} post={post} slug={post.slug} />
        </div>

        <div className={styles.content}>
          <Breadcrumb className={styles.breadcrumb}>
            <BreadcrumbItem>
              <Link href="/#">
                <BreadcrumbHome />
              </Link>
            </BreadcrumbItem>
            {post.slug
              .split("/")
              .slice(0, -1)
              .map((s, i) => {
                const overviewLink = `${s}/Overview`;
                if (posts.find((p) => p.slug.includes(overviewLink))) {
                  return (
                    <BreadcrumbItem key={i} href="#">
                      <NextLink href={`${slugifyWithSlashes(overviewLink)}`}>
                        {s}
                      </NextLink>
                    </BreadcrumbItem>
                  );
                }
                return (
                  <BreadcrumbItem key={i} href="#" disableLink>
                    {s}
                  </BreadcrumbItem>
                );
              })}
          </Breadcrumb>

          <Tag type="warning" className={styles.status}>
            Draft component
          </Tag>
          <Text kind="story-title">{post?.title}</Text>

          {post.subtitle && <Text kind="story-subtitle">{post.subtitle}</Text>}

          {post.mainComponent && (
            <Tabs className={styles.tabs}>
              <NextTab
                href={`/${removeSegmentIfMatch(slugifyWithSlashes(post.slug))}`}
              >
                Usage
              </NextTab>
              {filteredPosts.map((p, key) => (
                <NextTab key={key} href={`/${slugifyWithSlashes(p.slug)}`}>
                  {p.slug.split("/").pop()}
                </NextTab>
              ))}

              {propTypes && propTypes.length > 0 && (
                <NextTab
                  href={`/${removeSegmentIfMatch(
                    slugifyWithSlashes(post.slug)
                  )}/props`}
                >
                  Props
                </NextTab>
              )}
            </Tabs>
          )}

          <div className={styles.excerpt}>
            {post.mdxExcerptSource &&
              lastUrlPath !== "props" &&
              lastUrlPath !== "code" && (
                <MDXRemote {...post.mdxExcerptSource} components={components} />
              )}
          </div>

          {post.mainComponent && lastUrlPath === "props" && (
            <>
              {propTypes.map((p: any, i: number) => (
                <>
                  <h3 id={createSlug(p.displayName)}>{p.displayName}</h3>
                  <PropTypes
                    key={i}
                    propTypes={p}
                    {...post}
                    view="propsTable"
                  />
                </>
              ))}
            </>
          )}

          {post.mdxSource && lastUrlPath !== "props" && (
            <MDXRemote {...post.mdxSource} components={components} />
          )}

          <Link
            href={`https://github.com/un-core/designsystem/tree/content/website-content/packages/website/${
              post.path.split("packages/website/")[1]
            }`}
            target="_blank"
            className={styles.editOnGitHub}
          >
            Edit this page on GitHub <FontAwesomeIcon icon={faArrowRight} />
          </Link>
        </div>
        <div className={styles.sidebarAddition}>
          <TableOfContent
            headings={
              lastUrlPath !== "props"
                ? post.headings
                : propTypes.map((p: any) => {
                    return { value: p.displayName };
                  })
            }
          />

          <References post={post} />
          {/* <ConnectedComponents post={post} /> */}
        </div>
      </Wrapper>
    </>
  );
}
