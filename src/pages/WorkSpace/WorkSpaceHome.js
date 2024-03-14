import React, { useState } from 'react';
import styled from "styled-components";
import { images } from '../../utils/images';
import WorkspaceBottom from '../../component/WorkspaceBottom';
import * as W from "../../styles/WorkspaceStyle";

const WorkSpaceHome = () => {
  const people = [
    { userid:1, name: '김구름', image: images.dog },
    { userid:2, name:'김개똥', image: images.dog },
    { userid:3, name:'미르미', image: images.dog },
    { userid:4, name:'구르미', image: images.dog }
  ];

  return (
    <W.WorkSpaceHomeContainer>
      <W.Background></W.Background>
      <div className='text-center pt-10 text-white'>
        <div className='text-2xl font-bold'>00팀의 워크스페이스</div>
        <div className='text-sm mb-5'>자유롭게 1:1 시크릿 메세지를 보내보세요!</div>
      </div>

      <W.PersonGrid>
        {people.map(person => (
          <PersonBox key={person.userid} person={person} />
        ))}
      </W.PersonGrid>

      <WorkspaceBottom activeItem={'home'} />
    </W.WorkSpaceHomeContainer>
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
      <W.Person onClick={toggleModal}>
        <W.PersonImg>
          <img className='p-5' src={person.image} alt="" />
        </W.PersonImg>
        <div>{person.name}</div>

        {isModalOpen && (
        <W.Modal>
          1:1 시크릿 피드백 요청하기
        </W.Modal>
        )}
      </W.Person>
    </>
  );
};
