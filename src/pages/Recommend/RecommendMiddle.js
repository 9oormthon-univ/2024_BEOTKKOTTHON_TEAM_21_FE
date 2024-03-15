import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../../components/Navbar";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: "Pretendard";
  position: relative; /* Add relative positioning */
  overflow: hidden;
`;

const ContextContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 90vh;
`;

const KeywordContainer = styled.div`
  width: 100%;
  height: 75vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const BtnContainer = styled.div`
  /* position: absolute; */
  /* bottom: 30px; */
  width: 311px;
  height: 10vh;
`;

function RecommendMiddle() {
  const navigate = useNavigate();
  const [keyword1, setKeyword1] = useState("");
  const [keyword2, setKeyword2] = useState("");
  const [keyword3, setKeyword3] = useState("");
  const [keyword4, setKeyword4] = useState("");
  const [keyword5, setKeyword5] = useState("");

  const [error, setError] = useState("");

  const handleNext = () => {
    // 검증 로직: 키워드 1, 2, 3이 모두 입력되었는지 확인
    if (!keyword1 || !keyword2 || !keyword3) {
      setError("필수 키워드를 모두 입력해주세요.");
      return;
    }
    // 검증 로직 통과 시 : 다음 페이지로 이동
    setError("");
  };

  return (
    <div className="App">
      <Container>
        <Navbar></Navbar>
        <ContextContainer>
          <KeywordContainer>
            <div className="ml-8">팀의 키워드를 입력해주세요.</div>
            <div className="text-sm mx-10 flex flex-col gap-1/4">
              {/* 필수 입력란 검증 로직 추가  */}
              <input
                type="text"
                name="keyword1"
                value={keyword1}
                onChange={(e) => setKeyword1(e.target.value)}
                className={`my-5 px-3 py-2 h-12 bg-white border-b border-b-gray-500 shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full xs:text-sm focus:ring-1 ${
                  error && !keyword1 ? "border-red-500" : ""
                }`}
                placeholder="키워드 1"
                required
              />
              <input
                type="text"
                name="keyword2"
                value={keyword2}
                onChange={(e) => setKeyword2(e.target.value)}
                className={`my-5 px-3 py-2 h-12 bg-white border-b border-b-gray-500 shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full xs:text-sm focus:ring-1 ${
                  error && !keyword2 ? "border-red-500" : ""
                }`}
                placeholder="키워드 2"
                required
              />
              <input
                type="text"
                name="keyword3"
                value={keyword3}
                onChange={(e) => setKeyword3(e.target.value)}
                className={`my-5 px-3 py-2 h-12 bg-white border-b border-b-gray-500 shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full xs:text-sm focus:ring-1 ${
                  error && !keyword3 ? "border-red-500" : ""
                }`}
                placeholder="키워드 3"
                required
              />
              <input
                type="text"
                name="keyword4"
                value={keyword4}
                onChange={(e) => setKeyword4(e.target.value)}
                className="my-5 px-3 py-2 h-12 bg-white border-b border-b-gray-500 shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full  xs:text-sm focus:ring-1"
                placeholder="키워드 4 (선택)"
              />
              <input
                type="text"
                name="keyword5"
                value={keyword5}
                onChange={(e) => setKeyword5(e.target.value)}
                className="my-5 px-3 py-2 h-12 bg-white border-b border-b-gray-500 shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full  xs:text-sm focus:ring-1"
                placeholder="키워드 5 (선택)"
              />
            </div>
            {error && <div className="text-red-500 ml-8 text-sm">{error}</div>}
          </KeywordContainer>
          <BtnContainer className="mb-5">
            <button
              onClick={handleNext}
              className="mb-5 w-full rounded-full h-12 border  border-primary text-primary bg-white text-sm"
            >
              다음
            </button>
          </BtnContainer>
        </ContextContainer>
      </Container>
    </div>
  );
}
export default RecommendMiddle;
