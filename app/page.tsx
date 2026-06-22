'use client'
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

interface Post {
  id: number;
  title: string;
  body: string;
}


export default function Home() {

  const fetchPosts = async () => {
    const response = await fetch('https://dummyjson.com/posts')
    const data = await response.json()
    return data.posts;
  }
  const { isPending, error, data } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts
  })

  if (isPending) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>Error: {error instanceof Error ? error.message : 'Unknown error'}</p>
  }


  return (
 <div>
<h1>Welcome to the Party!</h1>
{data?.map((post: Post) => (
  <div key={post.id}>
    <h2>{post.title}</h2>
    <p>{post.body}</p>
  </div>
))}
 </div>
  );
}
