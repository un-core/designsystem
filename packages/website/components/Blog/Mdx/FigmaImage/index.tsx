import React from "react";
import Image from "../Image";
import styles from "./figmaImage.module.scss";

export default function FigmaImage({ img, width, height, ...props }: any) {
  console.log("props", props);
  return (
    <>
      <Image
        src={img}
        width={width}
        height={height}
        alt="Figma file"
        {...props}
      />
      <div className={styles.figmaImage}>
        <a href={props.url} target="_blank">
          Open in Figma
        </a>
      </div>
    </>
  );
}
