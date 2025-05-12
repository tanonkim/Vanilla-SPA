type product = {
  id: number;
  name: string;
  image: string;
  price: number;
};

export async function NewProduct() {
  const response = await fetch("/api/products?page=1");

  if (!response.ok) {
    // todo : 전역 Error.tsx 생성 후 throw로 에러 발생
    console.error(response.statusText);
  }

  const data: product[] = await response.json();

  return (
    <div className="p-10">
      <h2 className="text-[40px]">New Product</h2>
      <a data-link href="/">
        메인 홈페이지 돌아가기
      </a>
      {data &&
        data.map((item) => {
          return (
            <div
              key={item.id}
              className="flex items-center gap-10 my-3 py-2 border-b-[1px] border-[#000000]"
            >
              <div>
                <img
                  src={item.image}
                  alt={`${item.name}-이미지`}
                  loading="lazy"
                />
              </div>
              <div>
                <div className="text-[24px]">{item.name}</div>
                <div>{item.price.toLocaleString()}원</div>
              </div>
            </div>
          );
        })}
    </div>
  );
}
