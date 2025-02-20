import "../App.css";

const Header: React.FC = () => {
  return (
    <div className="App-header">
      <div className="social">
      <a href="mailto:alicehccn@gmail.com"><img src="./email.png"/></a>
        <a target="_blank" href="https://www.linkedin.com/in/alicehccn/"><img src="./linkedin.png"/></a>
        <a target="_blank" href="https://www.github.com/alicehccn/"><img src="./github.png"/></a>
        </div>
      <div className="logo">
        <img src="./logo2.png" alt="logo" />
      </div>
    </div>
  );
};
export default Header;
