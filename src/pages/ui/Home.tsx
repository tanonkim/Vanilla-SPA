export async function HomePage() {
  const response = await fetch("/api/products");

  if (!response.ok) {
    console.error("error 발생");
  }

  const data = await response.json();
  console.log(data);

  return (
    <div>
      <h2>HomePage</h2>
      <a data-link href="/store/1">
        go product 1
      </a>
      &nbsp;&nbsp;
      <a data-link href="/store">
        go store
      </a>
    </div>
  );
}
