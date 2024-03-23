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
import CompleteTodo from "../Todo/CompleteTodo";
import TeamTodo from "../Todo/TeamTodo";
import MyTodo from "../Todo/MyTodo";

const WorkspaceTodo = () => {
  // 0 -> MYTODO / 1 -> TEAM / 2-> 완료
  const [todoState, SetToDoState] = useState(0);
  const { workspaceUUID } = useParams();

  const toggleToDoState = (state) => {
    SetToDoState(state); // todoState 상태 변경
  };

  

  return (
    <div className="relative">
      <FeedbackTitle toggleToDoState={toggleToDoState} />

      <T.ReceiveBtn active={todoState}>
        {todoState === 0 ? "MY TO DO" : todoState === 1 ? "TEAM" : "완료"}
      </T.ReceiveBtn>

      {/* 투두 리스트 */}
      {todoState === 0 ? (
        // my todo
        <MyTodo workspaceUUID={workspaceUUID} />
      ) : todoState === 1 ? (
        // team todo
        <TeamTodo workspaceUUID={workspaceUUID} />
      ) : (
        // 완료
        <CompleteTodo workspaceUUID={workspaceUUID} />
      )}

      <WorkspaceBottom activeItem={"todo"} workspaceUUID={workspaceUUID} />
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
