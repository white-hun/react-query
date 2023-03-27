import { useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import Products from "./Products";

export default function MainProducts() {
  const [showLeftProducts, setShowLeftProducts] = useState(true);
  const [showRightProducts, setShowRightProducts] = useState(true);
  const client = useQueryClient(); // useQueryClient를 사용하면 QueryClientProvider의 우산을 쓰고있는 모든 자식 컴포넌트들에서 client를 가지고 올 수 있다
  return (
    <main className="container">
      <div>
        {showLeftProducts && <Products />}
        <button onClick={() => setShowLeftProducts((show) => !show)}>toggle</button>
      </div>
      <div>
        {showRightProducts && <Products />}
        <button onClick={() => setShowRightProducts((show) => !show)}>toggle</button>
      </div>
      <button
        onClick={() => {
          client.invalidateQueries(["products", false]); // 해당하는 key의 false상태의 데이터에 한해서 invalidate(새로고침) 할 수 있다
        }}
      >
        정보가 업데이트 되었음
      </button>
    </main>
  );
}

// 새로운 제품이 추가되었다고 가정하면
// 화면상에 있는 데이터는 오래된 데이터이다
// 그때 새로운 데이터가 업데이트되었으니까 오래된 데이터는 invalidate하게 해달라고 명령할 수 있다
