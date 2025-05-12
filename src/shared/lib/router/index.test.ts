import { router, history } from "../router"; // 경로는 실제 파일 위치에 맞게 조정
import { Component } from "../dom/component";
import { HomePage, StoreDetailPage, StorePage } from "@/pages";
import { NotFoundPage } from "@/pages/ui/NotFound";

const mockRender = jest.fn();

jest.mock("../dom", () => ({
  render: (...args: any[]) => {
    const actual = jest.requireActual("../dom");
    mockRender(...args);
    return actual;
  },
}));

describe("spaRouter test", () => {
  let root: HTMLElement;

  beforeEach(() => {
    document.body.innerHTML = ""; // 초기화
    root = document.createElement("div");
    document.body.appendChild(root);
    mockRender.mockClear();
    window.history.pushState({}, ",", "/");
  });

  test("should render the component on inital page", () => {
    // Given
    const Home: Component = () => document.createTextNode("Home Page");
    const routes = [{ path: "/", element: Home, children: [] }];

    // When
    router(root, routes);

    // Then
    expect(mockRender).toHaveBeenCalledWith(root, Home);
  });

  test("should navigate to other route by history.push", () => {
    // Given

    const root = document.createElement("div");

    const routes = [
      {
        path: "/",
        element: HomePage,
        errorElement: NotFoundPage,
        children: [
          {
            path: "store",
            element: StorePage,
            children: [],
          },
        ],
      },
    ];

    router(root, routes);

    // When
    history.push("/store");

    // Then
    expect(window.location.pathname).toBe("/store");
    expect(mockRender).toHaveBeenLastCalledWith(root, StorePage);
  });

  test("should render nested children", () => {
    // Given
    const routes = [
      {
        path: "/",
        element: HomePage,
        errorElement: NotFoundPage,
        children: [
          {
            path: "store",
            element: StorePage,
            children: [
              {
                path: ":id",
                element: StoreDetailPage,
                children: [],
              },
            ],
          },
        ],
      },
    ];

    // When
    router(root, routes);
    history.push("/store/1");

    // Then
    expect(mockRender).toHaveBeenCalledWith(root, StoreDetailPage);
  });
});
