import { useState, useEffect } from "react"
import AddItem from "./AddItem"
import Header from "./Header"
import Content from "./Content"
import Footer from "./Footer"
import SearchItem from "./SearchItem"
function App() {
    const [items, setItems] = useState(
        JSON.parse(localStorage.getItem("shoppingList")) || []
    )

    const [newItem, setNewItem] = useState("")
    const [search, setSearch] = useState("")

    // 跟api溝通透過useEffect
    useEffect(() => {
        console.log("useEffect @ items change")
        localStorage.setItem("shoppingList", JSON.stringify(items))
    }, [items])

    useEffect(() => {
        console.log("useEffect @ every render")
    })

    useEffect(() => {
        console.log("useEffect @ loading")
    }, [])

    const addItem = (item) => {
        const id = items.length ? items[items.length - 1].id + 1 : 1
        const myNewItem = { id, checked: false, item }
        const listItems = [...items, myNewItem]
        setItems(listItems)
    }
    const handleCheck = (id) => {
        const listItems = items.map((item) =>
            item.id === id ? { ...item, checked: !item.checked } : item
        )
        setItems(listItems)
    }
    const handleDelete = (id) => {
        console.log(id)
        const listItems = items.filter((item) => item.id !== id)
        setItems(listItems)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (!newItem) return
        addItem(newItem)
        // addItem
        setNewItem("")
    }
    return (
        <div className='App'>
            <Header title='Groceries list' />

            <AddItem
                newItem={newItem}
                setNewItem={setNewItem}
                handleSubmit={handleSubmit}
            />
            <SearchItem search={search} setSearch={setSearch} />

            <Content
                items={items.filter((item) =>
                    item.item.toLowerCase().includes(search.toLowerCase())
                )}
                setItems={setItems}
                handleCheck={handleCheck}
                handleDelete={handleDelete}
            />
            <Footer length={items.length} />
        </div>
    )
}

export default App
