import { VDOM, VNode } from "./type";

/**
 * @fileoverview jsx 팩토리 함수 생성
 * @description
 * - <div>Hello World</div> 형태의 jsx문법 -> 트랜스파일링 -> h('div',null,['Hello World'])
 * - {
  type: "div",
  props: null,
  children: ["Hello World!!!"]
}
 */
type Component = (props?: Record<string, any>) => VDOM;

export const h = (
  component: string | Component,
  props: Record<string, any> | null,
  ...children: VNode[]
) => {
  if (typeof component === "function") {
    return component({ ...props, children });
  }
  const arr = children.flat().map((child) => {
    if (typeof child === "string" || typeof child === "number") {
      return child;
    } else if (child === undefined || child === null) {
      return { type: "fragment", props: null, children: [] };
    } else if (typeof child === "object") {
      return { ...child };
    }
  });
  return { type: component, props, children: arr };
};
