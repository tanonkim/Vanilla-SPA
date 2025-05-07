import { HomePage, NewProduct, StoreDetailPage, StorePage } from "@/pages";
import { NotFoundPage } from "@/pages/ui/NotFound";

export const routes = [
  {
    path: "/",
    element: HomePage,
    errorElement: NotFoundPage,
    children: [
      {
        path: "new",
        element: NewProduct,
      },
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
