import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: "Pretendard-Regular";
`;

const NavContainer = styled.div`
  display: flex;
  width: 100%;
  min-height: 10vh;
`;

const ContextContainer = styled.div`
  min-height: 55vh;
`;

const ContextInnerContainer = styled.div`
  display: flex;
  min-height: 55vh;
  flex-direction: column;
  justify-content: space-between;
`;

const UrlContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 80px;
`;

const BtnContainer = styled.div`
  /*width: 311px;*/
  height: 10vh;
`;

const ErrorText = styled.div`
  color: red;
`;

function WorkSpaceEnter() {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1); // 다시 로그인 페이지로 이동
  };

  const [url, setUrl] = useState("");
  const [joinError, setJoinError] = useState(null);

  const handleJoinWorkspace = async () => {
    try {
      const authToken = localStorage.getItem("authToken");
      console.log("authToken :", authToken);
      const response = await axios.post(`/workspaces/${url}/join`, null, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      console.log(response.data);

      navigate(`/workspacehome/${url}`);   // 팀별 워크스페이스 홈으로 이동

    } catch (error) {
      console.error("Error joining workspace:", error);
      setJoinError("URL을 정확히 입력해주세요.");
    }
  };

  return (
    <div className="App">
      <Container>
        <NavContainer>
          <button
            className="flex justify-center items-center ml-2 w-10 rounded "
            onClick={handleBack}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="9"
              height="13"
              viewBox="0 0 9 13"
              fill="none"
            >
              <path
                d="M8 1L1 6.5L8 12"
                stroke="#878787"
                stroke-linecap="round"
              />
            </svg>
          </button>
        </NavContainer>
        <ContextContainer className="mx-8">
          <ContextInnerContainer>
            <div className="text-lg mt-5">
              <p>워크스페이스 참여를 위해</p>
              <p>URL를 입력해주세요.</p>
            </div>

            <UrlContainer className="text-sm mx-5">
              <div>
                <input
                  type="text"
                  name="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="mt-1 px-3 py-2 bg-white border-b border-b-gray-500 shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full  xs:text-sm focus:ring-1"
                  placeholder="URL"
                />
                {joinError && (
                  <ErrorText className="mt-2">{joinError}</ErrorText>
                )}
              </div>

              <button
                className="w-full mb-5 rounded-full h-12 border border-primary bg-primary text-white text-sm"
                onClick={handleJoinWorkspace}
              >
                워크스페이스 참여
              </button>
            </UrlContainer>
          </ContextInnerContainer>
          <div className="mx-6"></div>
        </ContextContainer>
      </Container>
    </div>
  );
}
export default WorkSpaceEnter;
