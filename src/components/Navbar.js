import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const NavContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  min-height: 10vh;
`;

const Navbar = () => {
  const navigate = useNavigate();

  const goToBack = () => {
    navigate(-1);
  };
  return (
    <div>
      <NavContainer>
        <button
          className="flex justify-center items-center ml-2 w-10 rounded "
          onClick={goToBack}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="9"
            height="13"
            viewBox="0 0 9 13"
            fill="none"
          >
            <path d="M8 1L1 6.5L8 12" stroke="#878787" stroke-linecap="round" />
          </svg>
        </button>
        <button className="mr-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 25 25"
            fill="none"
          >
            <circle cx="12.5" cy="12.5" r="12.5" fill="#D7D7D7" />
            <circle cx="12.5" cy="8.50911" r="3.80824" fill="white" />
            <path
              d="M5.55554 18.5897C5.55554 15.6205 7.96261 13.2134 10.9319 13.2134H14.0681C17.0374 13.2134 19.4444 15.6205 19.4444 18.5897C19.4444 19.332 18.8427 19.9338 18.1003 19.9338H6.89963C6.15731 19.9338 5.55554 19.332 5.55554 18.5897Z"
              fill="white"
            />
          </svg>
        </button>
      </NavContainer>
    </div>
  );
};

export default Navbar;
