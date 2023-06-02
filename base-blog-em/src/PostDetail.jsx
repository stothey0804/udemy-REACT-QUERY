import React from "react";
import { useQuery, useMutation } from 'react-query';

async function fetchComments(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
  );
  return response.json();
}

async function deletePost(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: "DELETE" }
  );
  return response.json();
}

async function updatePost(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: "PATCH", data: { title: "REACT QUERY FOREVER!!!!" } }
  );
  return response.json();
}

export function PostDetail({ post }) {
  // replace with useQuery
  // 쿼리 키 설정, fetch 함수 전달 시 익명함수
  const {data, isLoading, isError, error} = useQuery(['comments', post.id], () => fetchComments(post.id));

  const deleteMutation = useMutation((postId) => deletePost(postId));

  const updateMutation = useMutation((postId) => updatePost(postId));

  if (isLoading) {
    return (<h5>loading....</h5>);
  }

  if (isError) {
    return (<h5>${error.toString()}</h5>);
  }

  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <button onClick={() => deleteMutation.mutate(post.id)}>Delete</button> 
      <button onClick={() => updateMutation.mutate(post.id)}>Update title</button>
      {deleteMutation.isError && <p style={{color: 'red'}}>Error deleting the post</p>}
      {deleteMutation.isLoading && <p style={{color: 'perple'}}>Deleting the post...</p>}
      {deleteMutation.isSuccess && <p style={{color: 'green'}}>Post has been deleted</p>}
      {updateMutation.isError && <p style={{color: 'red'}}>Error updating the post title</p>}   
      {updateMutation.isLoading && <p style={{color: 'perple'}}>Updating the post title</p>}   
      {updateMutation.isSuccess && <p style={{color: 'green'}}>Post title has been updated</p>}   
      <p>{post.body}</p>
      <h4>Comments</h4>
      { !isLoading && data.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  );
}
