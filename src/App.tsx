import "./App.css";
import Albums from "./components/Albums";
import { ALBUM_URL } from "./constant";

function App() {
  
  return (
    <div className="app">
      <Albums url={ALBUM_URL}/>
    </div>
  );
}

export default App;
