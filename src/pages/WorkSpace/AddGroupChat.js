import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import * as W from "../../styles/WorkspaceStyle";
import axios from "axios";
import { GoChevronLeft } from "react-icons/go";
import { BsPencil } from "react-icons/bs";
import { IoCheckmarkSharp } from "react-icons/io5";
import WorkspaceBottom from "../../component/WorkspaceBottom";

const AddGroupChat = () => {
  const { workspaceUUID } = useParams();
  const [workspaceUserList, setWorkspaceUserList] = useState([]);
  const [teamName, setTeamName] = useState("");
  const [collectUserId, setCollectUserId] = useState([]);

  // 워크스페이스 참여
  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    const JoinWorkspace = async () => {
      try {
        const response = await axios.get(`http://3.35.236.118:8080/workspaces/${workspaceUUID}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        const data = response.data.data;
        const teamName = data.teamName;
        const workspaceUserList = data.userInfoResponseList;
        setTeamName(teamName);
        setWorkspaceUserList(workspaceUserList);
      } catch (error) {
        console.error(error);
      }
    };
    JoinWorkspace();
  }, []);


  return (
    <>
     <W.WorkSpaceHomeContainer>
        <WorkspaceTitle />

        <div className="text-center text-black py-5">
          <div className="text-2xl font-bold mb-2">
            단체 채팅방 개설
          </div>
          <div className="text-sm">
            자유롭게 단체 채팅 시크릿 메세지를 보내보세요!
          </div>
        </div>

        <W.PersonGrid>
          {workspaceUserList.map((person) => (
            // 단체 채팅방 개설할 팀원 선택 btn
            <W.PersonSelectEffect 
              isSelected={collectUserId.includes(person.id)}
              className="w-1/2 mb-5"
              onClick={() => {
                // 단체 채팅방 개설한 팀원 선택된 배열
                setCollectUserId((prevIds) => {
                  if (prevIds.includes(person.id)) {
                    // 이미 배열에 포함된 경우 해당 아이디 제거
                    return prevIds.filter((id) => id !== person.id);
                  } else {
                    // 배열에 포함되지 않은 경우 해당 아이디 추가
                    return [...prevIds, person.id];
                  }
                });
              }}
              >
              <PersonBox
                key={person.id}
                person={person}
                workspaceUUID={workspaceUUID}
                collectUserId={collectUserId}
              />
            </W.PersonSelectEffect>
          ))}
        </W.PersonGrid>

        <div className="w-full">
          <W.AddGroupBtn 
            onClick={()=>{console.log('생성하기 클릭 ')}}>
              단체 채팅방 생성하기
          </W.AddGroupBtn>
        </div>


        <WorkspaceBottom
          activeItem={"chat"}
          workspaceUUID={workspaceUUID}
          workspaceUserList={workspaceUserList}
        />
      </W.WorkSpaceHomeContainer> 
    </>
  );
};

export default AddGroupChat;


const PersonBox = ({ person, workspaceUUID, collectUserId }) => {
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

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
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

  // 생성하러 가기에 함수 추가
  const GroupChat = async (person) => {
    const authToken = localStorage.getItem("authToken");

    try {
      const response = await axios.post(`http://3.35.236.118:8080/chatRoom`, {
          workspaceUUID: workspaceUUID,
          userIds: collectUserId,
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
        state: { person: person, workspaceUUID: workspaceUUID },
      }); // 1:1 채팅방 페이지로 이동
    } catch (error) {
      console.error(error);
    }
  };

  const goToProfileEdit = () => {
    navigate("/profilechange");
  };

  return (
    <>
      <div key={person.id}>
        <W.PersonImg onClick={toggleModal}>
          <img className="p-5" src={person.profileImageUrl} alt="" />
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
            </>
          )}
        </div>
      </div>
    </>
  );
};

export const WorkspaceTitle = () => {
  const navigate = useNavigate();

  return (
    <div className="flex p-[20px] text-[18px] text-white">
      <div className="flex items-center">
        <GoChevronLeft
          size={20}
          onClick={() => {
            navigate(-1);
          }}
        />
      </div>
    </div>
  );
};
