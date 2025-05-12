import { Component, IRenderInfo } from "./component";
import { updateElement } from "./diff";

function domRenderer() {
  const renderInfo: IRenderInfo = {
    $root: null,
    component: null,
    currentVDOM: null,
  };

  const _render = async () => {
    const { $root, currentVDOM, component } = renderInfo;
    if (!$root || !component) return;

    const newVDOM = await component();

    updateElement($root, newVDOM, currentVDOM);
    renderInfo.currentVDOM = newVDOM;
  };

  const render = async (root: HTMLElement, component: Component) => {
    renderInfo.$root = root;
    renderInfo.component = component;
    await _render();
  };
  return { render };
}

export const { render } = domRenderer();
