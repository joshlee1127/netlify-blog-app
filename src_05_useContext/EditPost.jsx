import React, { useEffect, useContext, useState } from "react"
import { useParams, Link, useHistory } from "react-router-dom"
import { format } from "date-fns"
import api from "./api/posts"
import DataContext from "./context/DataContext"
const EditPost = () => {
    const [editTitle, setEditTitle] = useState("")
    const [editBody, setEditBody] = useState("")
    const { posts, setPosts } = useContext(DataContext)
    const history = useHistory()

    const { id } = useParams()

    const post = posts.find((post) => post.id === id * 1)

    useEffect(() => {
        if (post) {
            setEditTitle(post.title)
            setEditBody(post.body)
        }
    }, [post, setEditTitle, setEditBody])
    const handleEdit = async (id) => {
        const dateTime = format(new Date(), "MMMM dd, yyyy pp")
        const updatePost = { id, title: editTitle, dateTime, body: editBody }
        try {
            const response = await api.put(`/posts/${id}`, updatePost)
            setPosts(
                posts.map((post) =>
                    post.id === id ? { ...response.data } : post
                )
            )
            setEditTitle("")
            setEditBody("")
            history.push("/")
        } catch (err) {
            console.log("Error:", err.message)
        }
    }
    return (
        <main className='NewPost'>
            {editTitle && (
                <>
                    <h2>Edit Post</h2>
                    <form
                        className='newPostForm'
                        onSubmit={(e) => e.preventDefault()}>
                        <label htmlFor='postTitle'>Title:</label>
                        <input
                            type='text'
                            id='postTitle'
                            required
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                        />
                        <label htmlFor='postBody'>Body:</label>
                        <textarea
                            id='postBody'
                            required
                            value={editBody}
                            onChange={(e) =>
                                setEditBody(e.target.value)
                            }></textarea>

                        <button
                            type='submit'
                            onClick={() => handleEdit(post.id)}>
                            Submit
                        </button>
                    </form>
                </>
            )}
            {!editTitle && (
                <>
                    <h2>Post Not Found</h2>
                    <p>Will, that is disappointing</p>
                    <p>
                        <Link to='/'>Visit out HomePage</Link>
                    </p>
                </>
            )}
        </main>
    )
}

export default EditPost
