import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useMatch } from "react-router-dom";

import "./App.css";

import { fetchResults } from "./reducers/resultsReducer";

import Home from "./components/Home/Home";
import Result from "./components/Result/Result";
import About from "./components/About/About";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchResults());
  }, []);

  const results = useSelector((state) => state.results);

  const match = useMatch("/results/:id");
  const result = match
    ? results.find((result) => result.id === match.params.id)
    : null;

  return (
    <div className="App">
      <div className="card">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/results/:id" element={<Result result={result} />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
