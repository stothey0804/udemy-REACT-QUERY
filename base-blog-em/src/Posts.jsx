<<<<<<< HEAD
import { useState } from "react";
=======
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
>>>>>>> b01a1ebd4ecef0d5fa80a06016170feac783c356

import { PostDetail } from "./PostDetail";
const maxPostPage = 10;

<<<<<<< HEAD
async function fetchPosts() {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=10&_page=0"
  );
  return response.json();
}

export function Posts() {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedPost, setSelectedPost] = useState(null);

  // replace with useQuery
  const data = [];

  return (
    <>
      <ul>
        {data.map((post) => (
          <li
            key={post.id}
            className="post-title"
            onClick={() => setSelectedPost(post)}
          >
            {post.title}
          </li>
        ))}
      </ul>
      <div className="pages">
        <button disabled onClick={() => {}}>
          Previous page
        </button>
        <span>Page {currentPage + 1}</span>
        <button disabled onClick={() => {}}>
          Next page
        </button>
      </div>
      <hr />
      {selectedPost && <PostDetail post={selectedPost} />}
    </>
  );
=======
async function fetchPosts(pageNum) {
	const response = await fetch(
		`https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${pageNum}`
	);
	return response.json();
}

export function Posts() {
	const [currentPage, setCurrentPage] = useState(1);
	const [selectedPost, setSelectedPost] = useState(null);

	const queryClient = useQueryClient();

	// 다음페이지의 데이터를 미리 가져온다.
	useEffect(() => {
		if(currentPage < maxPostPage) {
			const nextPage = currentPage + 1;
			queryClient.prefetchQuery(
				['posts', nextPage],
				() => fetchPosts(nextPage)
			);
		}
	}, [currentPage, queryClient]);

	// replace with useQuery
	const { data, isLoading, isError } = useQuery(
		["posts", currentPage], 
		() => fetchPosts(currentPage), 
		{
			staleTime: 2000,
			keepPreviousData: true,
		},	
	);

	return (
		<>
			{isLoading && <h3>Loading...</h3>}
			<ul>
				{!isLoading &&
					data.map((post) => (
						<li
							key={post.id}
							className="post-title"
							onClick={() => setSelectedPost(post)}
						>
							{post.title}
						</li>
					))}
			</ul>
			<div className="pages">
				<button 
					disabled={currentPage <= 1}
					onClick={() => { setCurrentPage((prevPage) => prevPage - 1) }}>
					Previous page
				</button>
				<span>Page {currentPage}</span>
				<button 
					disabled={currentPage >= maxPostPage}
					onClick={() => { setCurrentPage((prevPage) => prevPage + 1) }}>
					Next page
				</button>
			</div>
			<hr />
			{selectedPost && <PostDetail post={selectedPost} />}
		</>
	);
>>>>>>> b01a1ebd4ecef0d5fa80a06016170feac783c356
}
