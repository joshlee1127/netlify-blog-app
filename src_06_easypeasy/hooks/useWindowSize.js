import { useState, useEffect } from "react"

const useWindowSize = () => {
    const [widowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined,
    })
    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            })
        }
        handleResize()

        window.addEventListener("resize", handleResize)
        /* const cleanUp = () => {
            console.log("run if a useEfface dep changes")
            window.removeEventListener("resize", handleResize)
        } */
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    return widowSize
}

export default useWindowSize
