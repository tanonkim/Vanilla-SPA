import { history } from "@/shared/lib/router";

export async function StoreDetailPage() {
  const id = history.getPageParams();

  const response = await fetch(`/api/product/${id}`);
  if (!response.ok) {
    console.error(response.statusText);
    return;
  }

  const data = await response.json();
  console.log(data);

  if (!data) return;

  const createElement = async () => {
    const container = document.getElementById("product-item");
    if (!container) return;

    const div = document.createElement("div");
    div.className =
      "flex items-center gap-10 my-3 py-2 border-b-[1px] border-[#000000]";

    const imgDiv = document.createElement("div");
    const img = document.createElement("img");
    img.src = data[0].image;
    img.alt = `${data[0].name}-이미지`;
    img.loading = "lazy";
    imgDiv.appendChild(img);

    const textDiv = document.createElement("div");
    const nameDiv = document.createElement("div");
    nameDiv.className = "text-[24px]";
    nameDiv.textContent = data.name;
    const priceDiv = document.createElement("div");
    priceDiv.textContent = `${data[0].price.toLocaleString()}원`;

    textDiv.appendChild(nameDiv);
    textDiv.appendChild(priceDiv);

    div.appendChild(imgDiv);
    div.appendChild(textDiv);

    container.appendChild(div);
  };

  setTimeout(async () => {
    await createElement();
  }, 0);

  return (
    <div>
      <div>
        <h2>PostPage {id}</h2>
        <a data-link href="/">
          go home
        </a>
        &nbsp;&nbsp;
        <a data-link href="/store">
          go store
        </a>
      </div>
      <div id="product-item" />
    </div>
  );
}
