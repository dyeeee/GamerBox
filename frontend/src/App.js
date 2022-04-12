import './App.css'
import {Route, Routes} from "react-router-dom"
import MainLayout from "./components/MainLayout"
import HomePage from "./components/HomePage"

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout/>}>
        <Route index element={<HomePage/>}/>
      </Route>
    </Routes>
  );
}

export default App;
