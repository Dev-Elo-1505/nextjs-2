import { useMutation, useQueryClient } from "@tanstack/react-query";

 async function addPost(post: { title: string; body: string, id: number }) {
    const response = await fetch('https://dummyjson.com/posts', {
        method: 'POST',
        body: JSON.stringify(post),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return response.json()
}

const AddPost = () => {
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: addPost,
        onSuccess: (data) => {
            console.log('Post added:', data)
            queryClient.invalidateQueries({ queryKey: ['posts'] })
        }
    })
    return (
        <button onClick={() => mutation.mutate({ title: 'New Post', body: 'This is a new post.', id: 101 })}>
            Add Post
        </button>
    )
}

export default AddPost;