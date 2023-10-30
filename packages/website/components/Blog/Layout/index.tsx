"use client";
import React from "react";
import Head from "next/head";
import styles from "./layout.module.scss";
import Navigation from "../../Navigation";
import Footer from "../../Footer";
import SidebarWrapper from "../../Sidebar";
import Homepage from "../../Homepage";

interface LayoutProps {
  posts: any;
  post: any;
  propTypes: any;
  head?: any;
}

const Layout = ({ posts, post, propTypes, head }: LayoutProps) => (
  <>
    <Head>{head}</Head>
    <Navigation />
    <div className={styles.layout}>
      {!post?.slug && <Homepage />}

      <article>
        <SidebarWrapper posts={posts} post={post} propTypes={propTypes} />
      </article>
    </div>
    <Footer />
  </>
);

export default Layout;
