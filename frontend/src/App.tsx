import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Chorus } from "./components/chorus/Chorus";
import { QuartetContestListPage } from "./components/quartet/contest/QuartetContestListPage";
import { QuartetContestPage } from "./components/quartet/contest/QuartetContestPage";
import { Footer } from "./components/footer/Footer";
import { Home } from "./components/home/Home";
import { Navbar } from "./components/navbar/Navbar";
import { Quartet } from "./components/quartet/Quartet";
import { Song } from "./components/song/Song";
import { ChorusContestPage } from "./components/chorus/contest/ChorusContestPage";
import { ChorusContestListPage } from "./components/chorus/contest/ChorusContestListPage";

const Routes: React.FunctionComponent = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/quartets">
        <Quartet />
      </Route>
      <Route exact path="/quartets/contestlist">
        <QuartetContestListPage />
      </Route>
      <Route exact path="/quartets/contest/:contestId">
        <QuartetContestPage />
      </Route>
      <Route exact path="/choruses">
        <Chorus />
      </Route>
      <Route exact path="/choruses/contestlist">
        <ChorusContestListPage />
      </Route>
      <Route exact path="/choruses/contest/:contestId">
        <ChorusContestPage />
      </Route>
      <Route exact path="/songs">
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
