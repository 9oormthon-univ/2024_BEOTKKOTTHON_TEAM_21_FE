import React from 'react';
import styled from "styled-components";
import { images } from '../../utils/images';

const WorkSpaceHomeContainer = styled.div`

`;
const PersonGrid = styled.div`
  margin: 0 auto;
  width: 90%;
  display: flex;
  flex-wrap: wrap;
`;
const Person = styled.div`
  width: 50%;
  text-align: center;
`;
const PersonImg = styled.div` 
  margin: 0 auto;
  width: 130px;
  height: 130px;
  border-radius: 50%;
  border: 1px solid #D9D9D9;
  margin-bottom: 10px;
`;


const WorkSpaceHome = () => {
  return (
    <WorkSpaceHomeContainer>
      <div className='text-center p-10'>
        <div className='text-3xl mb-2'>00팀의 WORKSPACE</div>
        <div className='text-sm text-[#ACACAC]'>자유롭게 1:1 시크릿 메세지를 보내보세요!</div>
      </div>

      <PersonGrid>
        <Person>
          <PersonImg>
            <img className='p-5' src={images.dog} alt="" />
          </PersonImg>
          <div>김구름</div>
        </Person>

        <Person>
          <PersonImg>
            <img className='p-5' src={images.dog} alt="" />
          </PersonImg>
          <div>이름</div>
        </Person>
      </PersonGrid>
    </WorkSpaceHomeContainer>
  );
};

export default WorkSpaceHome;