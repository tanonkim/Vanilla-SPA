export type Route = {
  path: string;
  element?: Component;
  errorElement?: Component;
  children: Route[];
};

export type RouteInfo = { root: HTMLElement | null; routes: Route[] | null };
