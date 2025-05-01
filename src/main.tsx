import App from "./app";
import { createElement } from "./shared/lib/dom/client";

const app = document.getElementById("app") as HTMLElement;
app.appendChild(createElement(<App />));
