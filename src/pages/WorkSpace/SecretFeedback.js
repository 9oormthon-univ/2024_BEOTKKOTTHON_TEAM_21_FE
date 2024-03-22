import React, { useEffect, useState } from 'react';
import Stomp from 'stompjs';
import * as F from "../../styles/Feedback";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { GoChevronLeft } from "react-icons/go";
import { BsSendPlus } from "react-icons/bs";
import { images } from '../../utils/images';
import { FaCircleArrowUp } from "react-icons/fa6";
import WorkspaceBottom from '../../component/WorkspaceBottom';
import SockJS from "sockjs-client";

const SecretFeedback = () => {
  const { chatRoomId } = useParams();
  const location = useLocation();
  // const { userId1, userName } = location.state

  const [stompClient, setStompClient] = useState(null); //서버와 통신하는 데 필요한 모든 기능을 포함
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([]); // 실시간 대화하는 메세지 저장할 곳

  useEffect(() => {
    const connectWebSocket = () => {
      const socket = new SockJS("http://3.35.236.118:8080/ws");
      // const socket = new WebSocket('ws://http://3.35.236.118:8080/ws'); // 웹소켓 생성
      const stomp = Stomp.over(socket); // WebSocket을 STOMP 클라이언트로 변환
      // 웹소켓은 js에서만 사용가능한 객체이므로 서버와 통신하기 위해 stomp 클라이언트로 변환하는 것.
      stomp.connect({}, frame => { // 서버와 연결 설정
      // stomp.connect({}, frame => {...}) // (1: 헤더설정 2.연결이 성공했을 때 호출될 콜백 함수)
        console.log('Connected: ' + frame);
        setStompClient(stomp);
      });
    };

    connectWebSocket();

    return () => {
      if (stompClient) {
        stompClient.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    // 메세지 수신
  const handleMessage = message => {
    const newMessage = {
      content: message.body,
      sender: 'server' // 서버가 보낸 메시지임을 표시
    };
    setMessages(prevMessages => [...prevMessages, { content: message.body, sender: 'user' }]);
  };
  if (stompClient) {
    stompClient.subscribe(`/message`, handleMessage);
  }
  }, [stompClient]); 

  // 메세지 송신
  const sendMessage = (inputMessage) => {
    console.log(inputMessage) // 보낼 메세지
    if (stompClient && inputMessage.trim() !== '') {
      const newMessage = {
        content: inputMessage,
        sender: 'user' // 사용자가 보낸 메시지임을 표시
      };
      stompClient.send('/message', {}, inputMessage); // 서버의 @MessageMapping("/message")으로 메시지 전송
      setMessages(prevMessages => [...prevMessages, { content: inputMessage, sender: 'user' }]);
    }
    setInputMessage(''); // 보낼 메세지 input 초기화
  };

  return (
    <F.SecretFeedback>
      <SecretTitle userName={'sh'} />
      {/* 주고받은 메세지가 담긴 배열 */} 
      <div className='flex flex-col grow overflow-hidden pt-20'>
        <div className='w-full flex justify-end flex-col overflow-hidden'>
        {messages.map((message, index) => (
          <>
          {message.sender === 'user' ?
          <div className='ml-auto'>
            <F.sendChat key={index}>{message.content}</F.sendChat>
          </div> :
          <div className='mr-auto'>
            <F.ReceiveChat key={index}>{message.content}</F.ReceiveChat>
          </div>}
          </>
        ))}
        </div>
      </div>
      
      {/* 메세지 design 
      <div className='flex flex-col grow overflow-hidden'>
        <div className='w-full flex justify-end flex-col items-end overflow-hidden'>
        <F.sendChat>안녕하세요 이거 좀 고쳐주세요;;안녕하세요 이거 좀 고쳐주세요 ;;</F.sendChat>
        <F.sendChat>안녕하세요 이거 좀 고쳐주세요;;안녕하세요 이거 좀 고쳐주세요 ;;</F.sendChat>
        <F.sendChat>안녕하세요 이거 좀 고쳐주세요;;안녕하세요 이거 좀 고쳐주세요 ;;</F.sendChat>
        <F.sendChat>안녕하세요 이거 좀 고쳐주세요;;안녕하세요 이거 좀 고쳐주세요 ;;</F.sendChat>
        <F.sendChat>안녕하세요 이거 좀 고쳐주세요;;안녕하세요 이거 좀 고쳐주세요 ;;</F.sendChat>
        <F.sendChat>안녕하세요 이거 좀 고쳐주세요;;안녕하세요 이거 좀 고쳐주세요 ;;</F.sendChat>
        <F.sendChat>안녕하세요 이거 좀 고쳐주세요;;안녕하세요 이거 좀 고쳐주세요 ;;</F.sendChat>
        </div>
        
        <div>
        <F.ReceiveChat>알겠습니다. 수정하겠습닏.</F.ReceiveChat>
        <F.ReceiveChat>알겠습니다. 수정하겠습닏.</F.ReceiveChat>
        <F.ReceiveChat>알겠습니다. 수정하겠습닏.</F.ReceiveChat>
        <F.ReceiveChat>알겠습니다. 수정하겠습닏.</F.ReceiveChat>
        <F.ReceiveChat>알겠습니다. 수정하겠습닏.</F.ReceiveChat>
        </div>
      </div>*/}
      
      {/* 메세지를 보내기 위한 input */}
      <F.sendMessage>
          <input
            className='w-full'
            type="text"
            value={inputMessage}
            onChange={e => setInputMessage(e.target.value)}
          />
          <button onClick={()=>{ sendMessage(inputMessage) }}>
            <FaCircleArrowUp size={25} color='#FFD875'/>
          </button>
      </F.sendMessage>
      {/* <WorkspaceBottom activeItem={'chat'} /> */}
      <div className='fixed bottom-0 h-[80px] w-[375px] bg-white z-0 '></div>
    </F.SecretFeedback>
  );
};

export default SecretFeedback;

export const SecretTitle = ({userName}) => {
  const navigate = useNavigate();

  return (
    <F.FeedbackTitleBox className='fixed top-0 w-[375px] bg-white'>
      <div className='flex items-center'>
        <GoChevronLeft size={20} onClick={()=>{navigate(-1)}}/>
        <div className='ml-2 flex items-center'>
          <img src={images.dog} className='w-[28px] mr-1' />
          <div>{userName}</div>
        </div>
      </div>
      <BsSendPlus onClick={()=>{navigate('/')}}/>
    </F.FeedbackTitleBox>
  )
}