import styled from "styled-components";

export const FeedbackTitleBox = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #d7d7d7;
  font-size: 18px;
`
export const FeedbackContainer = styled.div`
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
`
export const SendFeedBack = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
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
