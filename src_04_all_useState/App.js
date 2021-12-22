import React, { useState, useEffect } from "react"
import { Route, Switch, useHistory } from "react-router-dom"
import { format } from "date-fns"

import Header from "./Header"
import Nav from "./Nav"
import Footer from "./Footer"
import Home from "./Home"
import NewPost from "./NewPost"
import EditPost from "./EditPost"
import PostPage from "./PostPage"
import About from "./About"
import Missing from "./Missing"

import api from "./api/posts"
import useWindowSize from "./hooks/useWindowSize"
import useAxiosFetch from "./hooks/useAxiosFetch"
const App = () => {
    const [posts, setPosts] = useState([])
    const [search, setSearch] = useState("")

    const [searchResults, setSearchResults] = useState([])
    const [postTitle, setPostTitle] = useState("")
    const [postBody, setPostBody] = useState("")
    const [editTitle, setEditTitle] = useState("")
    const [editBody, setEditBody] = useState("")
    const history = useHistory()
    const { width } = useWindowSize()
    const { data, fetchError, isLoading } = useAxiosFetch(
        "http://localhost:3500/posts"
    )

    useEffect(() => {
        setPosts(data)
    }, [data])

    /* useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await api.get("/posts")
                setPosts(response.data)
            } catch (err) {
                if (err.response) {
                    // not in 200 response range
                    console.log(err.response.data)
                    console.log(err.response.status)
                    console.log(err.response.headers)
                } else {
                    console.log("Error:", err.message)
                }
            }
        }
        fetchPosts()
    }, []) */
    useEffect(() => {
        const filteredResults = posts.filter(
            (post) =>
                post.body
                    .toLocaleLowerCase()
                    .includes(search.toLocaleLowerCase()) ||
                post.title
                    .toLocaleLowerCase()
                    .includes(search.toLocaleLowerCase())
        )
        setSearchResults(filteredResults.reverse())
    }, [posts, search])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const id = posts.length ? posts[posts.length - 1].id + 1 : 1
        const dateTime = format(new Date(), "MMMM dd, yyyy pp")
        const newPost = { id, title: postTitle, dateTime, body: postBody }
        try {
            const response = await api.post("/posts", newPost)
            const allPosts = [...posts, response.data]
            setPosts([...allPosts])
            setPostBody("")
            setPostTitle("")
            history.push("/")
        } catch (err) {
            console.log("Error:", err.message)
        }
    }
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
        <div className='App'>
            <Header title='JS Blog' width={width} />
            <Nav search={search} setSearch={setSearch} />
            <Switch>
                <Route exact path='/'>
                    <Home
                        posts={searchResults}
                        fetchError={fetchError}
                        isLoading={isLoading}
                    />
                </Route>
                <Route exact path='/post'>
                    <NewPost
                        postTitle={postTitle}
                        postBody={postBody}
                        setPostTitle={setPostTitle}
                        setPostBody={setPostBody}
                        handleSubmit={handleSubmit}
                    />
                </Route>
                <Route path='/edit/:id'>
                    <EditPost
                        posts={posts}
                        handleEdit={handleEdit}
                        editTitle={editTitle}
                        setEditTitle={setEditTitle}
                        editBody={editBody}
                        setEditBody={setEditBody}
                    />
                </Route>
                <Route path='/post/:id'>
                    <PostPage posts={posts} handleDelete={handleDelete} />
                </Route>
                <Route path='/about' component={About} />
                <Route path='/*' component={Missing} />
            </Switch>
            <Footer />
        </div>
    )
}

export default App