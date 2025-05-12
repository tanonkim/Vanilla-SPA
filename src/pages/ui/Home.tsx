export function HomePage() {
  return (
    <div className="p-10">
      <h2 className="text-[40px]">HomePage</h2>
      <div className="flex justify-between mt-10">
        <div>
          <a data-link href="/new" className="p-5 bg-[#f57369]">
            최신상품 바로가기
          </a>
        </div>
        <div>
          <a data-link href="/store" className="p-5 bg-[#7e8ee6]">
            스토어 이동하기
          </a>
        </div>
      </div>
    </div>
  );
}
