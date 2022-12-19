import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
import { QuartetSearchPage } from "./components/quartet/QuartetSearchPage";

const SiteRoutes: React.FunctionComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/quartets/contestlist" element={<QuartetContestListPage />} />
      <Route path="/quartets/search" element={<QuartetSearchPage />} />
      <Route path="/quartets/:quartetId" element={<QuartetPage />} />
      <Route path="/quartets/contest/:contestId" element={<QuartetContestPage />} />
      <Route path="/choruses/contestlist" element={<ChorusContestListPage />} />
      <Route path="/choruses/:chorusId" element={<ChorusPage />} />
      <Route path="/choruses/contest/:contestId" element={<ChorusContestPage />} />
      <Route path="/songs/:songId" element={<SongPage />} />
    </Routes>
  );
};

const App: React.FunctionComponent = () => {
  return (
    <Router>
        <Navbar />
        <main className="page-content">
          <SiteRoutes />
        </main>
        <Footer />
    </Router>
  );
};

export default App;
