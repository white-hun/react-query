import React from "react";
import "./App.css";
import MainProducts from "./components/MainProducts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MainProducts />
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
}

export default App;

// Query client를 사용하도록 App 전체적으로 우산을 씌워준다
// 네트워크 통신을 하는 곳에서 useQuery를 사용

// Devtool 사용법
// import 한 후
// 최하단에 <ReactQueryDevtools initialIsOpen={false} /> 작성

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//----------------------------------------------------------------------------------------------
