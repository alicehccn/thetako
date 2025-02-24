import "../App.css";

const Header: React.FC = () => {
  return (
    <div className="App-header">
      <div className="social">
        <div>
          <a href="mailto:alicehccn@gmail.com">
            <img src="./email.png" />
            Email
          </a>
        </div>
        <div>
          <a target="_blank" href="https://www.linkedin.com/in/alicehccn/">
            <img src="./linkedin.png" />
            LinkedIn
          </a>
          <a target="_blank" href="https://www.github.com/alicehccn/">
            <img src="./github.png" />
            Github
          </a>
        </div>
      </div>
      <div className="logo">
        <img src="./logo2.png" alt="logo" />
      </div>
    </div>
  );
};
export default Header;
