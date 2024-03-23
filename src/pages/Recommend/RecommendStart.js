import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../../components/Navbar";
import { motion } from "framer-motion";
import styles from "./RecommendStart.module.css"; // CSS 모듈 import
import CloudBackground from "../../assets/CloudBg.png";

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
  flex-direction: column;
  align-items: center;
`;

const TeamnameContainer1 = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: -10%;
  margin-left: 100px;
  gap: 20px;
  width: 346px;
  height: 52.695px;
  flex-shrink: 0;
  filter: drop-shadow(0px 0px 5px rgba(0, 0, 0, 0.25));
`;

const TeamnameContainer2 = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 3.5vh;
  margin-right: 100px;
  gap: 20px;
  width: 346px;
  height: 52.695px;
  flex-shrink: 0;
  filter: drop-shadow(0px 0px 5px rgba(0, 0, 0, 0.25));

  /* overflow: hidden; */
`;

const TeamnameBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 115.337px;
  height: 40.695px;
  flex-shrink: 0;
  border-radius: 50px;
  background: #fff;
  animation: ${styles.slidein} 15s linear infinite;
`;

const TeamnameBox2 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 115.337px;
  height: 40.695px;
  flex-shrink: 0;
  border-radius: 50px;
  background: #fff;
  animation: ${styles.slidein2} 15s linear infinite;
`;

const BtnContainer = styled.div`
  /* position: absolute; */
  /* bottom: 30px; */
  width: 311px;
  height: 10vh;
`;

// 화면 전환 효과
const transitionVariants = {
  initial: { x: "-0.3vw" }, // 처음 상태를 화면 왼쪽 밖으로 설정
  enter: { x: 0 }, // 첫 번째 단계에서는 화면 중앙으로 이동
  slide: { x: "0.3vw" }, // 두 번째 단계에서는 화면 오른쪽으로 이동
  exit: { x: "-0.3vw" }, // 페이지를 떠날 때 왼쪽으로 슬라이드
};

// 각 문장에 대한 fade 효과
const sentenceVariants = {
  hidden: { opacity: 0.5, x: -30 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.7,
    },
  }),
};

function RecommendStart() {
  const navigate = useNavigate();

  const goToNext = () => {
    navigate("/recommendmiddle");
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
              <motion.div
                  variants={sentenceVariants}
                  initial="hidden"
                  animate="visible"
                  custom={0}
              >
              <div className="text-lg mb-2">
                <b>센스있는 팀명을 추천</b>해드릴게요!
              </div>
              </motion.div>
              <motion.div
                  variants={sentenceVariants}
                  initial="hidden"
                  animate="visible"
                  custom={1}
              >
              <div className="text-sm text-black/50">
                팀명은 언제든지 수정할 수 있어요.
              </div>
              </motion.div>
            </TextContainer>
            <GradientContainer>
              <div className="flex flex-col items-center justify-between">
                <div>
                  <TeamnameContainer1 className="text-sm">
                    <TeamnameBox>🛥️ 팀 크루즈</TeamnameBox>
                    <TeamnameBox>🚗 아우디</TeamnameBox>
                    <TeamnameBox>☁️ 구름톤</TeamnameBox>
                    <TeamnameBox2>🛥️ 팀 크루즈</TeamnameBox2>
                    <TeamnameBox2>🚗 아우디</TeamnameBox2>
                    <TeamnameBox2>☁️ 구름톤</TeamnameBox2>
                  </TeamnameContainer1>
                  <TeamnameContainer2 className="text-sm">
                    <TeamnameBox>🫠 미르미네</TeamnameBox>
                    <TeamnameBox>🍫 카카오</TeamnameBox>
                    <TeamnameBox>🐣 햇병아리</TeamnameBox>
                    <TeamnameBox2>🫠 미르미네</TeamnameBox2>
                    <TeamnameBox2>🍫 카카오</TeamnameBox2>
                    <TeamnameBox2>🐣 햇병아리</TeamnameBox2>
                  </TeamnameContainer2>
                </div>
                <BtnContainer className="mb-5">
                  <button
                    onClick={goToNext}
                    className="w-full rounded-full h-12 border  border-primary text-primary bg-white text-sm hover:bg-yellow-400 hover:text-white duration-300"
                  >
                    팀 이름 추천받기
                  </button>
                </BtnContainer>
              </div>
            </GradientContainer>
          </ContextContainer>
        </motion.div>
      </Container>
    </div>
  );
}
export default RecommendStart;
