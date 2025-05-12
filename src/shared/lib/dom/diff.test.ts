import { VNode } from "../jsx/jsx-runtime/type";
import { updateElement } from "./diff";

function createVNode(
  type: string,
  props: Record<string, any> = {},
  children: VNode[]
): VNode {
  return { type, props, children };
}

describe("updateElement", () => {
  let parent: HTMLElement;

  beforeEach(() => {
    parent = document.createElement("div");
    document.body.innerHTML = "";
    document.body.appendChild(parent);
  });

  test("should add new VDOM when currentVDOM is null", () => {
    // Given
    const newVDOM = createVNode("div", { id: "test" }, ["string"]);

    // When
    updateElement(parent, newVDOM, null);

    // Then
    expect(parent.innerHTML).toBe('<div id="test">string</div>');
  });

  test("should remove currentVDOM when newVDOM is null", () => {
    // Given
    const existing = document.createElement("div");
    existing.textContent = "To be removed";
    parent.appendChild(existing);

    // When
    const newVDOM = null;
    updateElement(parent, newVDOM, null);

    // Then
    expect(parent.childNodes.length).toBe(0);
  });

  test("should update the type when type is chaged", () => {
    const currentVDOM = createVNode("span", {}, ["current"]);
    const newVDOM = createVNode("div", {}, ["upated"]);

    const span = document.createElement("span");
    span.textContent = "parent";
    parent.appendChild(span);

    console.log(parent);

    updateElement(parent, newVDOM, currentVDOM);

    expect(parent.innerHTML).toBe("<div>upated</div>");
  });

  test("should upated the props", () => {
    const currentVDOM = createVNode("span", { className: "old" }, []);
    const newVDOM = createVNode("div", { className: "new", id: "test" }, []);

    const div = document.createElement("div");
    div.textContent = "parent";
    parent.appendChild(div);

    updateElement(parent, newVDOM, currentVDOM);
    console.log(parent.outerHTML);

    expect((parent.firstChild as HTMLElement).className).toBe("new");
    expect((parent.firstChild as HTMLElement).id).toBe("test");
  });

  test("should recursively update the children", () => {
    const currentVDOM = createVNode("div", {}, [
      createVNode("span", {}, ["1"]),
      createVNode("span", {}, ["2"]),
    ]);
    const newVDOM = createVNode("div", {}, [
      createVNode("span", {}, ["1"]),
      createVNode("span", {}, ["3"]),
    ]);

    const div = document.createElement("div");
    const span1 = document.createElement("span");
    span1.textContent = "1";
    const span2 = document.createElement("span");
    span2.textContent = "2";
    div.appendChild(span1);
    div.appendChild(span2);
    parent.appendChild(div);

    updateElement(parent, newVDOM, currentVDOM);
    expect(parent.innerHTML).toBe("<div><span>1</span><span>3</span></div>");
  });
});
