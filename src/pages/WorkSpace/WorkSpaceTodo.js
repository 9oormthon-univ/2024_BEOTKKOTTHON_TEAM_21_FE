import React, { useEffect, useState } from "react";
import WorkspaceBottom from "../../component/WorkspaceBottom";
import { GoChevronLeft } from "react-icons/go";
import { RxHamburgerMenu } from "react-icons/rx";
import * as F from "../../styles/Feedback";
import * as W from "../../styles/WorkspaceStyle";
import * as T from "../../styles/Todo";
import { useNavigate, useParams } from "react-router-dom";
import { images } from "./../../utils/images";
import axios from "axios";

const WorkspaceTodo = () => {
  // 0 -> MYTODO / 1 -> TEAM / 2-> 완료
  const [todoState, SetToDoState] = useState(0);
  const { workspaceUUID } = useParams();
  const [sendData, setSendData] = useState();
  const [receivedData, setReceivedData] = useState();

  const toggleToDoState = (state) => {
    SetToDoState(state); // todoState 상태 변경
  };

  useEffect(() => {
    const ShowTodo = async () => {
      const authToken = localStorage.getItem("authToken");

      const response = await axios.get(`/workspaces/${workspaceUUID}/todo`, {
        params: {
          workspaceUUID: workspaceUUID,
        },
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      console.log(response.data);

      //   try {
      //     if (todoState === 0) {
      //       console.log("받은 피드백");
      //       const response = await axios.get("/chatRoom/received", {
      //         params: {
      //           workspaceUUID: workspaceUUID,
      //         },
      //         headers: {
      //           Authorization: `Bearer ${authToken}`,
      //         },
      //       });
      //       const ReceivedData = response.data.data;
      //       setReceivedData(ReceivedData);
      //       console.log("receivedData", receivedData);
      //     } else if (todoState === 1) {
      //       console.log("보낸 피드백");
      //       const response = await axios.get("/chatRoom/sent", {
      //         params: {
      //           workspaceUUID: workspaceUUID,
      //         },
      //         headers: {
      //           Authorization: `Bearer ${authToken}`,
      //         },
      //       });
      //       const SendData = response.data.data;
      //       setSendData(SendData);
      //       console.log("sendData", sendData);
      //     } else if (todoState === 2) {
      //       // 새로운 상태에 따른 처리
      //       console.log(2);
      //     }
      //   } catch (error) {
      //     console.error(error);
      //   }
    };
    ShowTodo();
  }, [todoState, WorkspaceBottom]);

  return (
    <div className="relative">
      <FeedbackTitle toggleToDoState={toggleToDoState} />

      <T.ReceiveBtn active={todoState}>
        {todoState === 0 ? "MY TO DO" : todoState === 1 ? "TEAM" : "완료"}
      </T.ReceiveBtn>

      {/* 투두 리스트 */}
      {todoState === 0 ? (
        // 받은 피드백
        <F.ReceiveFeedBack>
          <div>hi! This is todolist page</div>
        </F.ReceiveFeedBack>
      ) : todoState === 1 ? (
        // 보낸 피드백
        <F.SendFeedBack>
          <div>hi! This is todolist2 page</div>
        </F.SendFeedBack>
      ) : (
        // 새로운 상태에 따른 화면 처리
        <div>투두 완료리스트 페이지</div>
      )}

      <WorkspaceBottom activeItem={"chat"} workspaceUUID={workspaceUUID} />
    </div>
  );
};

export default WorkspaceTodo;

export const FeedbackTitle = ({ toggleToDoState }) => {
  const navigate = useNavigate();
  const [menuToggle, setMenuToggle] = useState(false);

  return (
    <F.FeedbackTitleBox>
      <div className="flex items-center">
        <GoChevronLeft
          size={20}
          onClick={() => {
            navigate(-1);
          }}
        />
        <div className="ml-2 font-bold">TO DO LIST</div>
      </div>
      <button>
        <RxHamburgerMenu
          onClick={() => {
            setMenuToggle(!menuToggle);
          }}
        />
      </button>
      {menuToggle && (
        <T.Btn className="py-1 absolute top-10 right-3 z-50">
          <div
            onClick={() => {
              toggleToDoState(0);
              setMenuToggle(false);
            }}
            className="px-6 border-[#D7D7D7] border-solid border-b-[1px] hover:text-primary"
          >
            마이 투두리스트
          </div>
          <div
            className="px-6 border-[#D7D7D7] border-solid border-b-[1px] hover:text-primary"
            onClick={() => {
              toggleToDoState(1);
              setMenuToggle(false);
            }}
          >
            팀 투두리스트
          </div>
          <div
            className="px-6 hover:text-primary"
            onClick={() => {
              toggleToDoState(2);
              setMenuToggle(false);
            }}
          >
            완료
          </div>
        </T.Btn>
      )}
    </F.FeedbackTitleBox>
  );
};

export const Feedback = (props) => {
  const navigate = useNavigate();

  const person = {
    nickName: props.data.targetUser.nickName,
    profileImageUrl: props.data.targetUser.profileImageUrl,
  };

  const HandleChatRoom = (props) => {
    console.log("채팅방 입장", props.chatRoomId);
    navigate(`/secretfeedback/${props.data.chatRoomId}`, {
      state: { person: person, workspaceUUID: props.workspaceUUID },
    });
  };

  return (
    <F.FeedbackContainer
      onClick={() => {
        HandleChatRoom(props);
      }}
    >
      <F.FeedbackImg>
        <F.StyledImg
          src={props.data.targetUser.profileImageUrl}
          alt="img"
          active={props.receive}
        />
      </F.FeedbackImg>

      <F.FeedbackContent>
        <div className="flex items-center mb-1">
          <div>{props.data.targetUser.nickName}</div>
          <div className="text-[#acacac] text-[12px] ml-2">{props.time}</div>
        </div>
        <div className="text-[#acacac] text-[15px] text-start">
          {props.content}
        </div>
      </F.FeedbackContent>
    </F.FeedbackContainer>
  );
};
