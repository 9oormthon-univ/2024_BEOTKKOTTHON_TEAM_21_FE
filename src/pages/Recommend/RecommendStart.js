import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../../components/Navbar";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: "Pretendard";

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
  background: linear-gradient(180deg, #ffd875 0%, #ffa680 100%);

  z-index: 0; /* Ensure it's behind content */
`;

const TextContainer = styled.div`
  margin-left: -90px;
`;

const TeamnameContainer1 = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  margin-top: 15vh;
  left: 30%;
  gap: 20px;
  width: 346px;
  height: 52.695px;
  flex-shrink: 0;
  filter: drop-shadow(0px 0px 5px rgba(0, 0, 0, 0.25));
`;

const TeamnameContainer2 = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  margin-top: 30vh;
  right: 30%;
  gap: 20px;
  width: 346px;
  height: 52.695px;
  flex-shrink: 0;
  filter: drop-shadow(0px 0px 5px rgba(0, 0, 0, 0.25));
`;

const TeamnameBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 104.414px;
  height: 52.695px;
  flex-shrink: 0;
  border-radius: 50px;
  background: #fff;
`;

const BtnContainer = styled.div`
  position: absolute;
  bottom: 30px;
  width: 311px;
`;

function RecommendStart() {
  return (
    <div className="App">
      <Container>
        <Navbar></Navbar>
        <ContextContainer>
          <TextContainer>
            <div className="text-lg mb-2">
              우리 팀의 <b>팀명을 추천</b>해드릴게요!
            </div>
            <div className="text-sm text-gray-400">
              팀명은 언제든지 수정할 수 있어요.
            </div>
          </TextContainer>
          <GradientContainer>
            <div>
              <TeamnameContainer1 className="text-sm">
                <TeamnameBox>Team Krews</TeamnameBox>
                <TeamnameBox>푸바오</TeamnameBox>
                <TeamnameBox>Team2</TeamnameBox>
              </TeamnameContainer1>
              <TeamnameContainer2 className="text-sm">
                <TeamnameBox>옴뇸뇸</TeamnameBox>
                <TeamnameBox>팀이름</TeamnameBox>
                <TeamnameBox>스폰지밥</TeamnameBox>
              </TeamnameContainer2>
            </div>

            <BtnContainer>
              <button className="mb-5 w-full rounded-full h-12 border  border-primary text-primary bg-white text-sm">
                팀 이름 추천받기
              </button>
            </BtnContainer>
          </GradientContainer>
        </ContextContainer>
      </Container>
    </div>
  );
}
export default RecommendStart;
