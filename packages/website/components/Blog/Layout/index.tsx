"use client";
import React from "react";
import Head from "next/head";
import styles from "./layout.module.scss";
import Navigation from "../../Navigation";
import Footer from "../../Footer";
import SidebarWrapper from "../../Sidebar";
import { UNCoreProvider } from "@wfp/react";

interface LayoutProps {
  posts: any;
  post: any;
  propTypes: any;
  head: any;
}

const Layout = ({ posts, post, propTypes, head }: LayoutProps) => (
  <UNCoreProvider>
    <Head>{head}</Head>
    <Navigation />
    <div className={styles.layout}>
      <article>
        <SidebarWrapper posts={posts} post={post} propTypes={propTypes} />
      </article>
    </div>
    <Footer />
  </UNCoreProvider>
);

export default Layout;
