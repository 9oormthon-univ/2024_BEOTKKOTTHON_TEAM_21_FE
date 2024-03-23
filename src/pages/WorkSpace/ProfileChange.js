import React, { useState, useEffect } from "react";
import styled from "styled-components";
import MobileStepper from "@mui/material/MobileStepper";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: "Pretendard-Regular";
`;

const NavContainer = styled.div`
  display: flex;
  width: 100%;
  min-height: 10vh;
`;

const ContextContainer = styled.div`
  min-height: 90vh;
`;

const ContextInnerContainer = styled.div`
  display: flex;
  min-height: 80vh;
  flex-direction: column;
  justify-content: space-between;
`;

const NewDivContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 375px;
  height: 75vh;
  border-radius: 25px 25px 0 0;
  /* background-color: gray; */
  background-color: white;
  position: absolute; /* 절대 위치 지정 */
  bottom: 0; /* 아래쪽으로 정렬 */
  box-shadow: 0px -15px 15px -15px rgba(0, 0, 0, 0.5);
  font-family: "Pretendard-Regular";

  @media (max-width: 500px) {
    width: 100vw;
  }
  @media (min-height: 800px) {
    height: 670px;
    gap: 3rem;
  }
`;

// 프로필 이미지 9개 url
const profileImageUrls = [
  "https://teamkrewsbucket.s3.ap-northeast-2.amazonaws.com/TeamKrewsProfileImage/TeamKewsProfileImage2.png",
  "https://teamkrewsbucket.s3.ap-northeast-2.amazonaws.com/TeamKrewsProfileImage/TeamKewsProfileImage3.png",
  "https://teamkrewsbucket.s3.ap-northeast-2.amazonaws.com/TeamKrewsProfileImage/TeamKewsProfileImage4.png",
  "https://teamkrewsbucket.s3.ap-northeast-2.amazonaws.com/TeamKrewsProfileImage/TeamKewsProfileImage1.png",
  "https://teamkrewsbucket.s3.ap-northeast-2.amazonaws.com/TeamKrewsProfileImage/TeamKewsProfileImage5.png",
  "https://teamkrewsbucket.s3.ap-northeast-2.amazonaws.com/TeamKrewsProfileImage/TeamKewsProfileImage7.png",
  "https://teamkrewsbucket.s3.ap-northeast-2.amazonaws.com/TeamKrewsProfileImage/TeamKewsProfileImage9.png",
  "https://teamkrewsbucket.s3.ap-northeast-2.amazonaws.com/TeamKrewsProfileImage/TeamKewsProfileImage6.png",
  "https://teamkrewsbucket.s3.ap-northeast-2.amazonaws.com/TeamKrewsProfileImage/TeamKewsProfileImage8.png",
];

const ProfileCircle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  width: 80px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 100%;
  flex-shrink: 0;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
  cursor: pointer;
`;

const CheckIcon = styled.svg`
  position: absolute;
  width: 24px;
  height: 16px;
  stroke: white;
`;

const BtnContainer = styled.div`
  /*width: 311px;*/
  height: 10vh;
`;

function ProfileChange() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedButtonIndex, setselectedButtonIndex] = useState(null);
  const [profileid, setProfileId] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8]);
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const authToken = localStorage.getItem("authToken");
  const { workspaceUUID } = location.state;

  const handleBack = () => {
    navigate(-1);
  };

  const handleProfileChange = async () => {
    try {
      const response = await axios.patch(
        "http://3.35.236.118:8080/users",
        {
          profileImageUrl: profileImageUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      console.log(response.data);
      // 성공적으로 업데이트되었음을 사용자에게 표시하거나 다른 작업 수행
      // 다시 워크스페이스 홈으로 가는 연결 필요
      console.log("UUID 검토 :", workspaceUUID);
      navigate(`/workspacehome/${workspaceUUID}`);
    } catch (error) {
      console.error("프로필 변경 중 오류가 발생했습니다:", error);
    }
  };

  const handleButtonClick = (index) => {
    setselectedButtonIndex(index);
    setProfileImageUrl(profileImageUrls[index]);
  };

  // 화면 전환 효과
  const transitionVariants = {
    initial: { x: "-0.3vw" }, // 처음 상태를 화면 왼쪽 밖으로 설정
    enter: { x: 0 }, // 첫 번째 단계에서는 화면 중앙으로 이동
    slide: { x: "0.3vw" }, // 두 번째 단계에서는 화면 오른쪽으로 이동
    exit: { x: "-0.3vw" }, // 페이지를 떠날 때 왼쪽으로 슬라이드
  };

  // 각 문장에 대한 fade 효과
  const sentenceVariants = {
    hidden: { opacity: 0.5, y: -10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.7,
      },
    }),
  };

  return (
    <div className="App">
      <Container>
        <motion.div
          animate="enter"
          initial="initial"
          exit="exit"
          variants={transitionVariants}
          transition={{ type: "tween", duration: 0.5 }}
        >
          <NavContainer>
            <button
              className="flex justify-center items-center ml-2 w-10 rounded "
              onClick={handleBack}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="9"
                height="13"
                viewBox="0 0 9 13"
                fill="none"
              >
                <path
                  d="M8 1L1 6.5L8 12"
                  stroke="#878787"
                  stroke-linecap="round"
                />
              </svg>
            </button>
          </NavContainer>
          <ContextContainer className="mx-8">
            <ContextInnerContainer>
              <div>
                <div className="text-lg">
                  <motion.div
                    variants={sentenceVariants}
                    initial="hidden"
                    animate="visible"
                    custom={0}
                  >
                    <p>변경할 프로필 아이콘을</p>
                  </motion.div>
                  <motion.div
                    variants={sentenceVariants}
                    initial="hidden"
                    animate="visible"
                    custom={1}
                  >
                    <p>선택해주세요.</p>
                  </motion.div>
                </div>
              </div>
            </ContextInnerContainer>
          </ContextContainer>
          <NewDivContainer>
            <div className="mx-8 flex flex-col h-full justify-evenly">
              <div className="mt-5 h-full grid grid-cols-3 gap-x-5 items-center justify-items-center hover:origin-top">
                {/* 각 버튼별 선택된 이미지 저장 및 아이콘 어둡게 작업 필요*/}
                {profileid.map((index) => (
                  <button
                    key={index}
                    onClick={() => handleButtonClick(index)}
                    className="hover:animate-bounce"
                  >
                    <ProfileCircle
                      isSelected={selectedButtonIndex === index}
                      style={{
                        backgroundImage: `url(${profileImageUrls[index]})`,
                      }}
                    >
                      {selectedButtonIndex === index && (
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
                    </ProfileCircle>
                  </button>
                ))}
              </div>
              <BtnContainer className="mb-5">
                <button
                  onClick={handleProfileChange}
                  className="w-full rounded-full h-12 border border-primary text-primary bg-white text-sm hover:bg-primary hover:text-white duration-300"
                >
                  선택
                </button>
              </BtnContainer>
            </div>
          </NewDivContainer>
        </motion.div>
      </Container>
    </div>
  );
}
export default ProfileChange;
