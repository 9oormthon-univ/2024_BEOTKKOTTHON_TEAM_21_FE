import React from "react";
import * as W from "../../styles/WorkspaceStyle";
import { useEffect, useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
// import { APIClient } from "../../utils/Api";
import axios from "axios";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaCirclePlus } from "react-icons/fa6";
import '../../styles/workspace.css';

const WorkspaceList = () => {
  const PlusIcon = () => (
    <svg className="plusIcon" width='45' viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#FFD875' }} />
          <stop offset="100%" style={{ stopColor: '#FFA680' }} />
        </linearGradient>
      </defs>
      <FaCirclePlus className="plusStyle" size={40} />
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
        const response = await axios.get("/userworkspaces", { headers : {
          Authorization: `Bearer ${authToken}`}
        });
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

  return (
    <div className="relative overflow-hidden">
      <Navbar></Navbar>
      <W.Background></W.Background>
      <div className="text-white text-2xl pb-11 mx-auto w-[90%] break-keep">
        안녕하세요. {userName}님!<br />
        오늘은 <span className="font-bold">어떤 워크스페이스</span>에
        입장할까요?
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
      <div className="w-[375px] relative">
        <button onClick={()=>{setPlusToggle(!plusToggle)}}>
          <PlusIcon />
        </button>

        {plusToggle && (
        <W.plusBtn className='py-1 absolute bottom-10 right-10'>
          <div className="px-6 border-[#D7D7D7] border-solid border-b-[1px]">새로생성</div>
          <div className="px-6">참여하기</div>
        </W.plusBtn>
      )}
      </div>

      
    </div>
  );
};

export default WorkspaceList;
