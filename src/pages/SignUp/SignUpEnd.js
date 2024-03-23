import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import Navbar from "../../components/Navbar";
import { motion } from "framer-motion";
import CloudBackground from "../../assets/CloudBg.png";
import {GradientButton} from "../../styles/WorkspaceStyle";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: "Pretendard";
  background: linear-gradient(180deg, #ffd875 0%, #ffa680 100%);

  position: relative; /* Add relative positioning */
  overflow: hidden;
`;

const ContextContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  min-height: 90vh;

  position: relative; /* Add relative positioning */
  z-index: 10; /* Ensure content is above GradientContainer */
`;

const ButtonContainer = styled.div`
  width: 311px;
  height: 10vh;
`;

const GradientContainer = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: center;
  width: 500px;
  height: 55vh;
  flex-shrink: 0;
  /* border-radius: 160px 160px 0px 0px; */
  /* background: linear-gradient(180deg, #ffd875 0%, #ffa680 100%); */
  background-image: url(${CloudBackground});
  //background-position: center bottom -15vh;
  background-size: cover;
  z-index: 0; /* Ensure it's behind content */
`;

const TextContainer = styled.div`
  /* margin-left: -80px; */
  display: flex;
  margin-top: 100px;
  flex-direction: column;
  align-items: center;
  margin-left: -63px;
`;

const TeamnameContainer1 = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 60px;
  gap: 19px;
  height: 52.695px;
  flex-shrink: 0;
  filter: drop-shadow(0px 0px 5px rgba(0, 0, 0, 0.25));
`;


const TeamnameBoxMotion = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 99.337px;
  height: 34.695px;
  flex-shrink: 0;
  border-radius: 50px;
  background: #fff;
`;

// 박스 바운스 효과
const animations = [
  {
    y: [0, 10, 0, 20, 0],
    transition: { duration: 3, repeat: Infinity, repeatType: "reverse", delay: 0.1 },
  },
  {
    y: [0, 10, 0, 20, 0],
    transition: { duration: 3, repeat: Infinity, repeatType: "reverse", delay: 0.4 },
  },
  {
    y: [0, 10, 0, 20, 0],
    transition: { duration: 3, repeat: Infinity, repeatType: "reverse", delay: 0.7 },
  },
];

// 화면 전환 효과
const transitionVariants = {
  initial: { x: "-0.3vw" }, // 처음 상태를 화면 왼쪽 밖으로 설정
  enter: { x: 0 }, // 첫 번째 단계에서는 화면 중앙으로 이동
  slide: { x: "0.3vw" }, // 두 번째 단계에서는 화면 오른쪽으로 이동
  exit: { x: "-0.3vw" }, // 페이지를 떠날 때 왼쪽으로 슬라이드
};

// 각 문장에 대한 fade 효과
const sentenceVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.9,
    },
  }),
};

function SignUpEnd() {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/login");
  };

  return (
      <div className="App">
        <Container>
          <motion.div
              initial="initial"
              animate="enter"
              exit="exit"
              variants={transitionVariants}
              transition={{ type: "tween", duration: 0.5 }}
          >
            <Navbar></Navbar>
            <ContextContainer>
              <TextContainer>
                <div className="text-xl mb-2">
                  <motion.div
                      variants={sentenceVariants}
                      initial="hidden"
                      animate="visible"
                      custom={0}
                  >
                  <p className="mb-1">환영합니다!</p>
                  </motion.div>
                  <motion.div
                      variants={sentenceVariants}
                      initial="hidden"
                      animate="visible"
                      custom={1}
                  >
                  <p className="mb-3">회원가입이 완료 되었습니다.</p>
                  </motion.div>
                  <p className="text-sm text-yellow-700">TEAMKREWS와 함께 작업해요!</p>
                </div>
              </TextContainer>
              <GradientContainer>
                <div className="flex flex-col items-center justify-between">
                  <div>
                    <TeamnameContainer1 className="text-xs">
                      {animations.map((animation, index) => (
                          <TeamnameBoxMotion key={index} animate={animation} transition={animation.transition}>
                            {index === 0 && "팀 이름 빌딩"}
                            {index === 1 && "시크릿 피드백"}
                            {index === 2 && "TO DO LIST"}
                          </TeamnameBoxMotion>
                      ))}
                    </TeamnameContainer1>
                  </div>
                  <ButtonContainer className="mb-6">
                    <GradientButton
                        className="w-full mb-5 rounded-full h-12 border border-primary bg-gradient-to-r from-yellow-300 to-red-400 text-white text-sm"
                        onClick={goToLogin}
                    >
                      로그인 하러가기
                    </GradientButton>
                  </ButtonContainer>
                </div>
              </GradientContainer>
            </ContextContainer>
          </motion.div>
        </Container>
      </div>
  );
}
export default SignUpEnd;
