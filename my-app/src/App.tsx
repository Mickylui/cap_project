import React from "react";
// import logo from './logo.svg';
import "./App.css";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";

import { BrowserRouter as Router, Routes, Route, Link as RouteLink } from "react-router-dom";
import LogIn from "./Pages/Utils/Account";
import SocialPlatform from "./Pages/Platform/SocialPlatform";
import PostDetail from "./Pages/Platform/PostDetail";

function App() {
    return (
        <div className="App">
            <Router>
                <Navbar />
                <Routes>
                    <Route path="login" element={<LogIn />} />
                    <Route path="posts" element={<SocialPlatform />} />
                    {/* <Route path={routes.postItem({item_id:':item_id'})} element={ <PostDetail /> }/> */}
                    <Route path="*" element={<>404 : Page Not Found</>}/>
                </Routes>
                <Footer />
            </Router>
        </div>
    );
}

export default App;
