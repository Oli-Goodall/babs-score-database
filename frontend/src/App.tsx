import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ChorusPage } from "./components/chorus/ChorusPage";
import { QuartetContestListPage } from "./components/quartet/contest/QuartetContestListPage";
import { QuartetContestPage } from "./components/quartet/contest/QuartetContestPage";
import { Footer } from "./components/footer/Footer";
import { Home } from "./components/home/Home";
import { Navbar } from "./components/navbar/Navbar";
import { QuartetPage } from "./components/quartet/QuartetPage";
import { SongPage } from "./components/song/SongPage";
import { ChorusContestPage } from "./components/chorus/contest/ChorusContestPage";
import { ChorusContestListPage } from "./components/chorus/contest/ChorusContestListPage";

const Routes: React.FunctionComponent = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/quartets/contestlist">
        <QuartetContestListPage />
      </Route>      
      <Route exact path="/quartets/:quartetId">
        <QuartetPage />
      </Route>
      <Route exact path="/quartets/contest/:contestId">
        <QuartetContestPage />
      </Route>
      <Route exact path="/choruses/contestlist">
        <ChorusContestListPage />
      </Route>
      <Route exact path="/choruses/:chorusId">
        <ChorusPage />
      </Route>
      <Route exact path="/choruses/contest/:contestId">
        <ChorusContestPage />
      </Route>
      <Route exact path="/songs/:songId">
        <SongPage />
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
