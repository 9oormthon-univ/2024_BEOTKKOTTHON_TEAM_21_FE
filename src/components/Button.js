import React, { useEffect, useState } from "react";
import styled from "styled-components";

/*
const ButtonContainer = styled.button`
    display: inline-flex;
    padding: 15px 20px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 62px;
    background: ${props => props.bg};
    width : ${props => props.width};
    color : ${props => props.color};
`
*/

const Button = ({ text }) => {
  return (
    <div>
      <button className="w-full rounded-full h-10 border  border-primar text-primary text-sm">
        {text}
      </button>
    </div>
  );
};

export default Button;
