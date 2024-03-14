import React, { useEffect, useState } from 'react';
import Stomp from 'stompjs';

const SecretFeedback = () => {
  const [stompClient, setStompClient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  useEffect(() => {
    const connectWebSocket = () => {
      const socket = new WebSocket('ws://localhost:8080/ws'); // 웹소켓 생성
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
      stompClient.subscribe('/sub', handleMessage);
    }
  }, [stompClient]); // stompClient 값 변경X, 값이 동일한 상태에서 여러 번 호출되는 것.

  // 메세지 송신
  const sendMessage = () => {
    if (stompClient && inputMessage.trim() !== '') {
      stompClient.send('/pub', {}, inputMessage);
      setInputMessage('');
    }
  };

  return (
    <div>
      {/* 주고받은 메세지가 담긴 배열 */}
      <div>
        {messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
      {/* 메세지를 보내기 위한 input */}
      <input
        type="text"
        value={inputMessage}
        onChange={e => setInputMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default SecretFeedback;
