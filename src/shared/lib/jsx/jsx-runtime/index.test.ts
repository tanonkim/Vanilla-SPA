import { Component } from "../../dom/component";
import { h } from "./index";
import type { VDOM, VNode } from "./type";

describe("h factory function", () => {
  test("should create a VDOM for string component with text child", () => {
    // Given
    const tag = "div";
    const props = null;
    const children = ["Hello World"];

    // When
    const vnode = h(tag, props, ...children);

    // Then
    expect(vnode).toEqual({
      type: "div",
      props: null,
      children: ["Hello World"],
    });
  });

  test("handles null and undefined children", () => {
    // Given
    const tag = "span";
    const props = null;
    const children = [null, undefined, "text"];

    // When
    const vnode = h(tag, props, ...children);

    // Then
    expect(vnode).toEqual({
      type: "span",
      props: null,
      children: [
        { type: "fragment", props: null, children: [] },
        { type: "fragment", props: null, children: [] },
        "text",
      ],
    });
  });

  test("should transfile function component with props and child", () => {
    // Given
    type MyComponentProps = { name: string; children: VNode[] };

    const MyComponent = ({ name, children }: MyComponentProps): VDOM => ({
      type: "my-component",
      props: { name },
      children,
    });

    const props = { name: "tanon" };
    const child = ["child"];

    // When
    const vnode = h(MyComponent as Component, props, ...child);

    // Then
    expect(vnode).toEqual({
      type: "my-component",
      props: { name: "tanon" },
      children: ["child"],
    });
  });
});
