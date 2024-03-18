import { useContext, useEffect } from "react";
import {  NavLink } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function Header() {
  const {setUserInfo,userInfo}=useContext(UserContext);

  useEffect(() => {
    fetch('http://localhost:4000/profile', {
      credentials: 'include',
    })
    .then(response => {response.json()
    .then(userInfo => {
      setUserInfo(userInfo);
    });
  });
  }, []);

  function logout() {
    fetch("http://localhost:4000/logout", {
      credentials: 'include',
      method: 'POST',
    });
    setUserInfo(null);
  }
  const username=userInfo?.username;

  return (
    <header>
      <NavLink to="/" className="logo"> My Blog</NavLink>
      <nav>
        {username ? (
          <>
            <NavLink to="/create" className="nav-link">Create New Post</NavLink>
            <NavLink onClick={logout} className="nav-link">Logout</NavLink>
          </>
        ) : (
          <>
            <NavLink to="/login" className="nav-link">Login</NavLink>
            <NavLink to="/register" className="nav-link">Register</NavLink>
          </>
        )}
      </nav>
    </header>
  );
}
