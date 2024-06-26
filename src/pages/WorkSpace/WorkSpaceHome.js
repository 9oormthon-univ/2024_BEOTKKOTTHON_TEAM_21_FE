import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { images } from "../../utils/images";
import WorkspaceBottom from "../../component/WorkspaceBottom";
import * as W from "../../styles/WorkspaceStyle";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { GoChevronLeft } from "react-icons/go";
import { BsPencil } from "react-icons/bs";
import { IoCheckmarkSharp } from "react-icons/io5";
import YellowPlusBtn from "../../assets/plus-yellow.png";
import { IoIosLink } from "react-icons/io";
import axios from "axios";

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
      delay: i * 0.3,
      duration: 0.9,
    },
  }),
};

const IconContainer = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 4px;
  border-radius: 25%;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(111, 106, 103, 0.39);
  }
`;

const containerVariants = {
  hidden: {
    y: '-10vh',
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

const WorkSpaceHome = () => {
  const { workspaceUUID } = useParams();
  const [workspaceUserList, setWorkspaceUserList] = useState([]);
  const [teamName, setTeamName] = useState("");

  // 워크스페이스 참여
  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    const JoinWorkspace = async () => {
      try {
        const response = await axios.get(
          `http://3.35.236.118:8080/workspaces/${workspaceUUID}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        const data = response.data.data;
        const teamName = data.teamName;
        const workspaceUserList = data.userInfoResponseList;
        setTeamName(teamName);
        setWorkspaceUserList(workspaceUserList);
        console.log(workspaceUserList);
      } catch (error) {
        console.error(error);
      }
    };
    JoinWorkspace();
  }, []);

  return (
    <>
      <W.Background2
          initial="hidden"
          animate="visible"
          variants={containerVariants}>
        <motion.div
            initial="initial"
            animate="enter"
            exit="exit"
            variants={transitionVariants}
            transition={{ type: "tween", duration: 0.5 }}
        >
        <W.WorkSpaceHomeContainer>
          <WorkspaceTitle />

          <div className="text-center text-white py-5">
            <motion.div
                variants={sentenceVariants}
                initial="hidden"
                animate="visible"
                custom={0}
            >
            <div className="text-xl font-bold mb-2">
              {teamName} 팀의 워크스페이스
            </div>
            </motion.div>
            <motion.div
                variants={sentenceVariants}
                initial="hidden"
                animate="visible"
                custom={1}
            >
            <div className="text-sm">
              자유롭게 1:1 시크릿 메세지를 보내보세요!
            </div>
            </motion.div>
          </div>

          <W.PersonGrid>
            {workspaceUserList.map((person) => (
              <PersonBox
                key={person.id}
                person={person}
                workspaceUUID={workspaceUUID}
              />
            ))}
          </W.PersonGrid>
        </W.WorkSpaceHomeContainer>
      </motion.div>
      </W.Background2>
      <WorkspaceBottom
          activeItem={"home"}
          workspaceUUID={workspaceUUID}
          workspaceUserList={workspaceUserList}
      />
      {/*<W.Background></W.Background> */}
    </>
  );
};

export default WorkSpaceHome;

const PersonBox = ({ person, workspaceUUID }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달창 토글
  const [isEdit, setIsEdit] = useState(false); // 이름 편집 토글
  const [name, setName] = useState(person.nickName);
  const [editProfileState, setEditProfileState] = useState({
    workspaceId: "",
    workspaceName: "",
    userName: "",
    created_at: "워크스페이스 생성 일자",
  });

  const [isWorkspace, setIsWorkspace] = useState([]);

  // ---------- 사용자 인식하여 편집부여 권한 ----------
  const userUUID = localStorage.getItem("userUUID");
  useEffect(() => {
    console.log("person :", person);
    console.log(person.userUUID);
    // 로컬 스토리지의 토큰과 사용자의 userUUID를 비교하여 일치하면 버튼을 표시
    if (userUUID === person.userUUID) {
      setIsWorkspace(true);
    } else {
      setIsWorkspace(false);
    }
  }, [userUUID, person.userUUID]);
  // --------------------------------------------

  const toggleModal = () => {
    if (userUUID !== person.userUUID) {
      setIsModalOpen(!isModalOpen); // 다른 경우에만 모달 토글
    }
  };

  const EditProfile = async (person, name) => {
    setIsEdit(false);
    setEditProfileState((prevState) => ({
      ...prevState, // 기존 정보 그대로
      userName: name, // 바뀐 이름
    }));

    const authToken = localStorage.getItem("authToken");
    try {
      const response = await axios.patch(
        `http://3.35.236.118:8080/users`,
        {
          nickName: name, // 변경된 닉네임
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      console.log(response.data);
      // 변경된 닉네임을 화면에 반영
      setName(name);

      // 성공적으로 업데이트되었음을 사용자에게 표시하거나 다른 작업 수행
      // console.log("닉네임이 성공적으로 변경되었습니다.");
    } catch (error) {
      console.error("닉네임 변경 중 오류가 발생했습니다:", error);
    }
  };

  const OneToOneChat = async (person) => {
    const authToken = localStorage.getItem("authToken");

    try {
      const response = await axios.post(
        `http://3.35.236.118:8080/chatRoom`,
        {
          workspaceUUID: workspaceUUID,
          userIds: [person.id],
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      const data = response.data.data;
      const chatRoomId = data.chatRoomId;

      setIsWorkspace((prevData) => [
        ...prevData,
        { [workspaceUUID + person.id]: chatRoomId },
      ]);

      console.log(isWorkspace);

      navigate(`/secretfeedback/${chatRoomId}`, {
        state: { person: person, workspaceUUID: workspaceUUID, receive: false },
      }); // 1:1 채팅방 페이지로 이동
    } catch (error) {
      console.error(error);
    }
  };

  const goToProfileEdit = () => {
    navigate("/profilechange", { state: { workspaceUUID: workspaceUUID } });
  };

  return (
    <>
      <W.Person key={person.id}>
        <W.PersonImg onClick={toggleModal}>
          <img className="p-5" src={person.profileImageUrl} alt="" />
          {isWorkspace && <W.YellowPlusButton onClick={goToProfileEdit} />}
        </W.PersonImg>

        <div className="flex items-center justify-center">
          {/* 편집 권한 본인일 때만 가능하도록 추가 구현 필요 */}
          {isEdit ? (
            <div className="flex justify-center items-center w-1/2">
              <input
                className="w-full"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <IoCheckmarkSharp
                onClick={() => {
                  EditProfile(person, name);
                }}
                className="ml-2"
                size={23}
              />
            </div>
          ) : (
            <>
              <span>{name}</span>
              {isWorkspace && (
                <BsPencil
                  onClick={() => {
                    setIsEdit(true);
                  }}
                  size={13}
                  className="ml-2"
                />
              )}
            </>
          )}
        </div>

        {isModalOpen && (
          <W.Modal>
            <button
              onClick={() => {
                OneToOneChat(person);
              }}
            >
              1:1 시크릿 피드백 요청하기
            </button>
          </W.Modal>
        )}
      </W.Person>
    </>
  );
};

export const WorkspaceTitle = () => {
  const navigate = useNavigate();
  const { workspaceUUID } = useParams();
  const [showCopyNotification, setShowCopyNotification] = useState(false);

  const handleCopyToClipboard = () => {
    // 클립보드에 복사할 텍스트 선택
    const textToCopy = workspaceUUID;
    // 클립보드에 복사할 텍스트를 선택
    const textArea = document.createElement("textarea");
    textArea.value = textToCopy;
    document.body.appendChild(textArea);
    textArea.select();
    // 복사 명령 실행
    document.execCommand("copy");
    // 임시 textarea 제거
    document.body.removeChild(textArea);
    // 복사 알림 표시
    setShowCopyNotification(true);
    setTimeout(() => {
      setShowCopyNotification(false);
    }, 3000); // 3초 후 알림 숨김
  };

  return (
    <div className="flex p-[20px] text-[18px] text-white justify-between">
      <div className="flex items-center cursor-pointer">
        <GoChevronLeft
          size={20}
          onClick={() => {
            navigate("/workspacelist");
          }}
        />
      </div>
      <IconContainer onClick={handleCopyToClipboard}>
        <IoIosLink
          size={20}
          className="cursor-pointer"
        />
      </IconContainer>
      {showCopyNotification && (
        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-500 text-white py-2 px-4 rounded-md transition-opacity duration-500 ease-in-out text-sm">
          워크스페이스 초대코드 복사 완료!
        </div>
      )}
    </div>
  );
};
