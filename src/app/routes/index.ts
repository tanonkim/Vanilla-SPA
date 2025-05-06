import { HomePage, StoreDetailPage, StorePage } from "@/pages";
import { NotFoundPage } from "@/shared/not-found/NotFound";

export const routes = [
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
          },
        ],
      },
    ],
  },
];
