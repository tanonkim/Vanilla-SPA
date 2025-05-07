type Product = {
  id: number;
  name: string;
  image: string;
  price: number;
};

export async function StorePage() {
  let currentPage = 1;
  let allData: Product[] = [];

  const loadProducts = async (page: number) => {
    const response = await fetch(`/api/products?page=${page}`);

    if (!response.ok) {
      console.error(response.statusText);
      return [];
    }

    const data: Product[] = await response.json();

    allData = [...allData, ...data];
    return data;
  };

  const renderProducts = (data: Product[]) => {
    const container = document.getElementById("product-list");
    if (!container) return;

    data.forEach((item) => {
      const anchor = document.createElement("a");
      anchor.className =
        "flex items-center gap-10 my-3 py-2 border-b-[1px] border-[#000000]";
      anchor.href = `/store/${item.id}`;

      const imgDiv = document.createElement("div");
      const img = document.createElement("img");
      img.src = item.image;
      img.alt = `${item.name}-이미지`;
      img.loading = "lazy";
      imgDiv.appendChild(img);

      const textDiv = document.createElement("div");
      const nameDiv = document.createElement("div");
      nameDiv.className = "text-[24px]";
      nameDiv.textContent = item.name;
      const priceDiv = document.createElement("div");
      priceDiv.textContent = `${item.price.toLocaleString()}원`;

      textDiv.appendChild(nameDiv);
      textDiv.appendChild(priceDiv);

      anchor.appendChild(imgDiv);
      anchor.appendChild(textDiv);

      container.appendChild(anchor);
    });
  };

  const loadNextPage = async (
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserver
  ) => {
    const entry = entries[0];
    if (entry.isIntersecting && currentPage < 5) {
      currentPage++;
      const newProducts = await loadProducts(currentPage);
      renderProducts(newProducts);
      observer.unobserve(entry.target);
      observer.observe(document.getElementById("load-more")!);
    }
  };

  // Delay setup to allow DOM to be mounted
  setTimeout(async () => {
    const initialProducts = await loadProducts(currentPage);
    renderProducts(initialProducts);

    const observer = new IntersectionObserver(loadNextPage, {
      rootMargin: "10px",
      threshold: 1.0,
    });

    const target = document.getElementById("load-more");
    if (target) observer.observe(target);
  }, 0);

  return (
    <div className="p-10">
      <h2 className="text-[40px]">Store</h2>
      <a data-link href="/">
        메인 홈페이지 돌아가기
      </a>
      <div id="product-list" />
      <div className="h-[20px] pb-10" id="load-more">
        <p className="bg-[#111111]">Loading more...</p>
      </div>
    </div>
  );
}
