import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

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
  min-height: 55vh;
`;

const ContextInnerContainer = styled.div`
  display: flex;
  min-height: 55vh;
  flex-direction: column;
  justify-content: space-between;
`;

const UrlContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 80px;
`;

const BtnContainer = styled.div`
  /*width: 311px;*/
  height: 10vh;
`;

const ErrorText = styled.div`
  color: red;
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
  hidden: { opacity: 0.5, x: -10 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.7,
    },
  }),
};

function WorkSpaceEnter() {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1); // 다시 로그인 페이지로 이동
  };

  const handleJoin = async (url) => {
    const authToken = localStorage.getItem("authToken");
    try {
      const response = await axios.post(`http://3.35.236.118:8080/workspaces/${url}/join`, null, { headers : {
        Authorization: `Bearer ${authToken}`}
      });
      navigate('/workspacelist');
      const data = response.data.data;
    } catch (error) {
      console.error(error);
    }
  }

  const [url, setUrl] = useState("");
  const [joinError, setJoinError] = useState(null);

  const handleJoinWorkspace = async () => {
    try {
      const authToken = localStorage.getItem("authToken");
      console.log("authToken :", authToken);
      const response = await axios.post(`http://3.35.236.118:8080/workspaces/${url}/join`, null, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      console.log(response.data);

      navigate(`/workspacehome/${url}`);   // 팀별 워크스페이스 홈으로 이동

    } catch (error) {
      console.error("Error joining workspace:", error);
      setJoinError("초대코드를 정확히 입력해주세요.");
    }
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
            <div className="text-lg mt-5">
              <motion.div
                  variants={sentenceVariants}
                  initial="hidden"
                  animate="visible"
                  custom={0}
              >
              <p>워크스페이스 참여를 위해</p>
              </motion.div>
                <motion.div
                    variants={sentenceVariants}
                    initial="hidden"
                    animate="visible"
                    custom={1}
                >
              <p>초대코드를 입력해주세요.</p>
                </motion.div>
            </div>

            <UrlContainer className="text-sm mx-5">
              <div>
                <input
                  type="text"
                  name="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="mt-1 px-3 py-2 bg-white border-b border-b-gray-500 shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full  xs:text-sm focus:ring-1"
                  placeholder="URL"
                />
                {joinError && (
                  <ErrorText className="mt-2">{joinError}</ErrorText>
                )}
              </div>

              <button
                className="w-full mb-5 rounded-full h-12 border border-primary bg-primary text-white text-sm hover:bg-yellow-500 duration-200"
                onClick={handleJoinWorkspace}
              >
                워크스페이스 참여
              </button>
            </UrlContainer>
          </ContextInnerContainer>
          <div className="mx-6"></div>
        </ContextContainer>
      </Container>
      </motion.div>
    </div>
  );
}
export default WorkSpaceEnter;
