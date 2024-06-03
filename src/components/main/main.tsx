import React, { useEffect, useState } from "react";
import { Avatar } from "antd";
import { useCookies } from "react-cookie";
import { useNavigate, Outlet } from "react-router-dom";
import { SIGN_IN_TOKEN_COOKIE } from "../../common/constants";
import { decodeJwtToken } from "../../common/utility";
import { JwtPayload } from "../../interfaces/user.interface";

const Main: React.FC = () => {
  const [cookie, setCookie , removeCookie] = useCookies([SIGN_IN_TOKEN_COOKIE]);
  const [user, setUser] = useState<JwtPayload | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!cookie || !cookie[SIGN_IN_TOKEN_COOKIE]) {
      setUser(null)
      navigate("/signin");
    } else if (cookie[SIGN_IN_TOKEN_COOKIE]) {
      const userInfo = decodeJwtToken(cookie[SIGN_IN_TOKEN_COOKIE]);
      setUser(userInfo);
      navigate("/home");
    }
  }, [cookie]);

  const singout = () => {
    removeCookie(SIGN_IN_TOKEN_COOKIE)
  }

  return (
    <div className="App">
      <div className="header" style={{display: 'inline-flex', alignItems: 'center'}}>
        <h1 style={{width: '800px'}}>Easy Generator</h1>
        {user && <Avatar
          style={{ backgroundColor: "#f56a00", verticalAlign: "middle" }}
          size="large"
          gap={4}
        >
          {user?.name.charAt(0).toLocaleUpperCase()}
        </Avatar>}
        {user && <a style={{marginLeft: '5px'}} href="" onClick={singout}>Sign Out</a>}
      </div>
      <hr />
      <Outlet />
    </div>
  );
};

export default Main;
