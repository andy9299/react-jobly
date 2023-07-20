import React, { useContext } from "react";
import UserContext from "../context/UserContext";
import "./Home.css";

function Home() {
  const { currentUser } = useContext(UserContext);
  return (
    <div className="text-center">
      {currentUser ?
        <h1>Welcome {currentUser.username}!</h1>
        :
        <h1>Please Sign-In or Register</h1>
      }
    </div>
  );
}
export default Home;;