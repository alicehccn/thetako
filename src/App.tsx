import { Link } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";

function App() {
  
  return (
    <div className="home-container">
      <ul className="App-menu-list">
        <li className="App-menu-item"><Link to="/">Home</Link></li>
        <li className="App-menu-item"><Link to="/albums">Photography</Link></li>
        </ul>
    </div>
  );
}

export default App;
