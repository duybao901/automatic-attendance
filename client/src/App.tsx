import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import PageRender from "./PageRender";
import Alert from "./components/globals/Alert";
import { RootStore } from './utils/interface'
import Register from './pages/sign-up'
import Login from './pages/sign-in'
import Home from './pages/index'
import { refreshToken } from './store/actions/authActions'
import PrivateRouter from "./components/customRoute/PrivateRoute";
import SideBar from "./components/globals/SideBar";


function App() {

    const dispatch = useDispatch();
    const { auth } = useSelector((state: RootStore) => state)

    useEffect(() => {
        dispatch(refreshToken())
    }, [dispatch])


    return <div className="App">
        {/* Alert */}
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

        {/* Router */}
        <div className="body">
            <Router>
                {/* Side Bar */}
                {auth.access_token && <SideBar />}
                <div className='main pd-left'>
                    <Switch>
                        <Route path="/" exact component={auth.access_token ? Home : Login}></Route>
                        <Route path='/sign-up' component={Register} exact />

                        <PrivateRouter path="/:page" exact component={PageRender}></PrivateRouter>
                        <PrivateRouter path="/:page/:slug" exact component={PageRender}></PrivateRouter>
                    </Switch>
                </div>
            </Router>
        </div>
    </div>
}

export default App;
