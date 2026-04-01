import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'

const PostDetail = () => {

    const { id } = useParams()
    const [post, setPost] = useState(null)

    useEffect(() => {
        fetch(`http://localhost:3000/posts/${id}`)
            .then(res => res.json())
            .then(data => setPost(data))
    }, [id])
    if (!post) return <div>Carregando...</div>

    return (
        <div className='p-4'>
            <img src={post.image} alt={post.title} />
            <h1 className='text-x1 font-bold'>{post.title}</h1>
            <h3>{post.views}</h3>
            <p>{post.description}</p>
        </div>
    )
}

export default PostDetail
