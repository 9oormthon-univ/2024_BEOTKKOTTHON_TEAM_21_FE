import React, { useState } from 'react';
import styled from "styled-components";
import { images } from '../../utils/images';
import WorkspaceBottom from '../../component/WorkspaceBottom';

const WorkSpaceHomeContainer = styled.div`
`;

const Background = styled.div`
  position: absolute;
  z-index: -1;
  min-width: 375px;
  height: 250px;
  border-radius: 0px 0px 50px 50px;
  background: linear-gradient(180deg, #FFD875 0%, #FFA680 100%);
  flex-shrink: 0;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);
`;
const PersonGrid = styled.div`
  margin: 0 auto;
  width: 90%;
  display: flex;
  flex-wrap: wrap;
`;
const Person = styled.div`
  position: relative;
  width: 50%;
  text-align: center;
  margin: 15px 0 15px 0;
`;
const PersonImg = styled.div` 
  margin: 0 auto;
  width: 130px;
  height: 130px;
  border-radius: 50%;
  border: 1px solid #D9D9D9;
  margin-bottom: 10px;
`;
const Modal = styled.div`
  position: absolute;
  width: 138.575px;
  height: 29.447px;
  border-radius: 8.661px;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.20);
  background: linear-gradient(93deg, #FFD875 0%, #FFA680 96.72%);
  flex-shrink: 0;
  color: #FFF;
  font-family: Pretendard;
  font-size: 10px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  padding: 8px;
  text-align: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;


const WorkSpaceHome = () => {
  const people = [
    { userid:1, name: '김구름', image: images.dog },
    { userid:2, name:'김개똥', image: images.dog },
    { userid:3, name:'미르미', image: images.dog },
    { userid:4, name:'구르미', image: images.dog }
  ];

  return (
    <WorkSpaceHomeContainer>
      <Background></Background>
      <div className='text-center pt-10 text-white'>
        <div className='text-2xl font-bold'>00팀의 워크스페이스</div>
        <div className='text-sm mb-5'>자유롭게 1:1 시크릿 메세지를 보내보세요!</div>
      </div>

      <PersonGrid>
        {people.map(person => (
          <PersonBox key={person.userid} person={person} />
        ))}
      </PersonGrid>

      <WorkspaceBottom activeItem={'home'} />
    </WorkSpaceHomeContainer>
  );
};

export default WorkSpaceHome;

const PersonBox = ({ person }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <Person onClick={toggleModal}>
        <PersonImg>
          <img className='p-5' src={person.image} alt="" />
        </PersonImg>
        <div>{person.name}</div>

        {isModalOpen && (
        <Modal>
          1:1 시크릿 피드백 요청하기
        </Modal>
        )}
      </Person>
    </>
  );
};
