import { Link } from "react-router-dom";
import "./App.css";
import { ReactElement } from "react";

type Props = {
  children: ReactElement
}

const App: React.FC<Props> = ({children}) => {
  return (
    <div className="App">
      
      {children}
      
      <footer>
        <div className="social-links">
          <a rel="noreferrer" target="_blank" title="follow me on facebook" href="https://www.facebook.com/djLodestone"><img alt="follow me on facebook" src="/fb-icon.png" /></a>
          <a rel="noreferrer" target="_blank" title="follow me on SoundCloud" href="https://soundcloud.com/djlodestone"><img alt="follow me on SoundCloud" src="/soundcloud-icon.png"/></a>
          <a rel="noreferrer" target="_blank" title="follow me on flickr" href="https://www.flickr.com/photos/jzf_k"><img alt="follow me on flickr" src="/flickr-icon.png"/></a>
          <a rel="noreferrer" title="email me" href="mailto:lodestonetx@yahoo.com"><img alt="email me" src="/email-icon.png"/></a>
        </div>
        <div>
          <span>&copy;2024-2025 Lodestone Studio</span>  |
          <span><a href="https://github.com/alicehccn">Github</a></span>
        </div>
      </footer>
    </div>
  );
}

export default App;
