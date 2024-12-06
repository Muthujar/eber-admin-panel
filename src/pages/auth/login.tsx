import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { login, loginSuccess } from "../../features/authSlice";
import "./login.scss"; // Import the SCSS file
import { message } from "antd";
// import apiService from "../../constants/apiservice";
// import blogo from "../../assets/icons/beatesoftlogo1.png";
import axios from "axios";
import apiBs from "../../services/apiBs";
import { setCookie } from "../../services/utils";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [eyeShow, seteyeShow] = useState(false);
  const [pType, setpType] = useState("password");
  // const dispatch = useDispatch();

  const handleSubmit = (e:any) => {
    e?.preventDefault();
    let data = {
      salon: 1,
      username: username,
      password: password,
      // account_locked: false
      // mobileAppointment: false,
      account_locked : 0

    };

    if (username==='USER' && password==='123123'){


    let pass={
      token:'12345678',
      role:'USER'  
      // role:'ADMINISTRATOR'
    }

    // dispatch(loginSuccess(pass));
  }

  // else if (username==='SYS' && password==='123123'){
  //   let pass={
  //     token:'12345678',
  //     // role:'USER'  
  //     role:'ADMINISTRATOR'
  //   }
  //   dispatch(loginSuccess(pass));

  // }
else{
  apiBs
  .post("/login", data)
  .then((res:any) => {
    console.log(res);
    if (!res || res.statusText !=='OK') return;
    // dispatch(loginSuccess(res.data.data));
    message.success('login successfull')
    console.log(res.data.data.token)
    setCookie('Token',res.data.data.token,)
    setTimeout(() => window.location.reload(), 500);


  })
  .catch((err:any) => {
    console.log(err, "err");
    let pass =err?.response?.data?.message?? err.message
    return message.error(pass);
  });

}



    // let role

    //   if (username === 'admin') {
    //     role = 'manager';
    //   } else if (username === 'user') {
    //     role = 'user';
    //   }else return message.error('please enter valid username and password')
  };
  // dispatch(login({ username, password }));
  // };

  const handleKeypress = (e:any) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };
  const toggleEyeIcon = () => {
    seteyeShow(!eyeShow);
    if (pType === "password") {
      setpType("text");
    } else {
      setpType("password");
    }
  };

  return (
    <div className="login-page">
      <div className="left-container">
        {/* <img className="blogo" src={blogo}></img> */}
      </div>
      <div className="login-container">
        <div className="login-box">
          <h2 ><span className="!text-[#878a99]">Beautesoft-</span> <span className=" ">Eber</span></h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group pass ">
              <label htmlFor="password">Password</label>
              <input
                type={pType}
                id="password"
                placeholder="Password"
                className=""
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => handleKeypress(e)}
              />
              <span className="pass-eye-icon" onClick={() => toggleEyeIcon()}>
                {eyeShow ? (
                  <i className="fa fa-eye "></i>
                ) : (
                  <i className="fa fa-eye-slash "></i>
                )}
              </span>
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
