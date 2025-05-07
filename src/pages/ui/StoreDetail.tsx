import { history } from "@/shared/lib/router";

export function StoreDetailPage() {
  const params = history.getPageParams();

  return (
    <div>
      <h2>PostPage {params}</h2>
      <a data-link href="/">
        go home
      </a>
      &nbsp;&nbsp;
      <a data-link href="/store">
        go store
      </a>
    </div>
  );
}
