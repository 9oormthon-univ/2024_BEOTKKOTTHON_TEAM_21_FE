import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../../components/Navbar";
import { motion } from 'framer-motion';
import Spinner from "../../assets/Spinner2.gif";
import axios from "axios";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: "Pretendard";
  position: relative;
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
  width: 311px;
  height: 10vh;
`;

function RecommendMiddle() {
  // mockdata
  const response2 = {
    success: true,
    code: "200",
    message: "Success",
    data: {
      teamNames: [
        "1. 개발귀요미팀",
        "2. 카카오ESG개발팀",
        "3. 귀여운카카오ESG팀",
        "4. 카카오ESG개발단체",
      ],
    },
  };

  const data2 = response2.data;

  const navigate = useNavigate();
  const [keywords, setKeywords] = useState({
    keyword1: "",
    keyword2: "",
    keyword3: "",
    keyword4: "",
    keyword5: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // 팀이름 loading 상태

  const handleNext = async () => {
    const { keyword1, keyword2, keyword3, keyword4, keyword5 } = keywords;
    const keywordList = [
      keyword1,
      keyword2,
      keyword3,
      keyword4,
      keyword5,
    ].filter((keyword) => keyword.trim() !== "");

    if (keywordList.length < 3) {
      setError("최소 3개의 키워드를 입력해주세요.");
      return;
    }

    setError("");
    setLoading(true); // 요청 시작 시 loading 상태를 true로 변경

    // keywordList를 api에 활용, 팀명 추천 페이지로 이동
    console.log("키워드 리스트:", keywordList);

    const authToken = localStorage.getItem("authToken");
    axios
      .post(
        "${process.env.BACK_URL}/openAI/generate/teamNames",
        {
          seedWords: keywordList,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        const teamNames = response.data.data.teamNames;

        console.log("팀명 목록:", teamNames);

        const extractTeamNames = (teamNames) => {
          return teamNames.map((name) => name.substring(3));
        };

        const extractedTeamNames = extractTeamNames(teamNames);
        console.log(extractedTeamNames);

        navigate("/recommendchoose", {
          state: { teamNames: extractedTeamNames },
        });
      })
      .catch((error) => {
        console.error("Error:", error.response.data);
      });
  };

  const handleKeywordChange = (event, keywordName) => {
    setKeywords({ ...keywords, [keywordName]: event.target.value });
  };

  // 화면 전환 효과
  const transitionVariants = {
    initial: { x: '-0.3vw' }, // 처음 상태를 화면 왼쪽 밖으로 설정
    enter: { x: 0 }, // 첫 번째 단계에서는 화면 중앙으로 이동
    slide: { x: '0.3vw' }, // 두 번째 단계에서는 화면 오른쪽으로 이동
    exit: { x: '-0.3vw' } // 페이지를 떠날 때 왼쪽으로 슬라이드
  }

  return (
    <div className="App">
      <Container>
        <motion.div
            initial='initial'
            animate='enter'
            exit='exit'
            variants={transitionVariants}
            transition={{ type: 'tween', duration: 0.5 }}
        >
        <Navbar />
        <ContextContainer>
          <KeywordContainer>
            <div className="ml-8">팀의 키워드를 입력해주세요.</div>
            <div className="text-sm mx-10 flex flex-col gap-1/4">
              {Object.keys(keywords).map((keywordName, index) => (
                <input
                  key={index}
                  type="text"
                  name={keywordName}
                  value={keywords[keywordName]}
                  onChange={(e) => handleKeywordChange(e, keywordName)}
                  className={`my-5 px-3 py-2 h-12 bg-white border-b border-b-gray-500 shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full xs:text-sm focus:ring-1 ${
                    error && !keywords[keywordName].trim()
                      ? "border-red-500"
                      : ""
                  }`}
                  placeholder={`키워드 ${index + 1}`}
                  required
                />
              ))}
            </div>
            {error && <div className="text-red-500 ml-8 text-sm">{error}</div>}
          </KeywordContainer>
          <BtnContainer>
            {loading ? ( // loading이 true이면 Spinner를, 아니면 "다음" 버튼을 표시
              <img
                src={Spinner}
                alt="Spinner"
                width="150px"
                className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              />
            ) : (
              <button
                onClick={handleNext}
                className="mb-5 w-full rounded-full h-12 border border-primary text-primary bg-white text-sm hover:bg-yellow-400 hover:text-white duration-300"
              >
                다음
              </button>
            )}
          </BtnContainer>
        </ContextContainer>
        </motion.div>
      </Container>
    </div>
  );
}
export default RecommendMiddle;
