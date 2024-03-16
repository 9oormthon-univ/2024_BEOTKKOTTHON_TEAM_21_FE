import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  min-height: 100vh;
  font-family: "Pretendard";
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
  return (
    <div className="App">
      <Container>
        <NavContainer></NavContainer>

        <div className="flex flex-col items-center w-11/12">
          <div>
            <SplashLogo>
              <SplashText>LOGO</SplashText>
            </SplashLogo>
          </div>
          <div className="flex flex-col items-center mt-8">
            <div>Team Krews에 오신 걸</div>
            <div>환영합니다!</div>
          </div>
          <div className="text-xs text-gray-400 my-3">
            팀원들과 함께 즐겁고 알찬 프로젝트를 진행해보아요!
          </div>
        </div>
        <ButtonContainer className="mb-6">
          <button className="w-full mb-5 rounded-full h-12 border border-primary bg-gradient-to-r from-yellow-300 to-red-400 text-white text-sm">
            홈으로 이동하기
          </button>
        </ButtonContainer>
      </Container>
    </div>
  );
}
export default SignUpEnd;
