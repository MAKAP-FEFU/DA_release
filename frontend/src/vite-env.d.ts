/// <reference types="vite/client" />

declare module '*.svg?svgr' {
  import React from 'react';
  const SVG: React.VFC<React.SVGProps<SVGSVGElement>>;
  export default SVG;
}

type PolymorphicProps<T extends ElementType, E extends object = EmtyObject> = { as?: T } & E &
  Omit<React.ComponentPropsWithoutRef<T>, keyof E | 'as'>;
