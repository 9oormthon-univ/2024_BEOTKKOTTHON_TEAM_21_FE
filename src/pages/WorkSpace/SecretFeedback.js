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
import axios from 'axios';

const SecretFeedback = () => {
  const { chatRoomId } = useParams();
  const location = useLocation();
  const state = location.state;
  const person = state ? state.person : null;
  const workspaceUUID = state ? state.workspaceUUID : null;

  const [stompClient, setStompClient] = useState(null); //서버와 통신하는 데 필요한 모든 기능을 포함
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([]); // 실시간 대화하는 메세지 저장할 곳

  // 채팅방 내역
  const handleChatList = async ()=> {
    const authToken = localStorage.getItem("authToken");
    try {
      const response = await axios.get("http://3.35.236.118:8080/message/list", {
        params: {
          workspaceUUID: workspaceUUID,
          chatRoomId: chatRoomId
        },
        headers: {
          Authorization: `Bearer ${authToken}`,
        }
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const connectWebSocket = () => {
      const socket = new SockJS("http://3.35.236.118:8080/ws"); // WebSocket 연결 생성
      const stomp = Stomp.over(socket); // stomp 클라이언트로 변환
      stomp.connect({}, frame => { // 서버와 연결 설정
        console.log('Connected: ' + frame);
        setStompClient(stomp); // stomp 클라이언트 상태 저장
        console.log(stompClient, '클라이언트 상태')
      });
    };

    connectWebSocket();
    handleChatList();

    return () => {
      if (stompClient) {
        stompClient.disconnect();
      }
    };
  }, []);
  

  useEffect(() => {
    handleChatList();
      // 메세지 수신
    const handleMessage = message => {
      setMessages(prevMessages => [...prevMessages, { content: message.body, sender: 'other' }]);
    };
    if (stompClient) {
      stompClient.subscribe(`/sub/message/room/${chatRoomId}`, handleMessage); // 구독한 엔드포인드에서 온 메시지 handleMessage로 저장함에 저장
    }}, [stompClient, chatRoomId]);

  // 메세지 송신
  const sendMessage = (inputMessage) => {
    console.log(inputMessage) // 보낼 메세지
    if (stompClient && inputMessage.trim() !== '') {
      stompClient.send(`/pub/message/${chatRoomId}`, {}, JSON.stringify(inputMessage)); // 서버에 보냄
      setMessages(prevMessages => [...prevMessages, { content: inputMessage, sender: 'user' }]); // 저장함에 저장
    }
    setInputMessage(''); // 보낼 메세지 input 초기화
  };

  // 컴포넌트가 마운트될 때 이전 메시지를 로컬 스토리지에서 불러오는 기능
  useEffect(() => {
    const storedMessages = JSON.parse(localStorage.getItem(`chatMessages_${chatRoomId}`));
    if (storedMessages) {
      setMessages(storedMessages);
    }
  }, []);

  useEffect(() => {
    const handleLeaveChatRoom = () => {
      localStorage.setItem(`chatMessages_${chatRoomId}`, JSON.stringify(messages));
    };

    // 컴포넌트가 언마운트될 때 채팅방을 떠난 것으로 처리
    return () => {
      handleLeaveChatRoom();
    };
  }, [messages]);

  return (
    <F.SecretFeedback>
      <SecretTitle person={person} />
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

export const SecretTitle = ({person}) => {
  const navigate = useNavigate();

  return (
    <F.FeedbackTitleBox className='fixed top-0 w-[375px] bg-white'>
      <div className='flex items-center'>
        <GoChevronLeft size={20} onClick={()=>{navigate(-1)}}/>
        <div className='ml-2 flex items-center'>
          <img src={person.profileImageUrl} className='w-[28px] mr-1' />
          <div>{person.nickName}</div>
        </div>
      </div>
      {/* <BsSendPlus onClick={()=>{navigate('/')}}/> */}
    </F.FeedbackTitleBox>
  )
}