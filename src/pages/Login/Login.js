import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  min-height: 100vh;
  font-family: "Pretendard-Regular";
`;

const Logo = styled.div`
  width: 100px;
  height: 100px;
  background: #d9d9d9;
`;

function Login() {
  const navigate = useNavigate();

  const goToSignUp = () => {
    navigate("/signup");
  };

  return (
    <div className="App">
      <LoginContainer>
        {/* <div className="max-content w-20 h-20 bg-gray-200"></div> */}
        <div className="flex justify-center items-center">
          <Logo></Logo>
        </div>
        <div className="flex flex-col  justify-center items-center my-5 gap-10 text-sm w-2/3">
          <div className="w-full">
            {/* <input
              class="appearance-none border-b rounded w-full py-2 px-3 text-gray-700 leading-tight focus:border-sky-500 focus:ring-sky-400 focus:ring-1 focus:shadow-outline "
              id="username"
              type="text"
              placeholder="아이디"
            ></input> */}
            <input
              type="text"
              name="id"
              class="mt-1 px-3 py-2 bg-white border-b shadow-sm rounded-md border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full  sm:text-sm focus:ring-1"
              placeholder="아이디"
            />
          </div>
          <div className="w-full">
            <input
              class="mt-1 px-3 py-2 bg-white border-b shadow-sm rounded-md border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full  sm:text-sm focus:ring-1"
              id="password"
              type="password"
              placeholder="비밀번호"
            ></input>
          </div>
        </div>
        <div className="inline-grid text-sm bg-gray-300 hover:bg-gray-400 w-2/3 rounded-full h-10 text-center">
          <button>로그인</button>
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
              className="border-b border-gray-400 cursor-pointer"
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
