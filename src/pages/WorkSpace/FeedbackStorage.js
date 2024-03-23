import React, { useEffect, useState } from "react";
import WorkspaceBottom from "../../component/WorkspaceBottom";
import { GoChevronLeft } from "react-icons/go";
import { BsSendPlus } from "react-icons/bs";
import * as F from "../../styles/Feedback";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from "framer-motion";
import { images } from './../../utils/images';

// 화면 전환 효과
const transitionVariants = {
  initial: { x: "-0.3vw" }, // 처음 상태를 화면 왼쪽 밖으로 설정
  enter: { x: 0 }, // 첫 번째 단계에서는 화면 중앙으로 이동
  slide: { x: "0.3vw" }, // 두 번째 단계에서는 화면 오른쪽으로 이동
  exit: { x: "-0.3vw" }, // 페이지를 떠날 때 왼쪽으로 슬라이드
};

const FeedbackStorage = () => {
  // true > 받은 피드백 / false > 보낸 피드백
  const [feedbackState, SetFeedbackState] = useState(true);
  const { workspaceUUID } = useParams();
  const [sendData, setSendData] = useState([]);
  const [receivedData, setReceivedData] = useState([]);

  useEffect(() => {
    const ShowFeedBack = async () => {
      const authToken = localStorage.getItem("authToken");

      try {
        if (feedbackState) {
          console.log("받은 피드백");
          const response = await axios.get(
            "http://3.35.236.118:8080/chatRoom/received",
            {
              params: {
                workspaceUUID: workspaceUUID,
              },
              headers: {
                Authorization: `Bearer ${authToken}`,
              },
            }
          );
          const ReceivedData = response.data.data.chatRooms;
          console.log(ReceivedData);
          setReceivedData(ReceivedData);
          console.log("receivedData", receivedData);
        } else {
          console.log("보낸 피드백");
          const response = await axios.get(
            "http://3.35.236.118:8080/chatRoom/sent",
            {
              params: {
                workspaceUUID: workspaceUUID,
              },
              headers: {
                Authorization: `Bearer ${authToken}`,
              },
            }
          );
          const SendData = response.data.data.chatRooms;
          setSendData(SendData);
        }
      } catch (error) {
        console.error(error);
      }
    };
    ShowFeedBack();
  }, [feedbackState, WorkspaceBottom]);

  // 테스트 코드
  useEffect(() => {
    console.log("sendData", sendData);
  }, [sendData]);

  return (
    <div className='relative'>
      <motion.div
          initial="initial"
          animate="enter"
          exit="exit"
          variants={transitionVariants}
          transition={{ type: "tween", duration: 0.5 }}
      >
      <FeedbackTitle workspaceUUID={workspaceUUID} />

      <F.ReceiveBtn
        onClick={() => {
          SetFeedbackState(!feedbackState);
        }}
        active={feedbackState === true}
      >
        {feedbackState === true ? "받은 피드백" : "보낸 피드백"}
      </F.ReceiveBtn>

      {/* 단체 채팅방 구현 중단 ... */}
      {/* <F.FeedbackContainer onClick={ ()=>{ console.log('단체 채팅방 입장') } }>
      <F.FeedbackImg>
        <F.StyledImg src={images.unKnown} alt='img' />
      </F.FeedbackImg>

      <F.FeedbackContent>
        <div className='flex items-center mb-1'>
          <div>단체 채팅방</div>
          <div className='text-[#acacac] text-[12px] ml-2'>시간</div>
        </div>
        <div className='text-[#acacac] text-[15px] text-start'>내용</div>
      </F.FeedbackContent>
    </F.FeedbackContainer> */}

      {/* 피드백 리스트 */}
      {feedbackState === true ?
      // 받은 피드백
      <F.ReceiveFeedBack>
        {receivedData && receivedData.slice().reverse().map((data)=> {
          return(
            <Feedback receive={true} data={data} workspaceUUID={workspaceUUID} />
          )
        })}
      </F.ReceiveFeedBack> : 
      // 보낸 피드백
      <F.SendFeedBack>
         {sendData && sendData.slice().reverse().map((data)=> {
          return (
            <Feedback receive={false} data={data} workspaceUUID={workspaceUUID} />
          )
        })}
      </F.SendFeedBack>}
      </motion.div>
      
      <WorkspaceBottom activeItem={'chat'} workspaceUUID={workspaceUUID} />
    </div>
  );
};

export default FeedbackStorage;

export const FeedbackTitle = ({ workspaceUUID }) => {
  const navigate = useNavigate();

  return (
    <F.FeedbackTitleBox>
      <div className="flex items-center">
        <GoChevronLeft
          className="cursor-pointer"
          size={20}
          onClick={() => {
            navigate(-1);
          }}
        />
        <div className="ml-2">피드백 보관함</div>
      </div>
      {/* <BsSendPlus onClick={()=>{navigate(`/addGroupChat/${workspaceUUID}`)}}/> */}
    </F.FeedbackTitleBox>
  );
};

export const Feedback = (props) => {
  const navigate = useNavigate();

  const person = {
    nickName: props.data.targetUsers?.userInfoList[0]?.nickName,
    profileImageUrl: props.data.targetUsers?.userInfoList[0]?.profileImageUrl,
    chatRoomUserId: props.data.chatRoomUserId,
  }
  const HandleChatRoom = (props) => {
    console.log("채팅방 입장", props.chatRoomId);
    navigate(`/secretfeedback/${props.data.chatRoomId}`, {
      state: {
        person: person,
        workspaceUUID: props.workspaceUUID,
        receive: props.receive,
      },
    });
  };

  return (
    <F.FeedbackContainer
      onClick={() => {
        HandleChatRoom(props);
      }}
    >
      <F.FeedbackImg>
        <F.StyledImg
          src={props.receive ? images.unKnown : person.profileImageUrl}
          alt="img"
          active={props.receive}
        />
      </F.FeedbackImg>

      <F.FeedbackContent>
        <div className='flex items-center mb-1'>
          <div>{props.receive ? '익명' : person.nickName }</div>
          <div className='text-[#acacac] text-[12px] ml-2'>{props.data.lastMessage?.dateTime}</div>
        </div>
        <div className='text-[#acacac] text-[15px] text-start w-[85%] truncate '>{props.data.lastMessage?.content}</div>
      </F.FeedbackContent>
      {props.data.isNew && <div className='w-[10px] h-[10px] rounded-2xl bg-[red]'></div>}
    </F.FeedbackContainer>
  );
};
