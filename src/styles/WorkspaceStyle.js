import styled from "styled-components";

// 워크스페이스 홈
export const WorkSpaceHomeContainer = styled.div`
`;
export const Background = styled.div`
  position: absolute;
  z-index: -1;
  min-width: 375px;
  height: 250px;
  border-radius: 0px 0px 50px 50px;
  background: linear-gradient(180deg, #FFD875 0%, #FFA680 100%);
  flex-shrink: 0;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);
`;
export const PersonGrid = styled.div`
  margin: 0 auto;
  width: 90%;
  display: flex;
  flex-wrap: wrap;
`;
export const Person = styled.div`
  position: relative;
  width: 50%;
  text-align: center;
  margin: 15px 0 15px 0;
`;
export const PersonImg = styled.div` 
  margin: 0 auto;
  width: 130px;
  height: 130px;
  border-radius: 50%;
  border: 1px solid #D9D9D9;
  margin-bottom: 10px;
`;
export const Modal = styled.div`
  position: absolute;
  width: 138.575px;
  height: 29.447px;
  border-radius: 8.661px;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.20);
  background: linear-gradient(93deg, #FFD875 0%, #FFA680 96.72%);
  flex-shrink: 0;
  color: #FFF;
  font-family: Pretendard;
  font-size: 10px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  padding: 8px;
  text-align: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

// 하단바
export const BottomContainer = styled.div`
  width: 375px;
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0);
  display: flex;
  height: 55px;
  text-align: center;
  border-top: 1px solid #D7D7D7;
  background-color: white;
`;
export const BottomContent = styled.button`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items:center;
  font-size: 13px;
  color: ${props => props.active ? '#FEC533' : '#d7d7d7'};
`;