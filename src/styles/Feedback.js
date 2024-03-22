import styled from "styled-components";

// 피드백 보관함
export const FeedbackTitleBox = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #d7d7d7;
  font-size: 18px;
`
export const FeedbackContainer = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px 10px 10px 30px;
  border-bottom: 1px solid #d7d7d7;
`
export const FeedbackImg = styled.div`
  width: 20%;
  margin-right: 15px;
`
export const StyledImg = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  border: 2px solid ${props => props.active ? '#FEC533' : '#FFA680'};
  `
export const FeedbackContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`
export const ReceiveFeedBack = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin-bottom: 54px;
`
export const SendFeedBack = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin-bottom: 54px;
  `
export const ReceiveBtn = styled.button`
  width: 100px;
  height: 30px;
  flex-shrink: 0;
  color: white;
  position: absolute;
  top: 55px;
  right: 20px;
  
  ${props => props.active === true
  ? 
  `border-radius: 20px 20px 20px 0px;
  box-shadow: 0px 0px 3.882px 0px rgba(0, 0, 0, 0.20);
  background: #FEC533;`
  : 
  `
  border-radius: 20px 0px 20px 20px;box-shadow: 0px 0px 3.882px 0px rgba(0, 0, 0, 0.20);
  background: #FFA680;`
};`

// 시크릿 피드백 채팅
export const SecretFeedback = styled.div`

`

export const sendMessage = styled.div`
  border: 1px solid #d7d7d7;
  padding: 8px;
  margin: 20px auto;
  border-radius: 20px;
  display: flex;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 350px;
  background-color: white;
  z-index: 10;
`

export const sendChat = styled.div`
border-radius: 18px 18px 0px 18px;
background: #FFD875;
padding: 10px;
margin: 7px 15px;
`

export const ReceiveChat = styled.div`
border-radius: 18px 18px 18px 0px;
border: 1px solid #D7D7D7;
padding: 10px;
background: #FFF;
margin: 7px 15px;

`