import { VNode } from "../jsx/jsx-runtime/type";
import { createElement } from "./client";

function isTextVDOM(v: VNode) {
  return typeof v === "string" || typeof v === "number";
}

function diffTextVDOM(newVDOM: VNode, currentVDOM: VNode) {
  return (
    isTextVDOM(newVDOM) && isTextVDOM(currentVDOM) && newVDOM !== currentVDOM
  );
}

export function updateElement(
  parent: Element,
  newVDOM?: VNode | null,
  currentVDOM?: VNode | null,
  index: number = 0
) {
  let removeIndex: undefined | number = undefined;

  const hasOnlyCurrentVDOM =
    newVDOM === null ||
    (newVDOM === undefined &&
      currentVDOM !== null &&
      currentVDOM !== undefined);

  const hasOnlyNewVDOM =
    newVDOM !== null &&
    newVDOM !== undefined &&
    (currentVDOM === null || currentVDOM === undefined);

  // 1.
  if (parent.childNodes && hasOnlyCurrentVDOM) {
    parent.removeChild(parent.childNodes[index]);
    return index;
  }

  // 2.
  if (hasOnlyNewVDOM) {
    parent.appendChild(createElement(newVDOM));
    return;
  }

  // 3.
  if (diffTextVDOM(newVDOM, currentVDOM)) {
    parent.replaceChild(createElement(newVDOM), parent.childNodes[index]);
    return;
  }

  if (typeof newVDOM === "number" || typeof newVDOM === "string") return;
  if (typeof currentVDOM === "number" || typeof currentVDOM === "string")
    return;
  if (!newVDOM || !currentVDOM) return;

  // 4.
  if (newVDOM.type !== currentVDOM.type) {
    parent.replaceChild(createElement(newVDOM), parent.childNodes[index]);
    return;
  }

  // 5.
  updateAttribute(
    parent.childNodes[index] as Element,
    newVDOM.props ?? {},
    currentVDOM.props ?? {}
  );

  // 6.
  const maxLength = Math.max(
    newVDOM.children.length,
    currentVDOM.children.length
  );

  for (let i = 0; i < maxLength; i++) {
    const _removeIndex = updateElement(
      parent.childNodes[index] as Element,
      newVDOM.children[i],
      currentVDOM.children[i],
      removeIndex ?? i
    );
    removeIndex = _removeIndex;
  }
}

function updateAttribute(
  target: Element,
  newProps: Record<string, any>,
  oldProps: Record<string, any>
) {
  for (const [attr, value] of Object.entries(newProps)) {
    if (oldProps[attr] === newProps[attr]) continue;
    (target as any)[attr] = value;
  }

  for (const attr of Object.keys(oldProps)) {
    if (newProps[attr] !== undefined) continue;
    if (attr.startsWith("on")) {
      (target as any)[attr] = null;
    } else if (attr.startsWith("class")) {
      target.removeAttribute("class");
    } else {
      target.removeAttribute(attr);
    }
  }
}
