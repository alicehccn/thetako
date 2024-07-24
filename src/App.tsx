import "./App.css";
import Album from "./components/Album";
import { ALBUM_URL } from "./constant";

function App() {
  
  return (
    <div className="app">
      <Album url={ALBUM_URL}/>
    </div>
  );
}

export default App;
