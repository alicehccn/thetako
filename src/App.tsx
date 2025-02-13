import "./App.css";
import Home from "./components/Home";
import Footer from "./components/Footer";

type Props = {
}

const App: React.FC<Props> = () => {
  return (
    <div className="App">
      <Home />
      <Footer />
    </div>
  );
}

export default App;
