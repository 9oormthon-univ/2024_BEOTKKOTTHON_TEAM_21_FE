import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
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

// 화면 전환 효과
const transitionVariants = {
  initial: { x: "-0.3vw" }, // 처음 상태를 화면 왼쪽 밖으로 설정
  enter: { x: 0 }, // 첫 번째 단계에서는 화면 중앙으로 이동
  slide: { x: "0.3vw" }, // 두 번째 단계에서는 화면 오른쪽으로 이동
  exit: { x: "-0.3vw" }, // 페이지를 떠날 때 왼쪽으로 슬라이드
};

function SignUpEnd() {
  const navigate = useNavigate();
  const goToLogin = () => {
    navigate("/login");
  };
  return (
    <div className="App">
      <motion.div
          initial="initial"
          animate="enter"
          exit="exit"
          variants={transitionVariants}
          transition={{ type: "tween", duration: 0.5 }}
      >
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
      </motion.div>
    </div>
  );
}
export default SignUpEnd;
