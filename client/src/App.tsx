import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import PageRender from "./PageRender";
import Alert from "./components/globals/Alert";
function App() {
    return <div className="App">
        <Alert />
        <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover={false}
            theme="dark"

        />
        <Router>
            <Switch>
                <Route path="/" exact component={PageRender}></Route>
                <Route path="/:page" exact component={PageRender}></Route>
                <Route path="/:page/:slug" exact component={PageRender}></Route>
            </Switch>
        </Router>
    </div>
}

export default App;
