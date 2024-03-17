import React, { useEffect, useState } from 'react';
import WorkspaceBottom from '../../component/WorkspaceBottom';
import { GoChevronLeft } from "react-icons/go";
import { BsSendPlus } from "react-icons/bs";
import * as F from "../../styles/Feedback";
import { useNavigate, useParams } from 'react-router-dom';
import { images } from './../../utils/images';
import mockData from '../../utils/mockData.json';
import { APIClient } from './../../utils/Api';

const FeedbackStorage = () => {
  // true > 받은 피드백 / false > 보낸 피드백
  const [feedbackState, SetFeedbackState] = useState(true);
  const { UUID } = useParams();

  useEffect(()=>{
    const ShowFeedBack = async () => {
      try {
        if (feedbackState) {
          console.log('받은 피드백')
          const response = await APIClient().get(`/chatRoom/receive`);
        } else {
          console.log('보낸 피드백')
          const response = await APIClient().get(`/chatRoom/send`);
        }
        //  const data = response.data;
      } catch (error) {
          console.error(error);
      }
    }
    ShowFeedBack();
  }, [feedbackState])

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
      // 받은 피드백
      <F.ReceiveFeedBack>
        {mockData.map((data)=>{
          return(
            <Feedback receive={true} userid={data.userId} img={data.img} name={data.name} time={data.time} content={data.content}/>
          )
        })}
      </F.ReceiveFeedBack> : 
      // 보낸 피드백
      <F.SendFeedBack>
         {mockData.map((data)=>{
          return(
            <Feedback receive={false} userid={data.userId} img={data.img} name={data.name} time={data.time} content={data.content}/>
          )
        })}
      </F.SendFeedBack>}
      
      <WorkspaceBottom activeItem={'chat'} UUID={UUID} />
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

export const Feedback = (props) => {
  const navigate = useNavigate();

  const HandleChatRoom = (props) => {
    console.log(props)
    console.log('채팅방 입장', props.userid);
    navigate(`/secretfeedback/${props.userid}`)
  }

  return (
    <F.FeedbackContainer onClick={ ()=>{HandleChatRoom(props)} }>
      <F.FeedbackImg>
        <F.StyledImg src={images.cat} alt='img' active={props.receive}/>
      </F.FeedbackImg>

      <F.FeedbackContent>
        <div className='flex items-center mb-1'>
          <div>{props.name}</div>
          <div className='text-[#acacac] text-[12px] ml-2'>{props.time}</div>
        </div>
        <div className='text-[#acacac] text-[15px] text-start'>{props.content}</div>
      </F.FeedbackContent>
    </F.FeedbackContainer>
  )
}