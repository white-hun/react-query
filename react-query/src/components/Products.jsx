import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";

export default function Products() {
  const [checked, setChecked] = useState(false);
  const {
    isLoading,
    error,
    data: products, // Data의 이름을 바꿔줄 수 있다
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

// useQurey에 첫번째 인자로 cache를 위한 key를 전달해줘야한다 배열형태이다
// 서로 밀접하게 연관된 여러가지의 key들을 전달할 수 있다
// 내부적으로 key들을 이용하여 해쉬key를 만들고 이것을 이용해서 cache를 보관하고 cache에서 읽어와야하는지 네트워크에서 읽어와야하는지 관리한다

// 두번째 인자는 함수
// 데이터를 어디서 가져와야하는지에 대한 함수(네트워크에서 데이터를 받아오는 로직)
// promise든 await로 네트워크에서 받아온 데이터를 반환(함수 를 async로 만들어야 한다)

// 컴포넌트가 처음으로 mount되거나 내부적으로 상태가 변경되거나 prop이 변경되어서 rerender될 때
// key가 동일하고 cache가 되어있다면 두번째 인자의 함수로 네트워크 통신을 통해 데이터를 받아오는 것이 아니라
// 최초의 네트워크 통신에서 메모리에 데이터가 cache되는데
// 내부적으로 메모리에 존재하는 cache된 데이터를 사용한다

// key가 배열인 이유는 세밀하게 key들의 조합을 만들 수 있기 때문이다

// Important Default
// useQuery나 useInfinitieQuery를 사용하면 cache된 데이터의 default는 stale이다(오래된 데이터라는 뜻)
// 이것은 변경하기 위해서는 query를 global로 사용하거나 query별로 staleTime이라는 옵션을 정해주면 된다
// 한번 네트워크상에서 받아온 데이터를 얼마동안 fresh로 간주할 건지 설정한다

// stale query는 cache되어 있어서 요청이 오면 UI상에 보여주지만 background에서 네트워크 요청을 통해 업데이트된다
// stale query는 다음 경우에 자동으로 refetch된다
// refetchOnMount - 새로운 query가 mount 되었을 때
// refetchOnWindowFocus- 윈도우가 refocus 되었을 때
// refetchOnReconnect- 네트워크가 재연결되었을 때
// refetchInterval- query가 refetch interval되었을 때(얼마동안 refetch하라고 설정할 수 있는데 그것이 설정되었을 때)
// default를 바꾸려면 위의 값들의 false로 해주면된다

// App에서 useQuery, useInfiniteQuery가 사용되지 않으면 inactive 상태로 변하고 이 상태에서 5분동안 참조되지 않으면 garbage collected가 된다
// 이것을 바꾸려면 cacheTime을 조금더 긴 시간으로 표시해주면 된다
// query는 네트워크 통신에 실패하면 재시도를 3번하는데 다음 시도 시 마다 더 긴 시간동안 기다린다
// 이것또한 retry, retryDelay로 값을 변경할 수 있다
