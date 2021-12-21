import React from "react"
import ListItem from "./ListItem"
const List = ({ items }) => {
    return (
        <ul>
            {items.map((item) => (
                <ListItem key={item.id} item={item}></ListItem>
            ))}
        </ul>
    )
}

export default List
