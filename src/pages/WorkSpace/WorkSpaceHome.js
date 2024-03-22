import React, { useState, useEffect,createContext, useContext } from 'react';
import styled from "styled-components";
import { images } from '../../utils/images';
import WorkspaceBottom from '../../component/WorkspaceBottom';
import * as W from "../../styles/WorkspaceStyle";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { GoChevronLeft } from "react-icons/go";
import { BsPencil } from "react-icons/bs";
import { IoCheckmarkSharp } from "react-icons/io5";
import axios from "axios";

const WorkspaceContext = createContext();

const WorkSpaceHome = () => {
  const { workspaceUUID } = useParams();
  const [ workspaceUserList, setWorkspaceUserList] = useState([]);
  const [teamName, setTeamName] = useState("");

  // 워크스페이스 참여
  useEffect(()=>{
    const authToken = localStorage.getItem("authToken");
    const JoinWorkspace = async () => {
      try {
          const response = await axios.get(`/workspaces/${workspaceUUID}`, { headers : {
            Authorization: `Bearer ${authToken}`}
          });
          const data = response.data.data;
          const teamName = data.teamName;
          const workspaceUserList = data.userInfoResponseList;
          setTeamName(teamName);
          setWorkspaceUserList(workspaceUserList);
          console.log(workspaceUserList)
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
          <div className='text-2xl font-bold mb-2'>{teamName}의 워크스페이스</div>
          <div className='text-sm'>자유롭게 1:1 시크릿 메세지를 보내보세요!</div>
        </div>

        <W.PersonGrid>
          {workspaceUserList.map(person => (
            <PersonBox key={person.id} person={person} workspaceUUID={workspaceUUID} />
          ))}
        </W.PersonGrid>
        
        <WorkspaceBottom activeItem={'home'} workspaceUUID={workspaceUUID} workspaceUserList={workspaceUserList} />
      </W.WorkSpaceHomeContainer>
  </>
  );
};

export default WorkSpaceHome;

const PersonBox = ({ person, workspaceUUID }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달창 토글
  const [isEdit, setIsEdit] = useState(false); // 이름 편집 토글
  const [name, setName] = useState(person.nickName);
  const [editProfileState, setEditProfileState] = useState({
    "workspaceId": '',
    "workspaceName": '',
    "userName": '',
    "created_at": "워크스페이스 생성 일자"
  })
  
  const [ isWorkspace, setIsWorkspace] = useState([])
  
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const EditProfile = async (person, data, name) => {
    setIsEdit(false)
    setEditProfileState(prevState => ({
      ...prevState, // 기존 정보 그대로
      userName: name, // 바뀐 이름
    }));
  }

  const OneToOneChat = async (person) => {
    const authToken = localStorage.getItem("authToken");
    
    try {
      const response = await axios.post(`/chatRoom`, {
          workspaceUUID: workspaceUUID,
          userIds : [person.id] },
          { headers : {
          Authorization: `Bearer ${authToken}`}
      });

      const data = response.data.data;
      const chatRoomId = data.chatRoomId;

      setIsWorkspace(prevData => [
        ...prevData,
        { [workspaceUUID + person.id]: chatRoomId }
      ]);

      console.log(isWorkspace)
      
      navigate(`/secretfeedback/${chatRoomId}`, { state: { person: person, workspaceUUID: workspaceUUID} }) // 1:1 채팅방 페이지로 이동
    } catch (error) {
        console.error(error);
    }
  }

  return (
    <>
      <W.Person key={person.id}>
        <W.PersonImg  onClick={toggleModal}>
          <img className='p-5' src={person.profileImageUrl} alt="" />
        </W.PersonImg>

        <div className='flex items-center justify-center'>
          {/* 편집 권한 본인일 때만 가능하도록 추가 구현 필요 */}
          {isEdit ?
          <div className='flex justify-center items-center w-1/2'>
            <input className='w-full' type="text" value={name} onChange={(e)=>{ setName(e.target.value) }} />
            <IoCheckmarkSharp onClick={()=>{ EditProfile(person, name) }} className='ml-2' size={23}/>
          </div> : <>
          <span>{person.nickName}</span>
          <BsPencil 
            onClick={()=>{ setIsEdit(true) }}
            size={13} className='ml-2'/>
          </>
          }
        </div>

        {isModalOpen && (
        <W.Modal>
          <button onClick={()=>{ OneToOneChat(person);}}>1:1 시크릿 피드백 요청하기</button>
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