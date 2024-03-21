import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import logoImage from "../../assets/logo.png";

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  min-height: 100vh;
  font-family: "Pretendard-Regular";
`;

const Logo = styled.div`
  width: 200px;
  height: 100px;
  background-image: url(${logoImage});

  background-size: contain; /* 100x100으로 크기 조정 */
  background-repeat: no-repeat;
  background-position: center;
`;

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const goToSignUp = () => {
    navigate("/signup");
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const instance = axios.create({
    baseURL: "http://3.35.236.118:8080",
  });

  const handleLogin = async () => {
    try {
      const response = await instance.post("/api/auth/signIn", {
        loginId: username,
        password: password,
      });
      console.log("Response:", response.data);
      // 로그인 토큰 저장 및 유저UUID 저장
      const { authToken, userUUID } = response.data.data;
      console.log("authToken :", authToken);
      console.log("userUUID :", userUUID);
      localStorage.setItem("authToken", authToken);
      localStorage.setItem("userUUID", userUUID);
      // 로그인 성공시 워크스페이스 리스트로 이동
      navigate("/workspacelist");
    } catch (error) {
      console.error("Error:", error.response.data);
    }
  };

  return (
    <div className="App">
      <LoginContainer>
        {/* <div className="max-content w-20 h-20 bg-gray-200"></div> */}
        <div className="flex justify-center items-center -mb-10">
          <Logo></Logo>
        </div>
        <div className="flex flex-col  justify-center items-center my-5 gap-10 text-sm w-2/3">
          <div className="w-full">
            <input
              type="text"
              name="id"
              value={username}
              onChange={handleUsernameChange}
              className="mt-1 px-3 py-2 bg-white border-b shadow-sm  border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full  sm:text-sm focus:ring-1"
              placeholder="아이디"
            />
          </div>
          <div className="w-full">
            <input
              className="mt-1 px-3 py-2 bg-white border-b shadow-sm  border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full  sm:text-sm focus:ring-1"
              id="password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="비밀번호"
            ></input>
          </div>
        </div>
        <div className="inline-grid text-sm bg-primary text-white hover:bg-yellow-500 w-2/3 rounded-full h-12 text-center">
          <button onClick={handleLogin}>로그인</button>
        </div>
        <div className="flex text-xs -mt-8 text-gray-400">
          <a>아이디 찾기</a>
          <div className="mx-2">|</div>
          <a>비밀번호 찾기</a>
        </div>
        <div>
          <div className="flex text-xs gap-10">
            <div className="text-gray-400">아직 회원이 아니신가요?</div>
            <a
              onClick={goToSignUp}
              className="border-b border-primary text-primary cursor-pointer hover:text-sm"
            >
              회원가입
            </a>
          </div>
        </div>
      </LoginContainer>
    </div>
  );
}
export default Login;
