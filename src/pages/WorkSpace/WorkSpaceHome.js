import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { images } from '../../utils/images';
import WorkspaceBottom from '../../component/WorkspaceBottom';
import * as W from "../../styles/WorkspaceStyle";
import { Link, useNavigate } from 'react-router-dom';
import { GoChevronLeft } from "react-icons/go";
import { BsPencil } from "react-icons/bs";
import { IoCheckmarkSharp } from "react-icons/io5";
import { APIClient } from '../../utils/Api';

const WorkSpaceHome = () => {
  const people = [
    { userid:1, name:'김구름', image: images.dog },
    { userid:2, name:'김개똥', image: images.dog },
    { userid:3, name:'미르미', image: images.dog },
    { userid:4, name:'구르미', image: images.dog }
  ];

  const response = {
      "success": true,
      "code": "200",
      "message": "Success",
      "data": {
          "workspaceUUID": "37ef5ffb-166e-4b2c-b380-0a2780271a42",
          "teamName": "팀크루즈",
          "profileImageUrl": "https://www.urbanbrush.net/web/wp-content/uploads/edd/2023/02/urban-20230228144115810458.jpg",
          "userInfoResponseList": [
              {
                  "id": "1",
                  "nickName": "크루",
                  "profileImageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0sncWCzz9t3udH4HZwqeMQ0nmoSLTQV3ZxOvjIk-m0w&s"
              },
              {
                  "id": "2",
                  "nickName": "루크즈",
                  "profileImageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0sncWCzz9t3udH4HZwqeMQ0nmoSLTQV3ZxOvjIk-m0w&s"
              },
              {
                "id": "3",
                "nickName": "루키즈",
                "profileImageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0sncWCzz9t3udH4HZwqeMQ0nmoSLTQV3ZxOvjIk-m0w&s"
              },
              {
                "id": "3",
                "nickName": "도레미",
                "profileImageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0sncWCzz9t3udH4HZwqeMQ0nmoSLTQV3ZxOvjIk-m0w&s"
              }
          ]
      }
  }

  const data = response.data;
  console.log(data)

  // 워크스페이스 참여
  useEffect(()=>{
    const JoinWorkspace = async () => {
      try {
          // const response = await APIClient().post(`/workspaces/${workspaceUUID}/join`, null);
          // const data = response.data;
          console.log('yet')
      } catch (error) {
          console.error(error);
      }
    }

    JoinWorkspace();
  }, [])

  return (
    <>
    <W.Background></W.Background>
    <W.WorkSpaceHomeContainer>
      <WorkspaceTitle />
  
      <div className='text-center text-white py-5'>
        <div className='text-2xl font-bold mb-2'>{data.teamName}의 워크스페이스</div>
        <div className='text-sm'>자유롭게 1:1 시크릿 메세지를 보내보세요!</div>
      </div>

      <W.PersonGrid>
        {data.userInfoResponseList.map(person => (
          <PersonBox key={person.id} person={person} data={data} />
        ))}
      </W.PersonGrid>
      
      <WorkspaceBottom activeItem={'home'} />
    </W.WorkSpaceHomeContainer>
  </>
  );
};

export default WorkSpaceHome;

const PersonBox = ({ person, data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달창 토글
  const [isEdit, setIsEdit] = useState(false); // 이름 편집 토글
  const [name, setName] = useState(person.nickName);
  const [editProfileState, setEditProfileState] = useState({
    "workspaceId": "워크스페이스 ID",
    "workspaceName": data.teamName,
    "userName": person.nickName,
    "created_at": "워크스페이스 생성 일자"
  })
  
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const EditProfile = (person, data, name) => {
    setIsEdit(false)
    setEditProfileState(prevState => ({
      ...prevState, // 기존 정보 그대로
      userName: name, // 바뀐 이름
    }));

    const HandleEditName = async () => {
      try {
          const response = await APIClient().post(`/workspace/info/${person.id}`, editProfileState);
          const data = response.data;
      } catch (error) {
          console.error(error);
      }
    }

    HandleEditName();
  }
  return (
    <>
      <W.Person key={person.id}>
        <W.PersonImg  onClick={toggleModal}>
          <img className='p-5' src={person.image} alt="" />
        </W.PersonImg>

        <div className='flex items-center justify-center'>
          {isEdit ?
          <div className='flex justify-center items-center w-1/2'>
            <input className='w-full' type="text" value={name} onChange={(e)=>{ setName(e.target.value) }} />
            <IoCheckmarkSharp onClick={()=>{ EditProfile(person, data, name) }} className='ml-2' size={23}/>
          </div> : <>
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