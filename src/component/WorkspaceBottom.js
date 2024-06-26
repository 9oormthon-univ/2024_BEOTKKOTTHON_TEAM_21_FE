import React from "react";
import styled from "styled-components";
import { RiHome3Fill } from "react-icons/ri";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { HiMiniClipboard } from "react-icons/hi2";
import { Navigate, useNavigate } from "react-router-dom";
import * as W from "../styles/WorkspaceStyle";

const WorkspaceBottom = ({ activeItem, workspaceUUID }) => {
  const navigate = useNavigate();

  return (
    <div>
      <W.BottomContainer>
        <W.BottomContent
          active={activeItem === "todo"}
          onClick={() => {
            navigate(`/todo/${workspaceUUID}`);
          }}
        >
          <HiMiniClipboard size={20} />
          <span>TO DO</span>
        </W.BottomContent>

        <W.BottomContent
          active={activeItem === "home"}
          onClick={() => {
            navigate(`/workspacehome/${workspaceUUID}`);
          }}
        >
          <RiHome3Fill size={20} />
          <span>홈</span>
        </W.BottomContent>

        <W.BottomContent
          active={activeItem === "chat"}
          onClick={() => {
            navigate(`/feedbackstorage/${workspaceUUID}`);
          }}
        >
          <IoChatbubbleEllipses size={20} />
          <span>채팅</span>
        </W.BottomContent>
      </W.BottomContainer>
    </div>
  );
};

export default WorkspaceBottom;
