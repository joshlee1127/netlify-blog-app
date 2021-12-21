import React from "react"
import Feed from "./Feed"
import { useContext } from "react"
import DataContext from "./context/DataContext"

const Home = () => {
    const { searchResults, fetchError, isLoading } = useContext(DataContext)
    const posts = searchResults
    return (
        <main className='Home'>
            {/* {posts.length ? (
                <Feed posts={posts} />
            ) : (
                <p style={{ marginTop: "2rem" }}>No posts to display</p>
            )} */}
            {isLoading && <p className='statusMsg'>Loading Posts...</p>}
            {!isLoading && fetchError && (
                <p className='statusMsg' style={{ color: "red" }}>
                    {fetchError}
                </p>
            )}
            {!isLoading &&
                !fetchError &&
                (posts.length ? (
                    <Feed posts={posts} />
                ) : (
                    <p className='statusMsg'>No posts to display</p>
                ))}
        </main>
    )
}

export default Home
