import React, { useState } from 'react';
import styled from "styled-components";
import { images } from '../../utils/images';
import WorkspaceBottom from '../../component/WorkspaceBottom';
import * as W from "../../styles/WorkspaceStyle";
import { Link, useNavigate } from 'react-router-dom';
import { GoChevronLeft } from "react-icons/go";
import { BsPencil } from "react-icons/bs";
import { IoCheckmarkSharp } from "react-icons/io5";

const WorkSpaceHome = () => {
  const people = [
    { userid:1, name:'김구름', image: images.dog },
    { userid:2, name:'김개똥', image: images.dog },
    { userid:3, name:'미르미', image: images.dog },
    { userid:4, name:'구르미', image: images.dog }
  ];

  return (
    <W.WorkSpaceHomeContainer>
      <W.Background></W.Background>
      <WorkspaceTitle />

      <div className='text-center text-white py-5'>
        <div className='text-2xl font-bold mb-2'>00팀의 워크스페이스</div>
        <div className='text-sm'>자유롭게 1:1 시크릿 메세지를 보내보세요!</div>
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
  const [isEdit, setIsEdit] = useState(false);
  const [name, setName] = useState(person.name);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const HandleEditName = () => {

  }
  return (
    <>
      <W.Person key={person.userid}>
        <W.PersonImg  onClick={toggleModal}>
          <img className='p-5' src={person.image} alt="" />
        </W.PersonImg>

        <div className='flex items-center justify-center'>
          {isEdit ? 
          <div className='flex items-center justify-center'>
            <input className='w-1/2' type="text" value={name} onChange={(e)=>{ setName(e.target.value) }} />
            <IoCheckmarkSharp onClick={()=>{ setIsEdit(false) }} className='ml-2'/>
          </div>:<>
          <span>{name}</span>
          <BsPencil 
            onClick={()=>{ setIsEdit(true) }}
            size={13} className='ml-2'/>
          </>
          }
          
        </div>

        {isModalOpen && (
        <W.Modal>
          <Link to={`/secretFeedback`}>1:1 시크릿 피드백 요청하기</Link>
        </W.Modal>
        )}
      </W.Person>
    </>
  );
};


export const WorkspaceTitle = ()=> {
  const navigate = useNavigate();

  return (
    <div className='flex p-[20px] text-[18px] text-white'>
      <div className='flex items-center'>
        <GoChevronLeft size={20} onClick={()=>{navigate(-1)}}/>
      </div>
    </div>
  )
}