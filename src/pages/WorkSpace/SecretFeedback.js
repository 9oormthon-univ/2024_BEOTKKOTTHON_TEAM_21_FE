import React, { useEffect, useState, useRef } from "react";
import Stomp from "stompjs";
import * as F from "../../styles/Feedback";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { GoChevronLeft } from "react-icons/go";
import { BsSendPlus } from "react-icons/bs";
import { images } from "../../utils/images";
import { FaCircleArrowUp } from "react-icons/fa6";
import WorkspaceBottom from "../../component/WorkspaceBottom";
import SockJS from "sockjs-client";
import axios from "axios";

const SecretFeedback = () => {
  const { chatRoomId } = useParams();
  const location = useLocation();
  const state = location.state;
  const person = state ? state.person : null;
  const workspaceUUID = state ? state.workspaceUUID : null;

  const [stompClient, setStompClient] = useState(null); //서버와 통신하는 데 필요한 모든 기능을 포함
  const [inputMessage, setInputMessage] = useState("");
  const [saveMessages, setSaveMessages] = useState([]); // 채팅 내용
  const [senderId, setSenderId ] = useState()


  // 채팅방 내역
  const handleChatList = async () => {
    const authToken = localStorage.getItem("authToken");
    try {
      const response = await axios.get("http://3.35.236.118:8080/message/list", {
        params: {
          workspaceUUID: workspaceUUID,
          chatRoomId: chatRoomId,
        },
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      const chatData = response.data.data;
      setSaveMessages(chatData);
    } catch (error) {
      console.error(error);
    }
  };

  const getUserId = async () => {
    const authToken = localStorage.getItem("authToken");
    try {
      const response = await axios.get("http://3.35.236.118:8080/users", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      const senderId = response.data.data.id;
      setSenderId(parseInt(senderId, 10)); // 정수로 변환
    } catch (error) {
      console.error(error);
    }
  }

  const connectWebSocket = () => {
    const socket = new SockJS("http://3.35.236.118:8080/ws"); // WebSocket 연결 생성
    const stomp = Stomp.over(socket); // stomp 클라이언트로 변환
    
    stomp.connect({}, (frame) => {
      // 서버와 연결 설정
      console.log("Connected: " + frame);
      setStompClient(stomp); // stomp 클라이언트 상태 저장
      console.log(stompClient, "클라이언트 상태");
      console.log(saveMessages, '수신 SENDERID ㅠㅠ', senderId);
      console.log(`오는거 :${saveMessages.senderId} , 유저ID: ${senderId}`)
    }, []);
  };
  
  useEffect(() => {
    getUserId()
    connectWebSocket();
    handleChatList();

    return () => {
      if (stompClient) {
        stompClient.disconnect();
      }
    };
  }, [stompClient]);

  // 메세지 수신
  const handleMessage = (message) => {
    console.log('이 콜백함수가 실행이 안되는 것 같은데?')
    setSaveMessages((prevMessages) => [
      ...prevMessages,
      { content: message.body, senderId: "other" },
    ]);
  };

  useEffect(() => {
    handleChatList();

    if (stompClient) {
      stompClient.subscribe(`/sub/message/room/${chatRoomId}`, handleMessage); // 구독한 엔드포인드에서 온 메시지 handleMessage로 저장함에 저장
    }
  }, [stompClient]);

  // 메세지 송신
  const sendMessage = (inputMessage) => {
    const messageDto = {
      senderId: senderId, // 실제 보내는 사용자 id로 수정 필요 !
      content: inputMessage.trim(),
    };

    if (stompClient && inputMessage.trim() !== "") {
      stompClient.send(
        `/pub/message/${chatRoomId}`,
        {},
        JSON.stringify(messageDto)
      ); // 서버에 보냄
      setSaveMessages((prevMessages) => [
        ...prevMessages,
        { content: inputMessage, senderId: senderId },
      ]); // 저장함에 저장
    }
    setInputMessage(""); // 보낼 메세지 input 초기화
  };

  return (
    <F.SecretFeedback>
      <SecretTitle person={person} />
      {/* 주고받은 메세지가 담긴 배열 */}
      <div className="flex flex-col grow overflow-hidden pt-20">
        <div  
          className="w-[95%] flex justify-end flex-col overflow-auto mb-[80px] mx-auto">
          {saveMessages.map((message, index) => {
            // 메시지의 createdAt에서 시간 정보 추출
            // const time = message.createdAt.split("T")[1].split(":").slice(0, 2).join(":");

            return (
              <>
                {message.senderId === senderId ? (
                  <div className="ml-auto flex flex-row-reverse items-end" key={index}>
                    <F.sendChat>{message.content}</F.sendChat>
                    <div className="text-xs text-[#ACACAC] mb-3 text-end">{message.createdAt}</div> {/* 시간 정보 표시 */}
                  </div>
                ) : (
                  <div className="mr-auto flex items-center" key={index}>
                    {/* <div>
                      <img src={person.profileImageUrl} className="w-[50px] rounded-[50%]"/>
                      <div className='text-xs mt-1 mr-1'>{person.nickName}</div>
                    </div> */}
                    <F.ReceiveChat key={index}>{message.content}</F.ReceiveChat>
                    <div className="text-xs text-[#ACACAC] mb-3 self-end">{message.createdAt}</div> {/* 시간 정보 표시 */}
                  </div>
                )}
              </>
            );
          })}

        </div>
      </div>

      {/* 메세지를 보내기 위한 input */}
      <F.sendMessage>
        <input
          className="w-full"
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <button
          onClick={() => {
            sendMessage(inputMessage);
          }}
        >
          <FaCircleArrowUp size={25} color="#FFD875" />
        </button>
      </F.sendMessage>
      {/* <WorkspaceBottom activeItem={'chat'} /> */}
      <div className="fixed bottom-0 h-[80px] w-[375px] bg-white z-0 "></div>
    </F.SecretFeedback>
  );
};

export default SecretFeedback;

export const SecretTitle = ({ person }) => {
  const navigate = useNavigate();

  return (
    <F.FeedbackTitleBox className="fixed top-0 w-[375px] bg-white">
      <div className="flex items-center">
        <GoChevronLeft
          size={20}
          onClick={() => {
            navigate(-1);
          }}
        />
        <div className="ml-2 flex items-center">
          <img src={person.profileImageUrl} className="w-[28px] mr-1" />
          <div>{person.nickName}</div>
        </div>
      </div>
      {/* <BsSendPlus onClick={()=>{navigate('/')}}/> */}
    </F.FeedbackTitleBox>
  );
};