import React, { useState } from "react";
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
  margin-left: -120px;
`;

const CardContainer = styled.div`
  height: 60vh;
  align-items: center;
  align-content: center;
`;
const Card = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 120px;
  flex-shrink: 0;
  border-radius: 10px;
  background: ${(props) => (props.isSelected ? "#656565" : "#fff")};
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
  cursor: pointer;
`;

const CheckIcon = styled.svg`
  position: absolute;
  width: 24px;
  height: 16px;
  stroke: white;
`;

const CardinnerText = styled.div`
  color: ${(props) => (props.isSelected ? "#ACACAC" : "#000")};
`;

const BtnContainer = styled.div`
  width: 311px;
  height: 10vh;
`;

function RecommendChoose() {
  const navigate = useNavigate();
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);

  const handleCardClick = (index) => {
    setSelectedCardIndex(index);
  };

  const goToNext = () => {
    /* navigate("/"); */
  };

  return (
    <div className="App">
      <Container>
        <Navbar></Navbar>
        <ContextContainer>
          {/* 만약 팀 이름 생성하는데 시간이 걸린다면,
        아래 팀추천 화면을 기다리면서 대체할 화면 필요*/}
          <TextContainer>
            <div className="text-lg mb-2">이런 팀명은 어떠세요?</div>
            <div className="text-sm text-gray-400">
              팀명은 언제든지 수정할 수 있어요.
            </div>
          </TextContainer>
          <GradientContainer>
            <div className="mt-8 flex flex-col items-center justify-between">
              <CardContainer className="grid grid-cols-2 gap-5">
                {[0, 1, 2, 3].map((index) => (
                  <button key={index} onClick={() => handleCardClick(index)}>
                    <Card isSelected={selectedCardIndex === index}>
                      {selectedCardIndex === index && (
                        <CheckIcon
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 23 16"
                          fill="none"
                        >
                          <path
                            d="M1 5.875L9.07692 14L22 1"
                            strokeWidth="3"
                            strokeLinecap="round"
                          />
                        </CheckIcon>
                      )}
                      <CardinnerText isSelected={selectedCardIndex === index}>
                        팀이름{index + 1}
                      </CardinnerText>
                    </Card>
                  </button>
                ))}
              </CardContainer>

              <BtnContainer className="mb-5">
                <button className="w-full rounded-full h-12 border border-primary text-primary bg-white text-sm">
                  팀 생성하기
                </button>
              </BtnContainer>
            </div>
          </GradientContainer>
        </ContextContainer>
      </Container>
    </div>
  );
}
export default RecommendChoose;
