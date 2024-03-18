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

const DrawerProfileContainer = styled.div`
  height: 180px;
  background: linear-gradient(180deg, #ffd875 0%, #ffa680 100%);
`;

const Navbar = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const goToBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      const sidebar = document.getElementById("sidebar");
      const openSidebarButton = document.getElementById("open-sidebar");
      if (
        sidebar &&
        !sidebar.contains(e.target) &&
        !openSidebarButton.contains(e.target)
      ) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <div
        id="sidebar"
        className={`absolute bg-white  w-64 min-h-screen overflow-y-auto transition-transform transform ${
          isSidebarOpen ? "" : "-translate-x-full"
        } ease-in-out duration-300`}
        style={{ zIndex: 1000 }}
      >
        <div>
          <div>
            <DrawerProfileContainer>
              <div className="p-5 h-full flex flex-col justify-between">
                <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
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
                <div className="flex">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="50"
                      height="50"
                      viewBox="0 0 50 50"
                      fill="none"
                    >
                      <circle
                        cx="24.5207"
                        cy="24.5207"
                        r="24.5207"
                        fill="white"
                      />
                      <circle
                        cx="24.5206"
                        cy="16.6919"
                        r="7.47045"
                        fill="#D7D7D7"
                      />
                      <path
                        d="M10.8981 36.4666C10.8981 30.6419 15.6199 25.9201 21.4446 25.9201H27.5968C33.4214 25.9201 38.1433 30.6419 38.1433 36.4666C38.1433 37.9228 36.9628 39.1033 35.5067 39.1033H13.5347C12.0786 39.1033 10.8981 37.9228 10.8981 36.4666Z"
                        fill="#D7D7D7"
                      />
                    </svg>
                  </div>
                  <div className="mx-3 text-white">
                    <div className="text-lg">미르미</div>
                    <div className="text-sm text-white">goorumi@goorm.com</div>
                  </div>
                </div>
              </div>
            </DrawerProfileContainer>
            <div>
              <ul>
                {/* <li className="my-5 px-5 h-10 border-b border-gray-200">
                  <a href="#" className="block hover:text-primary">
                    설정
                  </a>
                </li>
                <li className="my-5 px-5 h-10 border-b border-gray-200">
                  <a href="#" className="block hover:text-primary">
                    도움말
                  </a>
                </li> */}
                <li className="my-5 px-5 h-10 border-b border-gray-200">
                  <a href="#" className="block hover:text-primary">
                    로그아웃
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
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
        <button
          className="mr-4"
          id="open-sidebar"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
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
