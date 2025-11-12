import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import CreateCrewmate from "./pages/CreateCrewmate";
import Gallery from "./pages/Gallery";
import EditCrewmate from "./pages/EditCrewmate";
import Details from "./pages/Details";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="layout">
        {/* 🌸 Sidebar */}
        <nav className="sidebar">
          <h2 className="app-title">💫  Crewmate Creator</h2>
          <Link to="/">Home</Link>
          <Link to="/create">Create</Link>
          <Link to="/gallery">Crewmates</Link>
        </nav>

        {/* 🌷 Main Content */}
        <main className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreateCrewmate />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/crewmates/:id/edit" element={<EditCrewmate />} />
            <Route path="/crewmates/:id" element={<Details />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
