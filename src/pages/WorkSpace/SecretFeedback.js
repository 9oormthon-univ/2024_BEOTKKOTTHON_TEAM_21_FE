import React, { useEffect, useState } from 'react';
import Stomp from 'stompjs';
import * as F from "../../styles/Feedback";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { GoChevronLeft } from "react-icons/go";
import { BsSendPlus } from "react-icons/bs";
import { images } from '../../utils/images';
import { FaCircleArrowUp } from "react-icons/fa6";
import WorkspaceBottom from '../../component/WorkspaceBottom';

const SecretFeedback = () => {
  const { chatRoomId } = useParams();
  const location = useLocation();
  console.log(location.state) // null ... 

  const [stompClient, setStompClient] = useState(null); //서버와 통신하는 데 필요한 모든 기능을 포함
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  useEffect(() => {
    const connectWebSocket = () => {
      const socket = new WebSocket('ws://http://3.35.236.118:8080/ws'); // 웹소켓 생성
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
      setMessages(prevMessages => [...prevMessages, message.body]);
    };

    if (stompClient) {
      stompClient.subscribe(`/message/room/${chatRoomId}`, handleMessage);
    }
  }, [stompClient]); // stompClient 값 변경X, 값이 동일한 상태에서 여러 번 호출되는 것.

  // 메세지 송신
  const sendMessage = () => {
    if (stompClient && inputMessage.trim() !== '') {
      stompClient.send(`/message/room/${chatRoomId}`, {}, inputMessage);
      setInputMessage('');
    }
  };

  return (
    <F.SecretFeedback>
      <SecretTitle userName={'userName'} />
      {/* 주고받은 메세지가 담긴 배열 */}
      <div>
        {messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
      {/* 메세지를 보내기 위한 input */}
      <F.sendMessage>
        <input
          type="text"
          value={inputMessage}
          onChange={e => setInputMessage(e.target.value)}
        />
        <button onClick={sendMessage}>
          <FaCircleArrowUp size={25} color='#FFD875'/>
        </button>
      </F.sendMessage>
      {/* <WorkspaceBottom activeItem={'chat'} /> */}
    </F.SecretFeedback>
  );
};

export default SecretFeedback;

export const SecretTitle = ({userName}) => {
  const navigate = useNavigate();

  return (
    <F.FeedbackTitleBox>
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