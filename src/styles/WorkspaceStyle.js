import styled, { keyframes, css } from "styled-components";
import YellowPlusBg from "../assets/plus-yellow.png";
//import workspaceListBg1 from "../assets/workspaceListBg1.png";
//import workspaceListBg2 from "../assets/workspaceListBg2.png";
import CircleBg from "../assets/CircleBg.png";

// 워크스페이스 홈
export const WorkSpaceHomeContainer = styled.div``;

export const Background = styled.div`
  border-radius: 0 0 20% 20%;
  background: linear-gradient(180deg, #ffa680 0%, #ffd875 100%);
  background-size: contain;
  width: 100%;
  height: 275px;
  position: absolute;
  z-index: -1;
  flex-shrink: 0;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);
  overflow: hidden;
`;

export const CircleBackground = styled.div`
  background: url(${CircleBg});
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

{
  /*
export const Background1 = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1;
  flex-shrink: 0;
  background-image: url(${workspaceListBg1});
  background-size: 50%;
  background-repeat: no-repeat;
`;
*/
}

{
  /*
export const Background2 = styled.div`
  width: 100%;
  height: 100%;
  margin-left: 200px;
  position: absolute;
  z-index: -1;
  flex-shrink: 0;
  top: 0px;
  background-image: url(${workspaceListBg2});
  background-size: 50%;
  background-repeat: no-repeat;
`;
*/
}
{
  /*
export const Background2 = styled.div`
  width: 100%;
  height: 100%;
  margin-left: 200px;
  position: absolute;
  z-index: -1;
  flex-shrink: 0;
  top: 0px;
  background-image: url(${workspaceListBg2});
  background-size: 50%;
  background-repeat: no-repeat;
`;

*/
}

export const Background2 = styled.div`
  background: linear-gradient(180deg, #ffd875 0%, #ffa680 100%);
  height: 275px;
  width: 100%;
  border-radius: 0 0 20% 20%;
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
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  width: 130px;
  height: 130px;
  border-radius: 50%;
  border: 1px solid #d9d9d9;
  margin-bottom: 10px;
  background-color: white;
  background-position: center;
`;
export const Modal = styled.div`
  position: absolute;
  width: 138.575px;
  height: 29.447px;
  border-radius: 8.661px;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
  background: linear-gradient(93deg, #ffd875 0%, #ffa680 96.72%);
  flex-shrink: 0;
  color: #fff;
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
  border-top: 1px solid #d7d7d7;
  background-color: white;
`;
export const BottomContent = styled.button`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 13px;
  color: ${(props) => (props.active ? "#FEC533" : "#d7d7d7")};
`;

export const wsListContainer = styled.div`
  width: 90%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  justify-items: center;
  align-items: center;
  gap: 30px;
`;

export const wsListBox = styled.button`
  color: white;
  width: 100%;
  height: 130px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 10px;
`;

export const plusBtn = styled.button`
  border-radius: 7.759px;
  background: #efefef;
`;

const gradientShift = keyframes`
  0% { background-position: 0 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0 50%; }
`;

export const GradientButton = styled.button`
  border: none;
  border-radius: 24px;
  background-size: 200% 200%;
  background-image: linear-gradient(to right, #f6d365 0%, #fda085 100%);
  color: white;
  font-size: 15.5px;
  cursor: pointer;
  animation: ${gradientShift} 3s ease infinite;

  &:hover {
    opacity: 0.9;
  }
`;

export const YellowPlusButton = styled.button`
  position: absolute;
  bottom: 40px;
  right: 20px;
  width: 30px;
  height: 35px;
  background-image: url(${YellowPlusBg});
  background-size: cover;
  border: none;
  cursor: pointer;
`;


export const PersonSelectEffect = styled.button`
  ${(props) => props.isSelected && css`
  box-shadow: 4px 3px 10px 0px rgba(0, 0, 0, 0.20);
  padding: 10px;
  border-radius: 10px;
  `}  
`

export const AddGroupBtn = styled.button`
  border-radius: 20.5px;
  background: linear-gradient(91deg, #FFD875 -2.04%, #FFA680 100%);
  text-align: center;
  padding: 10px 20px;
  color: white;
  margin: 0 auto;
  width: 50%;
  display: flex;
  justify-content: center;
  `