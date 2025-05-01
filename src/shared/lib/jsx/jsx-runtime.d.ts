export namespace JSX {
  export interface IntrinsicElements {
    [elemName: string]: any; // 모든 태그를 any로 허용
  }

  export interface ElementChildrenAttribute {
    children: {}; // children prop 이름 정의
  }

  // Optional: 커스텀 컴포넌트 반환 타입 정의
  export type Element = import("@/shared/lib/jsx/jsx-runtime/type").VDOM;
}
