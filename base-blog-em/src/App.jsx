<<<<<<< HEAD
import { Posts } from "./Posts";
import "./App.css";

function App() {
  return (
    // provide React Query client to App
    <div className="App">
      <h1>Blog Posts</h1>
      <Posts />
    </div>
  );
=======
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Posts } from "./Posts";
import "./App.css";

const queryClient = new QueryClient();

function App() {
	return (
		// provide React Query client to App
		<QueryClientProvider client={queryClient}>
			<div className="App">
				<h1>Blog Posts</h1>
				<Posts />
			</div>
			<ReactQueryDevtools></ReactQueryDevtools>
		</QueryClientProvider>
	);
>>>>>>> b01a1ebd4ecef0d5fa80a06016170feac783c356
}

export default App;
