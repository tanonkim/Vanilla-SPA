import { routes } from "./app/routes";
import { router } from "./shared/lib/router";
import { Route } from "./shared/lib/router/types";
import { worker } from "./shared/mocks/browser";

// MSW : development 환경에서만 시작
if (process.env.NODE_ENV === "development") {
  worker.start().then(() => {
    startApp(); // MSW가 시작된 후에 앱을 실행
  });
} else {
  startApp(); // production
}

function startApp() {
  const app = document.getElementById("app") as HTMLElement;
  router(app, routes as Route[]);
}
