import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from 'framer-motion';
import Lottie from "lottie-react";
import celebrateLottie from "../../assets/lottie/celebrateLottie.json";
import styled from "styled-components";
import WaveBg from "../../assets/WaveBg.png";
import Logo from "../../assets/rabbit_krew_bg.png";
import ClipboardIcon from "../../assets/clipboard.png";
import {GradientButton} from "../../styles/WorkspaceStyle";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  min-height: 100vh;
  font-family: "Pretendard";

  background-image: url(${WaveBg});
  background-size: cover;
  background-position: center;
`;

const SplashLogo = styled.div`
  width: 165px;
  height: 206px;
  flex-shrink: 0;
  background: #d9d9d9;
  border-radius: 20px;
  background: url(${Logo});
  background-size: contain;
  background-repeat: no-repeat;

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

const LottieContainer = styled.div`
  position: absolute;
  top: -150px;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  z-index: -1;
`;


// 화면 전환 효과
const transitionVariants = {
    initial: { x: '-0.3vw' }, // 처음 상태를 화면 왼쪽 밖으로 설정
    enter: { x: 0 }, // 첫 번째 단계에서는 화면 중앙으로 이동
    slide: { x: '0.3vw' }, // 두 번째 단계에서는 화면 오른쪽으로 이동
    exit: { x: '-0.3vw' } // 페이지를 떠날 때 왼쪽으로 슬라이드
}

// 각 문장에 대한 fade 효과
const sentenceVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.5,
            duration: 0.9,
        },
    }),
};

function RecommendEnd() {
  const navigate = useNavigate();
  const location = useLocation();
  const workspaceUUID = location.state?.workspaceUUID || "";
  const [showCopyNotification, setShowCopyNotification] = useState(false);

  console.log(workspaceUUID);

  const handleHomeButtonClick = () => {
    if (workspaceUUID) {
      navigate(`/workspacehome/${workspaceUUID}`);
    } else {
      console.error("No workspace UUID available");
    }
  };
  const handleCopyToClipboard = () => {
    navigator.clipboard
      .writeText(workspaceUUID)
      .then(() => {
        console.log("Workspace UUID copied to clipboard");
        setShowCopyNotification(true);
        setTimeout(() => {
          setShowCopyNotification(false);
        }, 3000); // 3 seconds
      })
      .catch((err) => {
        console.error("Failed to copy workspace UUID to clipboard:", err);
      });
  };

  return (
    <div className="App">
      <motion.div
          initial='initial'
          animate='enter'
          exit='exit'
          variants={transitionVariants}
          transition={{ type: 'tween', duration: 0.5 }}
      >
      <Container>
        <NavContainer></NavContainer>
        <div className="flex flex-col items-center w-11/12">
          <div className="-mt-10">
              <LottieContainer>
                  <Lottie animationData={celebrateLottie} loop={false} speed={0.2} />
              </LottieContainer>
              <SplashLogo></SplashLogo>
          </div>
            <motion.div
                variants={sentenceVariants}
                initial="hidden"
                animate="visible"
                custom={0}
            >
          <div className="flex flex-col items-center my-8">
            워크스페이스 개설이 완료되었습니다!
          </div>
            </motion.div>
            <motion.div
                variants={sentenceVariants}
                initial="hidden"
                animate="visible"
                custom={1}
            >
          <div className="flex flex-col items-center text-sm">
            <div>
              해당 <b>URL을 복사</b>하여 팀원들에게 공유해주세요!
            </div>
            <div className="flex items-center">
              <b>{workspaceUUID}</b>
              <button
                className="ml-2 cursor-pointer"
                onClick={handleCopyToClipboard}
              >
                <img src={ClipboardIcon} alt="Copy to clipboard" />
              </button>
            </div>
            {showCopyNotification && (
              <div className="absolute top-0 mt-4 bg-gray-400 text-white py-2 px-4 rounded-md transition-opacity duration-500 ease-in-out">
                복사 완료되었습니다!
              </div>
            )}
          </div>
            </motion.div>
        </div>
        <ButtonContainer className="mb-6">
          <GradientButton
            className="w-full mb-5 rounded-full h-12"
            onClick={handleHomeButtonClick}
          >
            홈으로 이동하기
          </GradientButton>
        </ButtonContainer>
      </Container>
      </motion.div>
    </div>
  );
}
export default RecommendEnd;
