import React from 'react';
import * as W from "../../styles/WorkspaceStyle";

const WorkspaceList = () => {
  return (
    <div>
      <W.Background></W.Background>
      <div className='text-white text-2xl p-11'>
        오늘은 <span className='font-bold'>어떤 워크스페이스</span>에 입장할까요?
      </div>
    </div>
  );
};

export default WorkspaceList;