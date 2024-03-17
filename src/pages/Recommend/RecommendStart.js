import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../../components/Navbar";
import styles from "./RecommendStart.module.css"; // CSS 모듈 import
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
  height: 75vh;
  flex-shrink: 0;
  border-radius: 160px 160px 0px 0px;
  /* background: linear-gradient(180deg, #ffd875 0%, #ffa680 100%); */

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
  margin-top: 15vh;
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
  margin-top: 15vh;
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
  width: 108.337px;
  height: 52.695px;
  flex-shrink: 0;
  border-radius: 50px;
  background: #fff;
  animation: ${styles.slidein} 15s linear infinite;
`;

const TeamnameBox2 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 108.337px;
  height: 52.695px;
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

function RecommendStart() {
  const navigate = useNavigate();

  const goToNext = () => {
    navigate("/recommendmiddle");
  };

  return (
    <div className="App">
      <Container>
        <Navbar></Navbar>
        <ContextContainer>
          <TextContainer>
            <div className="text-lg mb-2">
              <b>센스있는 팀명을 추천</b>해드릴게요!
            </div>
            <div className="text-sm text-gray-400">
              팀명은 언제든지 수정할 수 있어요.
            </div>
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
                  className="w-full rounded-full h-12 border  border-primary text-primary bg-white text-sm"
                >
                  팀 이름 추천받기
                </button>
              </BtnContainer>
            </div>
          </GradientContainer>
        </ContextContainer>
      </Container>
    </div>
  );
}
export default RecommendStart;
