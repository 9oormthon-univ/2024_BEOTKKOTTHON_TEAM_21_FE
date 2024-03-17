import React from 'react';
import styled from "styled-components";
import { RiHome3Fill } from "react-icons/ri";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { Navigate, useNavigate } from 'react-router-dom';
import * as W from "../styles/WorkspaceStyle";

const WorkspaceBottom = ({activeItem, UUID}) => {
  const navigate = useNavigate();

  return (
    <div>
      <W.BottomContainer>
        <W.BottomContent active={activeItem === 'home'} onClick={()=>{navigate(`/workspacehome/${UUID}`)}}>
          <RiHome3Fill size={20} />
          <span>홈</span>
        </W.BottomContent>

        <W.BottomContent active={activeItem === 'chat'}  onClick={()=>{navigate(`/feedbackstorage/${UUID}`)}}>
          <IoChatbubbleEllipses size={20} />
          <span>채팅</span>
        </W.BottomContent>
      </W.BottomContainer>
    </div>
  );
};

export default WorkspaceBottom;