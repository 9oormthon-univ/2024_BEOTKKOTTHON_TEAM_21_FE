import React, { useEffect, useState } from "react";
import "../../styles/todo.css";
//import styled from "styled-components";
import styled from "styled-components";
import axios from "axios";
import { images } from "../../utils/images";
import CompleteTodo from "./CompleteTodo";

const CircleBtn = styled.button`
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  fill: #fff;
  stroke-width: 10px;
  stroke: #d7d7d7;
  background: #000000;
`;

const MyTodo = ({ workspaceUUID }) => {
  const [todo, setTodo] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [showTodo, setShowTodo] = useState(); // 받아온 todo 목록 저장
  const [showTodoInput, setShowTodoInput] = useState(false); // todo추가 보이는지 여부
  const [todoData, setTodoData] = useState(null);

  useEffect(() => {
    // todo 목록 받아오기
    const ShowTodo = async () => {
      const authToken = localStorage.getItem("authToken");
      const response = await axios.get(
        `http://3.35.236.118:8080/workspaces/${workspaceUUID}/todo`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      console.log(response);
      const responseData = response.data.data.todoInfoResponseList;
      console.log("responseData:", responseData);
      setTodoData(responseData);
      console.log("todoData:", responseData);
      console.log(showTodo);
    };

    ShowTodo();
    CompleteTodo();
  }); // 초기 렌더링시 목록 반환

  const CompleteTodo = async (Id) => {
    const authToken = localStorage.getItem("authToken");
    try {
      const response = await axios.post(
        `http://3.35.236.118:8080/todo/complete/${Id}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      console.log(response);
    } catch (error) {
      console.error(error); // 오류가 발생한 경우 콘솔에 오류를 출력합니다.
    }
  };

  const handleTodoAddBtnClick = async () => {
    setShowTodoInput(!showTodoInput);
    const authToken = localStorage.getItem("authToken");
    try {
      const response = await axios.post(
        "http://3.35.236.118:8080/todo",
        {
          content: todo, // 사용자가 입력한 내용
          workspaceUUID: workspaceUUID, // 작업 영역 UUID
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      const newTodo = response.data.data;
      setTodoData((prevTodoData) => [...prevTodoData, newTodo]);

      // 입력 필드를 비웁니다.
      setTodo("");

      // POST 요청 성공 시 필요한 처리를 추가할 수 있습니다.
      console.log(response.data); // 성공한 경우 서버에서 받은 응답을 출력합니다.
    } catch (error) {
      console.error(error); // 오류가 발생한 경우 콘솔에 오류를 출력합니다.
    }
  };

  return (
    <div className="pt-3 relative h-full">
      <div className="grow-0 h-full">
        {/* 이 안에 모든 todo 구현 */}
        <button
          className="w-[35%] p-3 "
          onClick={() => setShowTodoInput(!showTodoInput)}
        >
          <img src={images.todoBtn} />
        </button>
        <div>
          {showTodoInput && (
            <div className="flex mx-5 items-center gap-3">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="11.5"
                    fill="white"
                    stroke="#D7D7D7"
                  />
                </svg>
              </div>
              <input
                className="my-5 px-3 py-2 h-12 bg-white border-b border-b-gray-500 shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-2/3 xs:text-sm focus:ring-1"
                value={todo.content}
                onChange={(e) => {
                  setTodo(e.target.value);
                }}
              ></input>
              <button
                className="bg-primary px-4 py-2 rounded-2xl text-white text-sm"
                onClick={handleTodoAddBtnClick}
              >
                완료
              </button>
            </div>
          )}
        </div>
        {todoData &&
          todoData.map((todo) => {
            return (
              <div className="flex items-center px-4 py-3" key={todo.id}>
                <input
                  onClick={() => CompleteTodo(todo.id)}
                  type="checkbox"
                  className="checkboxStyle mr-2 w-[30px]"
                />
                <input
                  type="text"
                  value={todo.content}
                  onChange={(e) => {
                    setTodo(e.target.value);
                    CompleteTodo(todo.id);
                  }}
                />
              </div>
            );
          })}
      </div>

      {/* btn 위치 하단으로 수정 필요 */}
    </div>
  );
};

export default MyTodo;
