import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home } from "./components/home/Home";
import { Navbar } from "./components/navbar/Navbar";
import { Footer } from "./components/footer/Footer";
import { Quartet } from "./components/quartet/Quartet";
import { Chorus } from "./components/chorus/Chorus";
import { Contest } from "./components/contest/Contest";
import { Song } from "./components/song/Song";

const Routes: React.FunctionComponent = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/quartet">
        <Quartet />
      </Route>
      <Route exact path="/chorus">
        <Chorus />
      </Route>
      <Route exact path="/contests">
        <Contest />
      </Route>
      <Route exact path="/song">
        <Song />
      </Route>
    </Switch>
  );
};

const App: React.FunctionComponent = () => {
  return (
    <Router>
        <Navbar />
        <main className="page-content">
          <Routes />
        </main>
        <Footer />
    </Router>
  );
};

export default App;
