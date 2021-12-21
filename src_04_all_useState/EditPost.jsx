import React, { useEffect } from "react"
import { useParams, Link } from "react-router-dom"

const EditPost = ({
    posts,
    handleEdit,
    editBody,
    setEditBody,
    editTitle,
    setEditTitle,
}) => {
    const { id } = useParams()

    const post = posts.find((post) => post.id === id * 1)

    useEffect(() => {
        if (post) {
            setEditTitle(post.title)
            setEditBody(post.body)
        }
    }, [post, setEditTitle, setEditBody])
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
