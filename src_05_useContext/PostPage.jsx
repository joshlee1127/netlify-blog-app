import React, { useContext } from "react"
import { useParams, Link, useHistory } from "react-router-dom"
import DataContext from "./context/DataContext"
import api from "./api/posts"
const PostPage = () => {
    const { posts, setPosts } = useContext(DataContext)

    const { id } = useParams()
    const history = useHistory()
    const post = posts.find((post) => post.id.toString() === id)
    const handleDelete = async (id) => {
        try {
            await api.delete(`/posts/${id}`)
            const postsList = posts.filter((post) => post.id !== id)
            setPosts([...postsList])
            history.push("/")
        } catch (err) {
            console.log("Error:", err.message)
        }
    }

    return (
        <main className='PostPage'>
            <article className='post'>
                {post && (
                    <>
                        <h2>{post.title}</h2>
                        <p className='postData'>{post.dateTime}</p>
                        <p className='postBody'>{post.body}</p>
                        <Link to={`/edit/${post.id}`}>
                            <button className='editButton'>Edit</button>
                        </Link>
                        <button
                            className='deleteButton'
                            onClick={(e) => {
                                handleDelete(post.id)
                            }}>
                            Delete Post
                        </button>
                    </>
                )}
                {!post && (
                    <>
                        <h2>Post Not Found</h2>
                        <p>Well, that's disappointing.</p>
                        <p>
                            <Link to='/'>Visit Our HomePage</Link>
                        </p>
                    </>
                )}
            </article>
        </main>
    )
}

export default PostPage
