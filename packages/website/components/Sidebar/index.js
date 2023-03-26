import React, { useState } from 'react';

import {
  Button,
  Link,
  Sidebar,
  SidebarHeader,
  Item,
  Search,
  Wrapper,
  Text,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbHome,
} from '@un/react';
import Accordion from '../Accordion';
import { MDXRemote } from 'next-mdx-remote';
import NextLink from 'next/link';
import styles from './sidebar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight,
  faDash,
  faMinus,
} from '@fortawesome/pro-regular-svg-icons';
import slugify from 'slugify';
import { faChevronRight } from '@fortawesome/pro-solid-svg-icons';

import components from '../Blog/Mdx';
import References from '../Blog/References';
import TableOfContent from '../Blog/References/TableOfContent';
import slugifyWithSlashes from '../../lib/slugifyWithSlashes';
import { NextSeo } from 'next-seo';
import PropTypes from '../PropTypes';

function TreeBranch({ slug, split, level }) {
  const splitSlug = slugifyWithSlashes(slug).split('/');
  const found = split.name === splitSlug[level - 1]; /* split.children.find(
    (e) => e.name === splitSlug[splitSlug.length - 1]
  )*/

  console.log('splitSlug', split.name, splitSlug[level - 1]);

  const [open, setOpen] = useState(level === 0 || found);

  //console.log('level', level, split);
  return (
    <li
      className={`${styles[`level-${level}`]}  ${
        found ? styles.active : styles.inActive
      }  ${
        split.children.length === 0 ? styles.lastLevel : styles.hasSubLevels
      } ${
        open || split.children.length === 0
          ? styles[`level-open`]
          : styles[`level-closed`]
      }`}>
      {split?.children && (
        <>
          {split.children.length === 0 && level > 0 ? (
            <NextLink
              href={`/${slugifyWithSlashes(split.path?.key)}`}
              passHref
              legacyBehavior>
              <Link className={styles.item} onMouseUp={(e) => e.target.blur()}>
                <div className={styles.icon} />

                {split.name}
              </Link>
            </NextLink>
          ) : split.children.length > 0 && level > 0 ? (
            <span
              className={styles.sidebarTitle}
              onClick={() => setOpen(!open)}>
              <FontAwesomeIcon
                icon={faChevronRight}
                className={styles.iconOpen}
              />
              <span className={styles.sidebarTitleText}>{split.name}</span>
            </span>
          ) : null}
          {split.children.map((c, i) => (
            <ul key={i}>
              <TreeBranch split={c} level={level + 1} slug={slug} />
            </ul>
          ))}
        </>
      )}
    </li>
  );
}

export const createPathTree = (paths) => {
  const level = { ['<result>']: [] };

  paths.forEach((path) => {
    path.key.split('/').reduce((currentLevel, name, index, array) => {
      if (!currentLevel[name]) {
        currentLevel[name] = { ['<result>']: [] };
        currentLevel['<result>'].push({
          name,
          children: currentLevel[name]['<result>'],
          path: index === array.length - 1 ? path : null,
        });
      }

      return currentLevel[name];
    }, level);
  });

  const finalArray = level['<result>'];
  return finalArray.length > 0 ? finalArray[0] : null;
};

export default function SidebarWrapper({ content, post, posts, propTypes }) {
  const postSplit = posts.map((p) => {
    return {
      key: 'posts/' + p.slug,
      title: p.title,
      directory: false,
    };
  });

  const split = createPathTree(postSplit);

  return (
    <>
      <NextSeo
        title={post.title}
        description="Digital Design System"
        openGraph={{
          url: process.env.NEXT_PUBLIC_DOMAIN,
          title: post.title,
          description: 'Digital Design System',
          images: [
            {
              url: `${process.env.NEXT_PUBLIC_DOMAIN}/public/un-core-logo.png`,
              alt: 'Foto',
            },
          ],
          type: 'product',
          site_name: process.env.NEXT_PUBLIC_DOMAIN,
        }}
      />
      <Wrapper className={styles.sidebarWrapper} pageWidth="xl">
        <div className={styles.sidebar}>
          <ul className={styles.sidebarList}>
            <TreeBranch split={split} level={0} slug={post.slug} />
          </ul>
        </div>

        <div className={styles.content}>
          <Breadcrumb className={styles.breadcrumb}>
            <BreadcrumbItem>
              <Link href="/#">
                <BreadcrumbHome />
              </Link>
            </BreadcrumbItem>
            {post.slug.split('/').map((s, i) => {
              return (
                <BreadcrumbItem key={i} href="#" disableLink>
                  {s}
                </BreadcrumbItem>
              );
            })}
          </Breadcrumb>

          {post.subtitle && (
            <Text kind="story-subtitle" /*className={styles.subTitle}*/>
              {post.subtitle}
            </Text>
          )}
          <Text kind="story-title" /*className={styles.title}*/>
            {post.title}
          </Text>

          <div className={styles.excerpt}>
            <MDXRemote {...post.mdxExcerptSource} components={components} />
          </div>

          {post.mainComponent && (
            <PropTypes
              propTypes={propTypes}
              sampleCode={post.sampleCode}
              mainComponent={post.mainComponent}
              defaultProps={post.defaultProps}
            />
          )}

          <MDXRemote {...post.mdxSource} components={components} />

          <Link
            href={`https://github.com/un-core/designsystem/tree/content/website-content/packages/website/${
              post.path.split('packages/website/')[1]
            }`}
            target="_blank"
            className={styles.editOnGitHub}>
            Edit this page on GitHub <FontAwesomeIcon icon={faArrowRight} />
          </Link>
        </div>
        <div className={styles.sidebarAddition}>
          <TableOfContent content={post.mdxToC} />
          <References post={post} />
        </div>
      </Wrapper>
    </>
  );
}
