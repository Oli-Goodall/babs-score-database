import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Chorus } from "./components/chorus/Chorus";
import { ContestListPage } from "./components/contest/ContestListPage";
import { Footer } from "./components/footer/Footer";
import { Home } from "./components/home/Home";
import { Navbar } from "./components/navbar/Navbar";
import { Quartet } from "./components/quartet/Quartet";
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
        <ContestListPage />
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
