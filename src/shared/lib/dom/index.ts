import { Component, IRenderInfo } from "./component";
import { updateElement } from "./diff";

function domRenderer() {
  const renderInfo: IRenderInfo = {
    $root: null,
    component: null,
    currentVDOM: null,
  };

  const _render = () => {
    const { $root, currentVDOM, component } = renderInfo;
    if (!$root || !component) return;

    const newVDOM = component();
    updateElement($root, newVDOM, currentVDOM);
    renderInfo.currentVDOM = newVDOM;
  };

  const render = (root: HTMLElement, component: Component) => {
    renderInfo.$root = root;
    renderInfo.component = component;
    _render();
  };
  return { render };
}

export const { render } = domRenderer();
