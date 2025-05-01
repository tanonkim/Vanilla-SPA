import { VNode } from "../jsx/jsx-runtime/type";

/**
 * @fileoverview Virtual DOM -> DOM
 * @description
 * - 1. null/undefined -> fragment 생성 / string, number -> text 노드 생성
 * - 2. node.type기반으로 실제 DOM에 element 생성
 * - 3. Virtual DOM의 props -> 실제 DOM에 반영
 * - 4. children을 재귀호출로 element에 appendChild
 */
const createElement = (node: VNode) => {
  if (node === null || node === undefined) {
    return document.createDocumentFragment();
  }
  if (typeof node === "string" || typeof node === "number") {
    return document.createTextNode(String(node));
  }

  const isFragment = node.type === "fragment";
  if (isFragment) {
    return document.createDocumentFragment();
  }

  const element = document.createElement(node.type);

  Object.entries(node.props || {}).forEach(([attr, value]) => {
    if (attr.startsWith("data-")) {
      element.dataset[attr.slice(5)] = value;
    } else {
      (element as any)[attr] = value;
    }
  });

  node.children.forEach((child) => element.appendChild(createElement(child)));

  return element;
};

export { createElement };
