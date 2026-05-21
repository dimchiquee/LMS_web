import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import TablePage from "./pages/TablePage";
import SkinPage from "./pages/SkinPage";
import ChartsPage from "./pages/ChartsPage";
import QuizPage from "./pages/QuizPage";
import CrudPage from "./pages/CrudPage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/table" element={<TablePage />} />
        <Route path="/skin/:id" element={<SkinPage />} />
        <Route path="/charts" element={<ChartsPage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/crud" element={<CrudPage />} />
      </Routes>
    </>
  );
}

export default App;
