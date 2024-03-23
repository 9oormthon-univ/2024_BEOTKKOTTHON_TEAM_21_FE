import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../../components/Navbar";
import { motion } from "framer-motion";
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

  position: relative;
  z-index: 10;
`;

const GradientContainer = styled(motion.div)`
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
  background: ${(props) => (props.isSelected ? "#a38658" : "#fff")};
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
  color: ${(props) => (props.isSelected ? "#000000" : "#4a4a4a")};
`;

const BtnContainer = styled.div`
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

// 아래 그라데이션 컨테이너 바운스 효과
const containerVariants = {
  hidden: {
    y: '100vh',
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 80,
      damping: 20,
      mass: 1,
      duration: 1.3,
    }
  }
};


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
          "http://3.35.236.118:8080/workspaces",
          {
            teamName: selectedTeamName,
            profileImageUrl:
              "https://www.urbanbrush.net/web/wp-content/uploads/edd/2023/02/urban-20230228144115810458.jpg",
            explanation: `${selectedTeamName} 팀입니다`,
            // profileImageUrl, explanation은 임의의 값으로 설정
          },
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        console.log(response.data);
        const workspaceUUID = response.data.data.workspaceUUID;
        // const workspaceUUID = response2.data.workspaceUUID;
        console.log("workspace UUID :", workspaceUUID);
        navigate("/recommendend", { state: { workspaceUUID: workspaceUUID } });
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
      <motion.div
          initial="initial"
          animate="enter"
          exit="exit"
          variants={transitionVariants}
          transition={{ type: "tween", duration: 0.8 }}
      >
      <Container>
        <Navbar></Navbar>
        <ContextContainer>
          {/* 만약 팀 이름 생성하는데 시간이 걸린다면,
        아래 팀추천 화면을 기다리면서 대체할 화면 필요*/}
          <TextContainer>
            <motion.div
                variants={sentenceVariants}
                initial="hidden"
                animate="visible"
                custom={0}
            >
            <div className="text-lg mb-2">이런 팀명은 어떠세요?</div>
            </motion.div>
            <motion.div
                variants={sentenceVariants}
                initial="hidden"
                animate="visible"
                custom={1}
            >
            <div className="text-sm text-gray-400">
              팀명은 언제든지 수정할 수 있어요.
            </div>
            </motion.div>
          </TextContainer>
          <GradientContainer
              initial="hidden"
              animate="visible"
              variants={containerVariants}
          >
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
      </motion.div>
    </div>
  );
}
export default RecommendChoose;
