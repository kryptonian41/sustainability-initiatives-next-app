/// <reference types="next" />
/// <reference types="next/types/global" />
/// <reference types="next/image-types/global" />


interface SvgrComponent extends React.StatelessComponent<React.SVGAttributes<SVGElement>> { }

declare module '*.svg' {
  const value: SvgrComponent;
  export default value;
}