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
import { createSlug } from "../Blog/Mdx/Headings";

const statuses = {
  draft: { title: "Draft", type: "warning" },
  designOnly: { title: "Design only", type: "info" },
  published: { title: "Published", type: "success" },
  deprecated: { title: "Deprecated", type: "danger" },
};

// Function to extract the main slug, excluding parts starting with "tab:"
const extractMainSlug = (slug) =>
  slug
    .split("/")
    .filter((part) => !part.startsWith("tab:"))
    .join("/");

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

  // Extract the last path segment from the URL
  const lastUrlPath = params?.slug?.at(-1) || "";
  if (!post.slug) return null;

  const mainSlug = extractMainSlug(post.slug);

  let filteredPosts = posts.filter((p) => {
    const postMainSlug = extractMainSlug(p.slug);
    return mainSlug === postMainSlug && p.slug.includes("tab:");
  });

  console.log("post.slug", post.slug, filteredPosts);

  let codeAlreadySet = false;

  filteredPosts = filteredPosts.map((p) => {
    if (p.slug.includes("tab:Code")) {
      if (codeAlreadySet) {
        p.slug = p.slug.replace("tab:Code", "tab:Props");
      }
      codeAlreadySet = true;
    }
    return p;
  });

  if (!post?.slug) return null;

  return (
    <>
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

          {post?.status && (
            <Tag type={statuses[post?.status].type} className={styles.status}>
              {statuses[post?.status].title}
            </Tag>
          )}
          <Text kind="story-title">{post?.title}</Text>

          {post.subtitle && <Text kind="story-subtitle">{post.subtitle}</Text>}

          {filteredPosts.length >= 1 && (
            <Tabs className={styles.tabs}>
              <NextTab href={`/${slugifyWithSlashes(mainSlug)}`}>Usage</NextTab>
              {filteredPosts.map((p, key) => (
                <NextTab key={key} href={`/${slugifyWithSlashes(p.slug)}`}>
                  {p.slug.split("/").pop().replace("tab:", "")}
                </NextTab>
              ))}
            </Tabs>
          )}

          <div className={styles.excerpt}>
            {post.mdxExcerptSource &&
              lastUrlPath !== "props" &&
              lastUrlPath !== "Code" && (
                <MDXRemote {...post.mdxExcerptSource} components={components} />
              )}
          </div>

          {post.mainComponent && lastUrlPath === "props" && (
            <>
              {propTypes.map((p: any, i: number) => (
                <>
                  <h3
                    id={createSlug(p.displayName)}
                    className={styles.propTitle}
                  >
                    {p.displayName}
                  </h3>
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
