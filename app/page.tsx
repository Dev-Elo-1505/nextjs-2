'use client'
import { useEffect, useState } from "react";

interface Post {
  id: number;
  title: string;
  body: string;
}


export default function Home() {
  const [posts, setPosts] = useState<Post[]>([])

  const fetchPosts = async () => {
    const response = await fetch('https://dummyjson.com/posts')
    const data = await response.json()
    setPosts(data.posts)
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
 <div>
<h1>Welcome to the Party!</h1>
{posts.map((post) => (
  <div key={post.id}>
    <h2>{post.title}</h2>
    <p>{post.body}</p>
  </div>
))}
 </div>
  );
}
