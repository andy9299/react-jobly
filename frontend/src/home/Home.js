import React, { useContext } from "react";
import UserContext from "../context/UserContext";
import "./Home.css";

function Home() {
  const { currentUser } = useContext(UserContext);
  return (
    <div className="text-center">
      {currentUser ?
        <div >
          <h1>Welcome {currentUser.username}!</h1>
          <p>{JSON.stringify(currentUser)}</p>
        </div>
        :
        <h1>Please Sign-In or Register</h1>
      }
    </div>
  );
}
export default Home;;