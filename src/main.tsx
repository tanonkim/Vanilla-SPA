import { routes } from "./app/routes";
import { router } from "./shared/lib/router";

const app = document.getElementById("app") as HTMLElement;
router(app, routes);
