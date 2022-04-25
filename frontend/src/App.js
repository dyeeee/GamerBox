import './App.less'
import {Route, Routes } from "react-router-dom"
import MainLayout from "./components/MainLayout"
import HomePage from "./components/HomePage"
import NewsPage from "./components/NewsPage"
import PersonalPage from "./components/PersonalPage"
import RankPage from "./components/RankPage"
import TestPage1 from "./components/EffectTestPage"
import GameLibrary from './components/GameLibrary'
import GameDetailPage1 from "./components/GameDetailPage1"


function App () {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />

        <Route path="/PersonalPage/:uid" element={<PersonalPage />} >
          <Route path=":id" element={<GameLibrary />} />
        </Route>
        <Route path="/NewsPage" element={<NewsPage />} />
        <Route path="/RankPage" element={<RankPage />} />
        <Route path="/TestPage1" element={<TestPage1 />} />
        <Route path="/GameDetailPage1" element={<GameDetailPage1 />} />


      </Route>
    </Routes>
  );
}

export default App;
