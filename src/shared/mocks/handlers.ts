import { http, HttpResponse } from "msw";

const getRandomPrice = () => {
  const min = 10000;
  const max = 50000;
  const step = 1000;
  return Math.floor(Math.random() * ((max - min) / step + 1)) * step + min;
};

const generateMockProducts = (startId: number) =>
  Array.from({ length: 8 }).map((_, index) => ({
    id: startId + index,
    name: `product ${startId + index}`,
    image: `https://picsum.photos/200/200?random=${startId + index}`,
    price: getRandomPrice(),
  }));

const firstPageMockProducts = generateMockProducts(1);
const secondPageMockProducts = generateMockProducts(9);
const thridPageMockProducts = generateMockProducts(17);
const fourthPageMockProducts = generateMockProducts(25);
const fifthPageMockProducts = generateMockProducts(33);

export const handlers = [
  http.get("/api/products", ({ request }) => {
    const url = new URL(request.url);
    const page = url.searchParams.get("page");

    if (page === "1") return HttpResponse.json(firstPageMockProducts);
    if (page === "2") return HttpResponse.json(secondPageMockProducts);
    if (page === "3") return HttpResponse.json(thridPageMockProducts);
    if (page === "4") return HttpResponse.json(fourthPageMockProducts);
    if (page === "5") return HttpResponse.json(fifthPageMockProducts);

    return HttpResponse.json([]);
  }),
];
