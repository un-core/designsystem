import { faFigma, faGithub, faNpm } from "@fortawesome/free-brands-svg-icons";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, List, ListItem } from "@wfp/react";
import React from "react";
import styles from "./tableOfContent.module.scss";

export default function References({ post }: any) {
  if (!post.figma && !post.storybook && !post.github) return null;
  return (
    <div className={styles.tableOfContent}>
      <h3>References</h3>
      <List kind="simple" className={styles.tableOfContentList}>
        {post.figma && (
          <ListItem>
            <Link href={post.figma} target="_blank">
              Figma <FontAwesomeIcon icon={faFigma} className={styles.figma} />
            </Link>
          </ListItem>
        )}

        {post.slug.split("/").includes("Components") && (
          <ListItem>
            <Link
              href={`${
                process.env.NEXT_PUBLIC_GIT_URL
              }/packages/react/src/components/${post.title.replace(
                /[/]/g,
                "-"
              )}`}
              target="_blank"
            >
              Source{" "}
              <FontAwesomeIcon icon={faGithub} className={styles.github} />
            </Link>
          </ListItem>
        )}
        {post.slug.split("/").includes("Components") && (
          <ListItem>
            <Link
              href={`${process.env.NEXT_PUBLIC_STORYBOOK_URL}/?path=/story/${
                post.storybook == true
                  ? post.slug.replace(/[/]/g, "-")
                  : post.storybook
              }`}
              target="_blank"
            >
              Storybook{" "}
              <FontAwesomeIcon icon={faCode} className={styles.storybook} />
            </Link>
          </ListItem>
        )}

        {post.npm && (
          <ListItem>
            <Link
              href={`https://www.npmjs.com/package/${post.npm}`}
              target="_blank"
            >
              npm <FontAwesomeIcon icon={faNpm} className={styles.npm} />
            </Link>
          </ListItem>
        )}
      </List>
    </div>
  );
}
