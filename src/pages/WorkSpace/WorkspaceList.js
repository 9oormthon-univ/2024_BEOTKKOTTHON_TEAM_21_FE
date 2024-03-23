import React from "react";
import * as W from "../../styles/WorkspaceStyle";
import { useEffect, useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
// import { APIClient } from "../../utils/Api";
import axios from "axios";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaCirclePlus } from "react-icons/fa6";
import "../../styles/workspace.css";

const WorkspaceList = () => {
  const PlusIcon = () => (
    <svg
      className="plusIcon"
      width="45"
      viewBox="0 0 40 40"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#ffffff" }} />
          <stop offset="100%" style={{ stopColor: "#ffffff" }} />
        </linearGradient>

        {/* <rect x="0" y="0" width="40" height="40" fill="white" /> */}
      </defs>
      <FaCirclePlus
        className="plusStyle"
        size={40}
        style={{ color: "white" }}
      />
    </svg>
  );

  const navigate = useNavigate();
  const styles = [
    // 워크스페이스 리스트 랜덤 배경 색상
    {
      background: "#B2DAFF",
      boxShadow:
        "0px 0px 50px 0px #77BEFF inset, 0px 0px 5px 0px rgba(0, 0, 0, 0.20)",
    },
    {
      background: "#FFD875",
      boxShadow:
        "0px 0px 50px 0px rgba(254, 197, 51, 0.50) inset, 0px 0px 5px 0px rgba(0, 0, 0, 0.20)",
    },
    {
      background: "#FFBEA1",
      boxShadow:
        "0px 0px 50px 0px rgba(254, 197, 51, 0.50) inset, 0px 0px 5px 0px rgba(0, 0, 0, 0.20);",
    },
    {
      background: "#FFA680",
      boxShadow:
        "0px 0px 50px 0px rgba(254, 197, 51, 0.50) inset, 0px 0px 5px 0px rgba(0, 0, 0, 0.20);",
    },
  ];

  const [workspaceList, setWorkspaceList] = useState([]);
  const [userName, setUserName] = useState("");

  const [plusToggle, setPlusToggle] = useState(false);

  useEffect(() => {
    // 내 워크스페이스 목록 반환
    const authToken = localStorage.getItem("authToken");
    const spaceList = async () => {
      try {
        const response = await axios.get(
          "http://3.35.236.118:8080/userworkspaces",
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        const data = response.data.data;

        const workspaceTeam = data.workspaceInfoList;
        const userName = data.nickName;
        setUserName(userName);
        setWorkspaceList(workspaceTeam);
      } catch (error) {
        console.error(error);
      }
    };

    spaceList();
  }, []);

  // 화면 전환 효과
  const transitionVariants = {
    initial: { x: "-0.3vw" }, // 처음 상태를 화면 왼쪽 밖으로 설정
    enter: { x: 0 }, // 첫 번째 단계에서는 화면 중앙으로 이동
    slide: { x: "0.3vw" }, // 두 번째 단계에서는 화면 오른쪽으로 이동
    exit: { x: "-0.3vw" }, // 페이지를 떠날 때 왼쪽으로 슬라이드
  };

  // 각 문장에 대한 fade 효과
  const sentenceVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.5,
        duration: 0.7,
      },
    }),
  };

  return (
    <motion.div
      initial="initial"
      animate="enter"
      exit="exit"
      variants={transitionVariants}
      transition={{ type: "tween", duration: 0.8 }}
    >
      <div className="relative overflow-hidden">
        <Navbar showBackButton={false}></Navbar>
        <W.Background></W.Background>
        <div className="text-white text-2xl pb-11 mx-auto w-[90%] break-keep">
          <motion.div
            variants={sentenceVariants}
            initial="hidden"
            animate="visible"
            custom={0}
          >
            <p>
              안녕하세요. {userName}님!
              <br />
            </p>
          </motion.div>
          <motion.div
            variants={sentenceVariants}
            initial="hidden"
            animate="visible"
            custom={1}
          >
            <p>
              오늘은 <span className="font-bold">어떤 워크스페이스</span>에
            </p>
          </motion.div>
          <motion.div
            variants={sentenceVariants}
            initial="hidden"
            animate="visible"
            custom={2}
          >
            <p>입장할까요?</p>
          </motion.div>
        </div>
        <div className="w-[350px] relative">
          <button
            onClick={() => {
              setPlusToggle(!plusToggle);
            }}
          >
            <PlusIcon />
          </button>

          {plusToggle && (
            <W.plusBtn className="py-1 absolute bottom-10 right-10">
              <div
                onClick={() => {
                  navigate("/recommendStart");
                }}
                className="px-6 border-[#D7D7D7] border-solid border-b-[1px]"
              >
                새로생성
              </div>
              <div
                className="px-6"
                onClick={() => {
                  navigate("/workspaceEnter");
                }}
              >
                참여하기
              </div>
            </W.plusBtn>
          )}
        </div>

        <W.wsListContainer>
          {workspaceList.map((workspace, index) => {
            const randomStyle = styles[index % styles.length]; // 랜덤 색상 변경
            return (
              <W.wsListBox
                onClick={() => {
                  navigate(`/workspacehome/${workspace.workspaceUUID}`);
                }}
                key={workspace.workspaceUUID}
                style={randomStyle}
              >
                <div className="flex justify-between items-center w-full">
                  <div>{workspace.teamName}</div>
                  <button>
                    <GiHamburgerMenu />
                  </button>
                </div>
                <div className="text-start">{workspace.explanation}</div>
              </W.wsListBox>
            );
          })}
        </W.wsListContainer>
      </div>
    </motion.div>
  );
};

export default WorkspaceList;
