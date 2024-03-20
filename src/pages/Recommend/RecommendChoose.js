import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../../components/Navbar";
import axios from "axios";

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
  // mockdata
  const response2 = {
    success: true,
    code: "200",
    message: "Success",
    data: {
      workspaceUUID: "37ef5ffb-166e-4b2c-b380-0a2780271a42",
      teamName: "testTeam",
      profileImageUrl:
        "https://www.urbanbrush.net/web/wp-content/uploads/edd/2023/02/urban-20230228144115810458.jpg",
      userInfoResponseList: [
        {
          id: "1",
          nickName: "uuujjjeee",
          profileImageUrl:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0sncWCzz9t3udH4HZwqeMQ0nmoSLTQV3ZxOvjIk-m0w&s",
        },
      ],
    },
  };

  const navigate = useNavigate();
  const [selectedTeamName, setSelectedTeamName] = useState("");

  const location = useLocation();
  const teamNames = location.state?.teamNames || [];

  console.log("전달받은 팀명 배열:", teamNames);

  const handleCardClick = (teamName) => {
    setSelectedTeamName(teamName);
  };

  const handleCreateTeam = async () => {
    console.log("선택된 팀 이름:", selectedTeamName);
    if (selectedTeamName !== "") {
      // 로컬 스토리지에서 authToken 가져오기
      const authToken = localStorage.getItem("authToken");
      console.log("authToken :", authToken);

      if (!authToken) {
        // 만약 authToken이 없으면 로그인 페이지로 이동하거나 다른 처리 수행 가능
        console.error("AuthToken이 없습니다.");
        return;
      }
      // 선택된 팀 이름에 대한 개설
      try {
        const response = await axios.post(
          "/workspaces",
          {
            teamName: selectedTeamName,
          },
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        const workspaceUUID = response.data.workspaceUUID;
        // const workspaceUUID = response2.data.workspaceUUID;
        console.log("workspace UUID :", workspaceUUID);
        navigate(`/workspacehome/${workspaceUUID}`);
      } catch (error) {
        console.error("Error creating team:", error);
      }
    } else {
      alert("팀 이름을 선택해주세요!"); // 모달창 따로 만들어도 될듯
    }
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
                {teamNames.map((teamName, index) => (
                  <button key={index} onClick={() => handleCardClick(teamName)}>
                    <Card isSelected={selectedTeamName === teamName}>
                      {selectedTeamName === teamName && (
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
                      <CardinnerText
                        isSelected={selectedTeamName === teamName}
                        className="text-sm"
                      >
                        {teamName}
                      </CardinnerText>
                    </Card>
                  </button>
                ))}
              </CardContainer>

              <BtnContainer className="mb-5">
                <button
                  onClick={handleCreateTeam}
                  className="w-full rounded-full h-12 border border-primary text-primary bg-white text-sm"
                >
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
