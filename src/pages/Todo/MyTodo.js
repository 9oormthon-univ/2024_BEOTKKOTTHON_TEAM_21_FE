import React, { useEffect, useState } from 'react';
import '../../styles/todo.css';

import axios from "axios";
import { images } from '../../utils/images';

const MyTodo = ({workspaceUUID}) => {
  const [todo, setTodo] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [showTodo, setShowTodo] = useState(); // 받아온 todo 목록 저장

  useEffect(() => {
    // todo 목록 받아오기
    const ShowTodo = async () => {
      const authToken = localStorage.getItem("authToken");
      const response = await axios.get(`http://3.35.236.118:8080/workspaces/${workspaceUUID}/todo`, {
        params: {
          workspaceUUID: workspaceUUID,
        },
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      const responseData = response.data.data.todoInfoResponseList;
      setShowTodo(responseData);
      console.log(showTodo);
      console.log(responseData);
    };
  
    ShowTodo();
  }, []); // 초기 렌더링시 목록 반환


  const handleChatList = async () => {
    const authToken = localStorage.getItem("authToken");
    try {
      const response = await axios.post("http://3.35.236.118:8080/todo",
      {
        content: '내용1',
        workspaceUUID: workspaceUUID,
      },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      const chatData = response.data.data;
      // console.log(chatData, 'todo');
    } catch (error) {
      console.error(error);
    }
  };



  return (
    <div className='pt-3 relative '>
      <div className='grow-0'>
        {/* 이 안에 모든 todo 구현 */}
        {/* {showTodo && showTodo.map((todo) => {
          console.log(todo);
          return (
            <div className='flex items-center px-4 py-3' key={todo.id}>
              <input 
                type="checkbox" 
                className='checkboxStyle mr-2 w-[30px]' 
                onChange={() => checkComplete(todo.id)}
              />
              <input type="text" value={todo.content} onChange={(e) => {setTodo(e.target.value)}}/>
            </div>
          );
        })} */}
      </div>
      
      {/* btn 위치 하단으로 수정 필요 */}
      <button className='w-[35%] p-3 absolute'>
        <img src={images.todoBtn}/>
      </button>
    </div>
  );
};

export default MyTodo;