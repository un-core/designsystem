import React from "react";
import styles from "./styles.module.scss";
import { createPathTree } from "../../../Sidebar/SidebarNavigation";
import slugifyWithSlashes from "../../../../lib/slugifyWithSlashes";
import Link from "next/link";

import PropTypes from "../../../PropTypes";

function ComponentPreview({ component, componentsList, name, propTypes }: any) {
  const componentData = componentsList.find(
    (e) => e.slug === component.path?.slug
  );

  if (!componentData) return null;

  return (
    <PropTypes
      view="smallPreview"
      {...componentData}
      propTypes={propTypes}
      showEditor={false}
      hideWrapper={true}
      name={name}
    />
  );
}

export default function ComponentsList(props: any) {
  const componentsList = JSON.parse(props.components) || [];

  const postSplit: any = componentsList.map((p) => {
    return {
      key: "/" + p.slug,
      title: p.title,
      slug: p.slug,
      directory: false,
    };
  });

  const split: any = createPathTree(postSplit);
  if (split === null) return null;

  const components = split.children.find((e) => e.name === "Components");

  const propTypesList = JSON.parse(props.propTypes);

  return (
    <div className={styles.componentsList}>
      {components.children.map((p, a) => {
        if (p.name === "Overview") return null;
        return (
          <div key={a}>
            <h4>{p.name}</h4>

            <div className={styles.componentsSubList}>
              {p.children.map((c, i) => {
                const propType = propTypesList.find(
                  (e) => e?.displayName === c.name
                );

                return (
                  <Link
                    className={styles.component}
                    key={i}
                    href={slugifyWithSlashes(c.path?.key)}
                  >
                    <div className={styles.name}>{c.name}</div>
                    <ComponentPreview
                      component={c}
                      name={c.name}
                      componentsList={componentsList}
                      propTypes={propType}
                    />
                  </Link>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
