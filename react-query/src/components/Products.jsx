import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";

export default function Products() {
  const [checked, setChecked] = useState(false);
  const {
    isLoading,
    error,
    data: products,
  } = useQuery(
    ["products", checked],
    async () => {
      console.log("fetching...", checked);
      return fetch(`data/${checked ? "sale_" : ""}products.json`).then((res) => res.json());
    },
    {
      staleTime: 1000 * 60 * 5,
    }
  );
  const handleChange = () => setChecked((prev) => !prev);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <input id="checkbox" type="checkbox" value={checked} onChange={handleChange} />
      <label htmlFor="checkbox">Show Only 🔥 Sale</label>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <article>
              <h3>{product.name}</h3>
              <p>{product.price}</p>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}

// 네트워크 통신을 하는 곳에서 useQuery를 사용
// useQuery를 사용할 때는 항상 key와 가지고오는 함수를 전달해줘야 한다
// React Query 문서에서 API메뉴 useQuery에서 확인할 수 있다
// key는 항상 고유한 값을 사용
// 데이터를 어디서 가져와야하는지에 대한 함수(네트워크에서 데이터를 받아오는 로직)
// promise든 await로 네트워크에서 받아온 데이터를 반환
