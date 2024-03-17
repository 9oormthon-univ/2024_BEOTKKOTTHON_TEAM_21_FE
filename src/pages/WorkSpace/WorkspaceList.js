import React from 'react';
import * as W from "../../styles/WorkspaceStyle";
import { useEffect } from 'react';
import { CiMenuKebab } from "react-icons/ci";
import { APIClient } from '../../utils/Api';

const WorkspaceList = () => {
  const response = {
    "workspaces": [
      {
        "id": "워크스페이스 ID",
        "name": "팀크루즈",
        "created_at": "워크스페이스 생성 일자"
      },
      {
        "id": "워크스페이스 ID",
        "name": "팀크루즈2",
        "created_at": "워크스페이스 생성 일자"
      },
      {
        "id": "워크스페이스 ID",
        "name": "팀크루즈3",
        "created_at": "워크스페이스 생성 일자"
      },
      {
        "id": "워크스페이스 ID",
        "name": "팀크루즈4",
        "created_at": "워크스페이스 생성 일자"
      },
      {
        "id": "워크스페이스 ID",
        "name": "구르미팀",
        "created_at": "워크스페이스 생성 일자"
      }
    ]
  }

  useEffect(()=>{
    const spaceList = async () => {
      try {
          // const response = await APIClient().get('/workspace/list');
          console.log('yet')
        } catch (error) {
          console.error(error);
      }
    }
    
    spaceList();
  }, [])

  const styles = [
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

  return (
    <div>
      <W.Background></W.Background>
      <div className='text-white text-2xl p-11'>
        오늘은 <span className='font-bold'>어떤 워크스페이스</span>에 입장할까요?
      </div>

      <W.wsListContainer>
        {response.workspaces.map((workspace, index)=> {
          const randomStyle = styles[index % styles.length]; // 랜덤 색상 변경

          return(
            <W.wsListBox key={index} style={ randomStyle }>
              <div className='flex justify-between items-center'>
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