import { http, HttpResponse } from "msw";

const mockProducts = [
  {
    id: 1,
    name: "product 1",
    image: "https://picsum.photos/200/200?random=1",
    price: 12000,
  },
  {
    id: 2,
    name: "product 2",
    image: "https://picsum.photos/200/200?random=2",
    price: 20000,
  },
  {
    id: 3,
    name: "product 3",
    image: "https://picsum.photos/200/200?random=3",
    price: 10000,
  },
  {
    id: 4,
    name: "product 4",
    image: "https://picsum.photos/200/200?random=4",
    price: 20000,
  },
  {
    id: 5,
    name: "product 5",
    image: "https://picsum.photos/200/200?random=5",
    price: 50000,
  },
];

export const handlers = [
  http.get("/api/products", () => {
    return HttpResponse.json(mockProducts);
  }),
];
