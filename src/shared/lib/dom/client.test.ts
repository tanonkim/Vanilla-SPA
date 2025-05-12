import { VNode } from "../jsx/jsx-runtime/type";
import { createElement } from "./client";

// export type VNode = string | number | VDOM | null | undefined;

describe("createElement test", () => {
  // Given

  test("primitive type createElement test", () => {
    // Given
    const stringVDOM = "Hello";
    const numberVDOM = 123;
    const nullVDOM = null;
    const undefinedVDOM = undefined;

    // When
    const stringElement = createElement(stringVDOM);
    const numberElement = createElement(numberVDOM);
    const nullElement = createElement(nullVDOM);
    const undefinedElement = createElement(undefinedVDOM);

    // Then
    expect(stringElement.textContent).toBe("Hello");
    expect(stringElement.nodeType).toBe(Node.TEXT_NODE);

    expect(numberElement.textContent).toBe("123");
    expect(numberElement.nodeType).toBe(Node.TEXT_NODE);

    expect(nullElement.nodeType).toBe(Node.DOCUMENT_FRAGMENT_NODE);
    expect(undefinedElement.nodeType).toBe(Node.DOCUMENT_FRAGMENT_NODE);
  });

  test("create data-* attribute as VNode object", () => {
    const vNode: VNode = {
      type: "div",
      props: { "data-user": "tanon" },
      children: [],
    };

    const el = createElement(vNode) as HTMLDivElement;

    expect(el.dataset.user).toBe("tanon");
  });
});
