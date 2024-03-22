import React, { useState, useEffect } from "react";
import styled from "styled-components";
import MobileStepper from "@mui/material/MobileStepper";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from 'framer-motion';

const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: space-around; */
  /* align-items: center; */
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
  height: 80vh;
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
    height: 600px;
    gap: 3rem;
  }
`;

const ProfileCircle = styled.div`
  display: flex;

  justify-content: center;
  align-items: center;
  height: 100px;
  width: 100px;
  background: ${(props) => (props.isSelected ? "#656565" : "#ACACAC")};
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

const ProfileinnerText = styled.div`
  color: ${(props) => (props.isSelected ? "#ACACAC" : "#000")};
`;

const BtnContainer = styled.div`
  /*width: 311px;*/
  height: 10vh;
`;

function SignUp() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = React.useState(0);
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickName] = useState("");
  const [showNewDiv, setShowNewDiv] = useState(false);
  const [selectedButtonIndex, setselectedButtonIndex] = useState(null);
  const [profileid, setProfileId] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8]);

  const handleNext = () => {
    if (activeStep < 1) {
      // activeStep이 1보다 작을 때만 증가시킴
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    } else {
      navigate(-1); // 다시 로그인 페이지로 이동
    }
  };

  const handleSvgClick = () => {
    setShowNewDiv(true);
  };

  const handleButtonClick = (index) => {
    setselectedButtonIndex(index);
  };

  // const goToSignEnd = () => {
  //   navigate("/signend");
  // };

  const sendData = async () => {
    try {
      const data = {
        email: email,
        loginId: id,
        password: password,
        nickName: nickname,
        profileImageUrl: "", // 임시값, 나중에 선택한 프로필에따른 url로 변경해야함
      };

      const response = await axios.post("/api/auth/signUp", data);

      console.log(response.data);

      navigate("/signend");
    } catch (error) {
      // Handle errors
      console.error("Error:", error);
    }
  };

  // 각 문장에 대한 fade 효과를 정의하는 variants
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

  return (
    <div className="App">
      <SignUpContainer>
        <motion.div
            animate={activeStep === 0 ? 'enter' : 'slide'}
            initial='initial'
            exit='exit'
            variants={{
              initial: { x: '-0.3vw' }, // 처음 상태를 화면 왼쪽 밖으로 설정
              enter: { x: 0 }, // 첫 번째 단계에서는 화면 중앙으로 이동
              slide: { x: '0.3vw' }, // 두 번째 단계에서는 화면 오른쪽으로 이동
              exit: { x: '-0.3vw' } // 페이지를 떠날 때 왼쪽으로 슬라이드
            }}
            transition={{ type: 'tween', duration: 0.5 }} // 부드러운 전환 효과
        >
        {/* NavBar -> Stepper 로직상 로그인이후 NavBar만 컴포넌트로 관리 */}
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
          <div>
            <MobileStepper
              variant="dots"
              steps={2}
              position="static"
              activeStep={activeStep}
              sx={{
                maxWidth: 400,
                flexGrow: 1,
                "& .MuiMobileStepper-dotActive": {
                  backgroundColor: "#FEC533", // Set the color of the active dot
                },
                "& .MuiMobileStepper-dot": {
                  margin: "0 8px", // Adjust the margin between dots
                  width: "10px",
                  height: "10px",
                },
              }}
              className="-ml-3 mb-4"
            />
          </div>
          <ContextInnerContainer>
            {activeStep === 0 ? (
              <div>
                <div className="text-lg">
                  <motion.div
                      variants={sentenceVariants}
                      initial="hidden"
                      animate="visible"
                      custom={0}
                  >
                  <p>안녕하세요!</p>
                  </motion.div>
                  <motion.div
                      variants={sentenceVariants}
                      initial="hidden"
                      animate="visible"
                      custom={1}
                  >
                  <p>아이디와 비밀번호를 설정해주세요.</p>
                  </motion.div>
                </div>
                <div className="mx-2 my-10 flex flex-col gap-11 text-sm">
                  <input
                    type="text"
                    name="id"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    className="mt-1 px-3 py-2 bg-white border-b border-b-gray-500 shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full  xs:text-sm focus:ring-1"
                    placeholder="아이디"
                  />
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 px-3 py-2 bg-white border-b border-b-gray-500 shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full  xs:text-sm focus:ring-1"
                    placeholder="이메일"
                  />
                  <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 px-3 py-2 bg-white border-b border-b-gray-500 shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full  xs:text-sm focus:ring-1"
                    placeholder="비밀번호"
                  />
                </div>
              </div>
            ) : (
              ""
            )}
            {activeStep === 1 ? (
              <div>
                <div className="text-lg">
                  <motion.div
                      variants={sentenceVariants}
                      initial="hidden"
                      animate="visible"
                      custom={0}
                  >
                  <p className="mb-2">나의 프로필을 설정해주세요.</p>
                  </motion.div>
                    <motion.div
                        variants={sentenceVariants}
                        initial="hidden"
                        animate="visible"
                        custom={1}
                    >
                  <p className="text-gray-400 text-sm">
                    프로필은 언제든 변경할 수 있어요!
                  </p>
                    </motion.div>
                </div>
                <div>
                  <div
                    className="flex justify-center my-10 cursor-pointer"
                    onClick={handleSvgClick}
                  >
                    {selectedButtonIndex === null && (
                      <div>
                        <svg
                          width="100"
                          height="100"
                          viewBox="0 0 74 73"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle
                            cx="37"
                            cy="36.5"
                            r="36.149"
                            fill="#D7D7D7"
                            stroke="#FEC533"
                            stroke-width="0.701923"
                          />
                          <circle
                            cx="37"
                            cy="24.8466"
                            r="11.1201"
                            fill="white"
                          />
                          <path
                            d="M16.7222 52.6216C16.7222 44.8684 23.0074 38.5831 30.7606 38.5831H43.2393C50.9925 38.5831 57.2777 44.8684 57.2777 52.6216V54.6972C57.2777 56.6355 55.7064 58.2068 53.7681 58.2068H20.2318C18.2935 58.2068 16.7222 56.6355 16.7222 54.6972V52.6216Z"
                            fill="white"
                          />
                          <circle
                            cx="59.1106"
                            cy="63.524"
                            r="8.77404"
                            fill="#FEC533"
                            stroke="white"
                            stroke-width="1.40385"
                          />
                          <path
                            d="M58.4526 67.1362V63.9446H55.2775V62.6121H58.4526V59.437H59.7851V62.6121H62.9767V63.9446H59.7851V67.1362H58.4526Z"
                            fill="white"
                          />
                        </svg>
                      </div>
                    )}

                    {selectedButtonIndex !== null && (
                      <div>
                        {/* Render the selected profile information */}
                        {/* For example: */}
                        <div>선택된 사진으로 대체할 공간</div>
                        <div>Selected Profile: {selectedButtonIndex + 1}</div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-sm">
                  <input
                    type="text"
                    name="nickname"
                    value={nickname}
                    onChange={(e) => setNickName(e.target.value)}
                    className="mt-1 px-3 py-2 bg-white border-b border-b-gray-500 shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full  xs:text-sm focus:ring-1"
                    placeholder="닉네임"
                  />
                </div>
              </div>
            ) : (
              ""
            )}
            {/* step이 추가되거나 길어지면 배열로 관리해도 괜찮을듯 */}
            {/* <div>{stepsContent[activeStep]}</div> */}

            {activeStep === 1 ? (
              <div>
                {/* stepper 로직상 버튼 컴포넌트는 로그인 이후 사용예정*/}
                {showNewDiv === false ? (
                  <div>
                    <BtnContainer>
                      <button
                        onClick={sendData}
                        className="w-full rounded-full h-12 border border-primary text-primary bg-white text-sm hover:bg-primary hover:text-white duration-300"
                      >
                        완료
                      </button>
                    </BtnContainer>
                  </div>
                ) : (
                  ""
                )}
              </div>
            ) : (
              <div>
                <BtnContainer>
                  <button
                    onClick={handleNext}
                    className="w-full rounded-full h-12 border border-primary text-primary bg-white text-sm hover:bg-primary hover:text-white duration-300"
                  >
                    다음
                  </button>
                </BtnContainer>
              </div>
            )}
          </ContextInnerContainer>
          <div className="mx-6"></div>
        </ContextContainer>
        {showNewDiv === true ? (
          <div>
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
                      <ProfileCircle isSelected={selectedButtonIndex === index}>
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
                        <ProfileinnerText
                          isSelected={selectedButtonIndex === index}
                        >
                          프로필 {index + 1}
                        </ProfileinnerText>
                      </ProfileCircle>
                    </button>
                  ))}
                </div>
                {/* <button
                  className="w-full mb-5 rounded-full h-10 border  border-primary text-primary text-sm bg-white"
                  onClick={() => setShowNewDiv(false)} // 선택 버튼 클릭 시 새로운 div 상자 숨김
                >
                  선택
                </button> */}
                <BtnContainer className="mb-5">
                  <button
                    onClick={() => setShowNewDiv(false)}
                    className="w-full rounded-full h-12 border border-primary text-primary bg-white text-sm hover:bg-primary hover:text-white duration-300"
                  >
                    선택
                  </button>
                </BtnContainer>
              </div>
            </NewDivContainer>
          </div>
        ) : (
          ""
        )}
        </motion.div>
      </SignUpContainer>
    </div>
  );
}
export default SignUp;
