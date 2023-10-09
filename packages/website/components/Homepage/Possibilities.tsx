import React from "react";
import styles from "./possibilities.module.scss";
import MoreLink from "../MoreLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Wrapper } from "@wfp/react";
import {
  faFloppyDisk,
  faHandshakeAlt,
  faStar,
  faVectorSquare,
} from "@fortawesome/free-solid-svg-icons";

import { faReact } from "@fortawesome/free-brands-svg-icons";

function PossibilitiesContainer({ className = "", title, icon, content }: any) {
  return (
    <div
      className={`${styles.container} ${className}`} /*style={{ background }}*/
    >
      <div className={styles.icon}>
        <FontAwesomeIcon icon={icon} />
      </div>
      <div className={styles.content}>
        <h4>{title}</h4>
        <p>{content}</p>
      </div>
    </div>
  );
}

export default function Possiblities() {
  return (
    <Wrapper pageWidth="lg" className={styles.possibilities}>
      <div className={styles.possibilitiesWrapper}>
        <PossibilitiesContainer
          title="> 50 components"
          className={styles.components}
          content={
            <>
              are currently implemented in react.js or use the tools with other
              UI libraries
              <br />
              <br />
              <MoreLink href="./components/overview" className={styles.link}>
                Components
              </MoreLink>
            </>
          }
          background="#E7DFFF"
          icon={faReact}
        />

        <PossibilitiesContainer
          title="Build & maintain an icon library"
          content="A complete tool box to take advantage of using SVGs in your React applications."
          //background="#E7FFDF"
          icon={faVectorSquare}
        />
        <PossibilitiesContainer
          title="Style once – use everywhere"
          content="define styles once and use them in your web, Android, iOS or other projects"
          //  background="#DFFDFF"
          icon={faHandshakeAlt}
        />
        <PossibilitiesContainer
          title="Recommendations"
          content="Lorem ipsum dolor sit amet"
          // background="#FFDFDF"
          icon={faStar}
        />
        <PossibilitiesContainer
          title="Legacy support"
          content="Lorem ipsum dolor sit dal."
          // background="#DFF0FF"
          icon={faFloppyDisk}
        />
      </div>
    </Wrapper>
  );
}
