import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router, Route } from "react-router-dom"
import "./index.css"
import App from "./App"
import { StoreProvider } from "easy-peasy"
import store from "./store"

ReactDOM.render(
    <React.StrictMode>
        <StoreProvider store={store}>
            <Router>
                <Route path='/' component={App} />
            </Router>
        </StoreProvider>
    </React.StrictMode>,
    document.getElementById("root")
)
