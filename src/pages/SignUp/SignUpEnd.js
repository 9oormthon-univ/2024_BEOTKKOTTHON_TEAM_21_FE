import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Bg from "../../assets/SignupBg.png";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  min-height: 100vh;
  font-family: "Pretendard";

  background-image: url(${Bg});
  background-size: cover;
  background-position: center;
`;

const SplashLogo = styled.div`
  width: 120px;
  height: 120px;
  flex-shrink: 0;
  background: #d9d9d9;
  border-radius: 20px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SplashText = styled.div`
  color: #000;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const ButtonContainer = styled.div`
  width: 85%;
  height: 10vh;
`;

const NavContainer = styled.div`
  display: flex;
  width: 100%;
  min-height: 10vh;
`;

function SignUpEnd() {
  const navigate = useNavigate();
  const goToLogin = () => {
    navigate("/login");
  };
  return (
    <div className="App">
      <Container>
        <NavContainer></NavContainer>

        <div className="-mt-10 flex flex-col items-center w-11/12 text-sm">
          회원가입이 완료되었습니다!
        </div>

        <ButtonContainer className="mb-6">
          <button
            className="w-full mb-5 rounded-full h-12 border border-primary bg-gradient-to-r from-yellow-300 to-red-400 text-white text-sm"
            onClick={goToLogin}
          >
            로그인 하러가기
          </button>
        </ButtonContainer>
      </Container>
    </div>
  );
}
export default SignUpEnd;
