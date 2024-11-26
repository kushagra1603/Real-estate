import { useContext } from "react";
import SearchBar from "../../components/searchBar/SearchBar";
import "./homePage.scss";
import { AuthContext } from "../../context/AuthContext";

function HomePage() {

  const {currentUser} = useContext(AuthContext)

  return (
    <div className="homePage">
      <div className="textContainer">
        <div className="wrapper">
          <h1 className="title">Your Next Home,<br/> Just a Click Away</h1>
          <p>
          Welcome to PropertyVilla – your trusted real estate partner. Whether you're buying, selling, or renting, we make the process simple and seamless. Start your journey to finding the perfect property today!
          </p>
          <SearchBar />
          <div className="boxes">
            <div className="box">
              <h1>50+</h1>
              <h2>Projects Completed</h2>
            </div>
            <div className="box">
               <h1>5</h1>
               <h2>Industry Awards</h2>
            </div>
            <div className="box">
             <h1>100+</h1>
             <h2>Satisfied Clients</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="imgContainer">
        <img src="/bgm.png" alt="" />
      </div>
    </div>
  );
}

export default HomePage;
