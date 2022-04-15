import './App.less'
import { Route, Routes } from "react-router-dom"
import MainLayout from "./components/MainLayout"
import HomePage from "./components/HomePage"
import NewsPage from "./components/NewsPage"
import PersonalPage from "./components/PersonalPage"
import RankPage from "./components/RankPage"


function App () {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />

        <Route path="/PersonalPage" element={<PersonalPage />} />
        <Route path="/NewsPage" element={<NewsPage />} />
        <Route path="/RankPage" element={<RankPage />} />

      </Route>
    </Routes>
  );
}

export default App;
