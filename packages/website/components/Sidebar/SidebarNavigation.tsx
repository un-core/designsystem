import React, { useEffect, useState } from "react";
import styles from "./sidebarNavigation.module.scss";

import slugify from "slugify";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import slugifyWithSlashes from "../../lib/slugifyWithSlashes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "@wfp/react";
import NextLink from "next/link";

interface SidebarProps {
  slug: string;
  level: number;
  split: any;
}

function TreeBranch({ slug, split, level }: SidebarProps) {
  const splitSlug = slugifyWithSlashes(slug).split("/");
  const found = slugify(split.name, { lower: true }) === splitSlug[level];

  /*
    split.children.find(
      (e) => e.name === splitSlug[splitSlug.length - 1]
    )
  */

  const [open, setOpen] = useState(level === 0 || found);

  useEffect(() => {
    const found = slugify(split.name, { lower: true }) === splitSlug[level];
    setOpen(found);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

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
      }`}
    >
      {split?.children && (
        <>
          {split.name === "code" ? null : (split.children.length === 0 && // Code Preview
              level > 0) ||
            split.children[0].name === "code" ? (
            // Child level
            <NextLink
              href={`/${slugifyWithSlashes(split.path?.key)}`}
              passHref
              legacyBehavior
            >
              <Link
                className={styles.item}
                onMouseUp={(e: any) => e.target.blur()}
              >
                <div className={styles.icon} />
                {split.name}
              </Link>
            </NextLink>
          ) : split.children.length > 0 && level > 0 ? (
            // Main Level
            <span
              className={styles.sidebarTitle}
              onClick={() => setOpen(!open)}
            >
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

export const createPathTree = (paths: any) => {
  const level = { ["<result>"]: [] };

  paths.forEach((path) => {
    path.key.split("/").reduce((currentLevel, name, index, array) => {
      if (!currentLevel[name]) {
        currentLevel[name] = { ["<result>"]: [] };
        currentLevel["<result>"].push({
          name,
          children: currentLevel[name]["<result>"],
          path: index === array.length - 1 ? path : null,
        });
      }

      return currentLevel[name];
    }, level);
  });

  const finalArray = level["<result>"];
  return finalArray.length > 0 ? finalArray[0] : null;
};

export default function SidebarNavigation({ post, posts, slug }: any) {
  const postSplit = posts.map((p) => {
    return {
      key: "/" + p.slug,
      title: p.title,
      directory: false,
    };
  });

  const split: any = createPathTree(postSplit) || [];

  const splitSidebar = split.children.find(
    (e) => e.name === post.slug.split("/")[0]
  );

  return (
    <ul className={styles.sidebarList}>
      <TreeBranch split={splitSidebar} level={0} slug={slug} />
    </ul>
  );
}
