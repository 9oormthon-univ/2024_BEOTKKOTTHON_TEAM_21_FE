import React, { useState } from 'react';
import WorkspaceBottom from '../../component/WorkspaceBottom';
import { GoChevronLeft } from "react-icons/go";
import { BsSendPlus } from "react-icons/bs";
import * as F from "../../styles/Feedback";
import { useNavigate } from 'react-router-dom';
import { images } from './../../utils/images';

const FeedbackStorage = () => {
  // true > 받은 피드백 / false > 보낸 피드백
  const [feedbackState, SetFeedbackState] = useState(true);

  return (
    <div className='relative'>
      <FeedbackTitle />

      <F.ReceiveBtn 
        onClick={()=>{SetFeedbackState(!feedbackState)}}
        active={feedbackState === true} >
        {feedbackState === true ? '받은 피드백' : '보낸 피드백'}
      </F.ReceiveBtn>

      {/* 피드백 리스트 */}
      {feedbackState === true ?
      <F.ReceiveFeedBack>
        받은 피드백 리스트
      </F.ReceiveFeedBack> : 
      <F.SendFeedBack>
        보낸 피드백 리스트
      </F.SendFeedBack>}
      
      <WorkspaceBottom activeItem={'chat'} />
    </div>
  );
};

export default FeedbackStorage;

export const FeedbackTitle = () => {
  const navigate = useNavigate();

  return (
    <F.FeedbackTitleBox>
      <div className='flex items-center'>
        <GoChevronLeft size={20} onClick={()=>{navigate(-1)}}/>
        <div className='ml-2'>피드백 보관함</div>
      </div>
      <BsSendPlus onClick={()=>{navigate('/')}}/>
    </F.FeedbackTitleBox>
  )
}

export const Feedback = () => {
  return (
    <F.FeedbackContainer>
      <F.FeedbackImg>
        <F.StyledImg src={images.cat} alt='img'/>
      </F.FeedbackImg>

      <F.FeedbackContent>
        <div className='flex items-center mb-1'>
          <div>익명</div>
          <div className='text-[#acacac] text-[12px] ml-2'>시간</div>
        </div>
        <div className='text-[#acacac] text-[15px]'>마지막대화내용</div>
      </F.FeedbackContent>
    </F.FeedbackContainer>
  )
}