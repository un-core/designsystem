import React from 'react';
import Image from '../Image';

export default function FigmaImage({ img, width, height, ...props }: any) {
  return (
    <Image
      src={img}
      width={width}
      height={height}
      alt="Figma file"
      {...props}
    />
  );
}
