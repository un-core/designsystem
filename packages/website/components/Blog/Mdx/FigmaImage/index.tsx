import React from "react";
import Image from "../Image";
import styles from "./figmaImage.module.scss";

interface FigmaImageProps {
  img: string;
  width?: number | string;
  height?: number | string;
  showLink?: boolean;
  url?: string;
  [key: string]: any;
}

const FigmaImage: React.FC<FigmaImageProps> = ({
  img,
  width,
  height,
  showLink,
  ...props
}) => {
  return (
    <>
      <Image
        src={img}
        width={width}
        height={height}
        alt="Figma file"
        {...props}
      />
      {showLink && (
        <div className={styles.figmaImage}>
          <a href={props.url} target="_blank" rel="noreferrer">
            Open in Figma
          </a>
        </div>
      )}
    </>
  );
};

export default FigmaImage;
