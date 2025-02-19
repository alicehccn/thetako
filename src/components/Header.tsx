import "../App.css";

const Header: React.FC = () => {
  return (
    <div className="App-header">
      <div className="social">
        <img src="./email.png"/>
        <img src="./linkedin.png"/>
        <img src="./github.png"/>
        </div>
      <div className="logo">
        <img src="./logo2.png" alt="logo" />
      </div>
    </div>
  );
};
export default Header;
