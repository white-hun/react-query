import { useEffect, useState } from "react";

export default function useProducts({ salesOnly }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    setLoading(true);
    setError(undefined);
    fetch(`data/${salesOnly ? "sale_" : ""}products.json`)
      .then((res) => res.json())
      .then((data) => {
        console.log("🔥 데이터를 네트워크에서 받아옴");
        setProducts(data);
      })
      .catch((error) => setError("💀E💀R💀R💀R💀O💀"))
      .finally(() => setLoading(false));
    return () => {
      console.log("🧹 청소하기");
    };
  }, [salesOnly]);

  return [loading, error, products];
}
