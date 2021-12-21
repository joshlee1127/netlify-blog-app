const apiRequest = async (url = "", optionsObjs = null, errMsg = null) => {
    try {
        console.log("receive ", optionsObjs)
        const response = await fetch(url, optionsObjs)
        if (!response.ok) throw Error("Please reload the app")
        console.log("api success response", await response.json())
    } catch (err) {
        errMsg = err.message
    } finally {
        return errMsg
    }
}
/* 
const apiRequest = async (url = "", optionsObj = null, errMsg = null) => {
    try {
        const response = await fetch(url, optionsObj)
        if (!response.ok) throw Error("Please reload the app")
    } catch (err) {
        errMsg = err.message
    } finally {
        return errMsg
    }
}
 */
export default apiRequest
