import React, { useEffect, useState } from 'react';
import WorkspaceBottom from '../../component/WorkspaceBottom';
import { GoChevronLeft } from "react-icons/go";
import { BsSendPlus } from "react-icons/bs";
import * as F from "../../styles/Feedback";
import { useNavigate, useParams } from 'react-router-dom';
import { images } from './../../utils/images';
import axios from 'axios';


const FeedbackStorage = () => {
  // true > 받은 피드백 / false > 보낸 피드백
  const [feedbackState, SetFeedbackState] = useState(true);
  const { workspaceUUID } = useParams();
  const [sendData, setSendData] = useState();
  const [receivedData, setReceivedData] = useState();

  useEffect(()=>{
    const ShowFeedBack = async () => {
      const authToken = localStorage.getItem("authToken");

      try {
        if (feedbackState) {
          console.log('받은 피드백')
          const response = await axios.get("/chatRoom/received", {
            params: {
              workspaceUUID: workspaceUUID
            },
            headers: {
              Authorization: `Bearer ${authToken}`,
            }
          });
          const ReceivedData = response.data.data;
          setReceivedData(ReceivedData);
          console.log('receivedData', receivedData);
        } else {
          console.log('보낸 피드백')
          const response = await axios.get("/chatRoom/sent", {
            params: {
              workspaceUUID: workspaceUUID
            },
            headers: {
              Authorization: `Bearer ${authToken}`,
            }
          });
          const SendData = response.data.data;
          setSendData(SendData);
          console.log('sendData', sendData);
        }
      } catch (error) {
          console.error(error);
      }
    }
    ShowFeedBack();
  }, [feedbackState, WorkspaceBottom])

  return (
    <div className='relative'>
      <FeedbackTitle />

      <F.ReceiveBtn 
        onClick={()=>{ SetFeedbackState(!feedbackState) }}
        active={feedbackState === true} >
        {feedbackState === true ? '받은 피드백' : '보낸 피드백'}
      </F.ReceiveBtn>

      {/* 피드백 리스트 */}
      {feedbackState === true ?
      // 받은 피드백
      <F.ReceiveFeedBack>
        {receivedData && receivedData.map((data)=> {
          return(
            <Feedback receive={true} data={data} workspaceUUID={workspaceUUID} />
          )
        })}
      </F.ReceiveFeedBack> : 
      // 보낸 피드백
      <F.SendFeedBack>
         {sendData && sendData.map((data)=> {
          return (
            <Feedback receive={false} data={data} workspaceUUID={workspaceUUID} />
          )
        })}
      </F.SendFeedBack>}
      
      <WorkspaceBottom activeItem={'chat'} workspaceUUID={workspaceUUID} />
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

  const person = {
    nickName: props.data.targetUser.nickName,
    profileImageUrl: props.data.targetUser.profileImageUrl,
  }
  
  const HandleChatRoom = (props) => {
    console.log('채팅방 입장', props.chatRoomId);
    navigate(`/secretfeedback/${props.data.chatRoomId}`, { state: { person: person, workspaceUUID: props.workspaceUUID} });
  }

  return (
    <F.FeedbackContainer onClick={ ()=>{ HandleChatRoom(props) } }>
      <F.FeedbackImg>
        <F.StyledImg src={props.data.targetUser.profileImageUrl} alt='img' active={props.receive}/>
      </F.FeedbackImg>

      <F.FeedbackContent>
        <div className='flex items-center mb-1'>
          <div>{props.data.targetUser.nickName}</div>
          <div className='text-[#acacac] text-[12px] ml-2'>{props.time}</div>
        </div>
        <div className='text-[#acacac] text-[15px] text-start'>{props.content}</div>
      </F.FeedbackContent>
    </F.FeedbackContainer>
  )
}