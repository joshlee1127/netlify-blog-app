import React from "react"

const Header = ({ title }) => {
    return (
        <header>
            <h1 style={{ margin: "auto" }}>{title} </h1>
        </header>
    )
}

Header.defaultProps = {
    title: "Default title",
}

export default Header
