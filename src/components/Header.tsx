import '../App.css';


const Header: React.FC = () => {
  
  return (
    <div className="App-header">
      <div className="App-logo">
        <img src="./logo.png" alt="logo"/>
      </div>
      <ul className="menu">
        <li>Home</li>
        <li>Portfolio</li>
        <li>Credentials</li>
      </ul>
    </div>
  );
}
export default Header;
