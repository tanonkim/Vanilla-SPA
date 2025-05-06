import { routes } from "./app/routes";
import { router } from "./shared/lib/router";
import { Route } from "./shared/lib/router/types";

const app = document.getElementById("app") as HTMLElement;
router(app, routes as Route[]);
