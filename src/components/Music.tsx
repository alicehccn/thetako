import { Link } from "react-router-dom";
import "../App.css";

const Music: React.FC = () => {
  
  return (
    <>
    <div className="App-header">
          <div className="App-logo">
            <Link to="/albums">
              <img alt="DJLodestone" src="/lodestonerunegod2.png" />
            </Link>
            
          </div>
      </div>
      <div className="music-list-container">
      <iframe title="Lodestone on Soundcloud" src="https://w.soundcloud.com/player/?visual=false&url=https%3A%2F%2Fapi.soundcloud.com%2Fusers%2F3799123&show_artwork=true"></iframe>
    </div>
    </>
    
  );
}

export default Music;
