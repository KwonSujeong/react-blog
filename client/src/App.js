
import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";

import LandingPage from './components/views/LandingPage/LandingPage'
import LoginPage from './components/views/LoginPage/LoginPage'
import RegisterPage from './components/views/RegisterPage/RegisterPage'
import UploadPage from './components/views/UploadPage/UploadPage'
import Auth from './hoc/auth'
import NavBar from "./components/views/NavBar/NavBar";
import Footer from "./components/views/Footer/Footer"
import DetailPage from "./components/views/DetailPage/DetailPage"

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <Router>
        <NavBar />

        <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
          <Switch>
            <Route exact path="/" component={Auth(LandingPage, null)} />
            <Route exact path="/login" component={Auth(LoginPage, false)} />
            <Route exact path="/register" component={Auth(RegisterPage, false)} />
            <Route exact path="/post/upload" component={Auth(UploadPage, true)} />
            <Route exact path="/post/:videoId" component={Auth(DetailPage, null)} />
          </Switch>
        </div>

        <Footer />
      </Router>
    </Suspense>

  );
}

export default App;
