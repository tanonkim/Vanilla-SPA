import App from "./app";
import { routes } from "./app/routes";
import { createElement } from "./shared/lib/dom/client";
import { router } from "./shared/lib/router";

const app = document.getElementById("app") as HTMLElement;
// app.appendChild(createElement(<App />));
router(app, routes);
