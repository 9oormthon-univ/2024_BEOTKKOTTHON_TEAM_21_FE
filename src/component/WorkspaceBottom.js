import React from 'react';
import styled from "styled-components";
import { RiHome3Fill } from "react-icons/ri";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { Navigate, useNavigate } from 'react-router-dom';

const BottomContainer = styled.div`
  width: 375px;
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0);
  display: flex;
  height: 55px;
  text-align: center;
  border-top: 1px solid #D7D7D7;
`;
const BottomContent = styled.button`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items:center;
  font-size: 13px;
  color: ${props => props.active ? '#FEC533' : '#d7d7d7'};
`;

const WorkspaceBottom = ({activeItem}) => {
  const navigate = useNavigate();

  return (
    <div>
      <BottomContainer>
        <BottomContent active={activeItem === 'home'} onClick={()=>{navigate('/workspacehome')}}>
          <RiHome3Fill size={20} />
          <span>홈</span>
        </BottomContent>

        <BottomContent active={activeItem === 'chat'}  onClick={()=>{navigate('/feedbackstorage')}}>
          <IoChatbubbleEllipses size={20} />
          <span>채팅</span>
        </BottomContent>
      </BottomContainer>
    </div>
  );
};

export default WorkspaceBottom;