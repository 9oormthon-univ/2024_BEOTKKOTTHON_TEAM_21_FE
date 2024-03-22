import styled from "styled-components";

export const ReceiveBtn = styled.button`
  width: 100px;
  height: 30px;
  flex-shrink: 0;
  color: white;
  position: absolute;
  top: 55px;
  right: 20px;
  cursor: auto; // 클릭 해제

  ${(props) =>
    props.active === 0
      ? `
      border-radius: 20px 0px 20px 20px;
        box-shadow: 0px 0px 3.882px 0px rgba(0, 0, 0, 0.20);
        background: #FEC533;
      `
      : props.active === 1
      ? `
      border-radius: 20px 0px 20px 20px;
        box-shadow: 0px 0px 3.882px 0px rgba(0, 0, 0, 0.20);
        background: #FEC533;
      `
      : `
        border-radius: 20px 0px 20px 20px;
        box-shadow: 0px 0px 3.882px 0px rgba(0, 0, 0, 0.20);
        background: #FFA680;
      `}
`;

export const Btn = styled.button`
  display: flex;
  flex-direction: column;
  border-radius: 7.759px;
  background: #efefef;
`;
