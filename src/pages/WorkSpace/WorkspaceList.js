import React from 'react';
import * as W from "../../styles/WorkspaceStyle";
import { useEffect } from 'react';
import { CiMenuKebab } from "react-icons/ci";
import { APIClient } from '../../utils/Api';
import Navbar from '../../components/Navbar';
import { useNavigate } from 'react-router-dom';

const WorkspaceList = () => {
  const navigate = useNavigate();
  const styles = [ // 워크스페이스 리스트 랜덤 배경 색상
    {
      background: '#B2DAFF',
      boxShadow: '0px 0px 50px 0px #77BEFF inset, 0px 0px 5px 0px rgba(0, 0, 0, 0.20)',
    },
    {
      background: '#FFD875',
      boxShadow: '0px 0px 50px 0px rgba(254, 197, 51, 0.50) inset, 0px 0px 5px 0px rgba(0, 0, 0, 0.20)',
    },
    { 
      background: '#FFBEA1',
      boxShadow: '0px 0px 50px 0px rgba(254, 197, 51, 0.50) inset, 0px 0px 5px 0px rgba(0, 0, 0, 0.20);'
    },
    {
      background: '#FFA680',
      boxShadow: '0px 0px 50px 0px rgba(254, 197, 51, 0.50) inset, 0px 0px 5px 0px rgba(0, 0, 0, 0.20);'}
  ];
  const response = { // 더미데이터
    "workspaces": [
      {
        "workspaceUUID": "123",
        "name": "팀크루즈",
        "created_at": "워크스페이스 생성 일자"
      },
      {
        "workspaceUUID": "234",
        "name": "팀크루즈2",
        "created_at": "워크스페이스 생성 일자"
      },
      {
        "workspaceUUID": "43545",
        "name": "팀크루즈3",
        "created_at": "워크스페이스 생성 일자"
      },
      {
        "workspaceUUID": "234545",
        "name": "팀크루즈4",
        "created_at": "워크스페이스 생성 일자"
      },
      {
        "workspaceUUID": "22s",
        "name": "구르미팀",
        "created_at": "워크스페이스 생성 일자"
      }
    ]
  }

  useEffect(()=>{ // 내 워크스페이스 목록 반환
    const spaceList = async () => {
      try {
          const response = await APIClient().get('/workspace/list');
          const data = response.data
          console.log('워크스페이스 목록 반환')
        } catch (error) {
          console.error(error);
      }
    }
    
    spaceList();
  }, [])

  const JoinWorkspace = async (workspaceUUID) => {
    try {
      const response = await APIClient().post(`/workspaces/${workspaceUUID}/join`, null);
      navigate(`/workspacehome/${workspaceUUID}`, response)
    } catch (error) {
      console.error(error);
  }}

  return (
    <div>
      <Navbar></Navbar>
      <W.Background></W.Background>
      <div className='text-white text-2xl pb-11 px-11'>
        오늘은 <span className='font-bold'>어떤 워크스페이스</span>에 입장할까요?
      </div>

      <W.wsListContainer>
        {response.workspaces.map((workspace, index)=> {
          const randomStyle = styles[index % styles.length]; // 랜덤 색상 변경

          return(
            <W.wsListBox 
              onClick={()=>{ JoinWorkspace(workspace.workspaceUUID) }}
              key={index} style={ randomStyle }>
              <div className='flex justify-between items-center w-full'>
                <div>{workspace.name}</div>
                <div><CiMenuKebab /></div>  
              </div>
              <div>간단 설명간단 설명간단 설명간단 설명</div>
            </W.wsListBox>
          )
        })}
      </W.wsListContainer>
    </div>
  );
};

export default WorkspaceList;