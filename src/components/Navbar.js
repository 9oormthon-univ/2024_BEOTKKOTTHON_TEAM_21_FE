import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

const Profile = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: white;
  border-radius: 50%;
  overflow: hidden;
`;

const Profile2 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  background-color: white;
  border-radius: 50%;
  overflow: hidden;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ProfileImage2 = styled.img`
  width: 35px;
  height: 35px;
  object-fit: cover;
`;

const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  width: 200px;
  height: 100px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  z-index: 9999;
`;

const Navbar = ({ showBackButton = true }) => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userData, setUserData] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const [nickname, setNickname] = useState("");
  const [profileImgUrl, setProfileImgUrl] = useState("");
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const goToBack = () => {
    navigate(-1);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userUUID");
    navigate("/login");
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

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        console.log(authToken);
        const response = await axios.get("http://3.35.236.118:8080/users", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        console.log(response.data);
        if (response.status === 200) {
          setUserData(response.data);

          setId(response.data.data.id);
          setNickname(response.data.data.nickName);
          setEmail(response.data.data.email);
          setProfileImgUrl(response.data.data.profileImageUrl);
        } else {
          // Handle error responses
          console.error("Failed to fetch user data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  // console.log(email, id, nickname, profileImgUrl);

  return (
    <div>
      {showLogoutModal && (
        <Modal className="text-sm">
          <div>로그아웃하시겠습니까?</div>
          <div className="flex gap-11">
            <button
              onClick={handleLogout}
              className="hover:text-primary cursor-pointer"
            >
              네
            </button>
            <button
              onClick={() => setShowLogoutModal(false)}
              className="hover:text-primary cursor-pointer"
            >
              아니요
            </button>
          </div>
        </Modal>
      )}
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
              <div className="h-full flex flex-col justify-between">
                <button
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="p-5"
                >
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
                <div className="flex px-4 py-5 items-center">
                  <Profile2>
                    {profileImgUrl && (
                      <ProfileImage src={profileImgUrl} alt="Profile" />
                    )}
                  </Profile2>
                  <div className="mx-3 text-white">
                    <div className="text-lg">{nickname}</div>
                    <div className="text-sm text-white">{email}</div>
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
                  <a
                    onClick={() => setShowLogoutModal(true)}
                    className="block hover:text-primary cursor-pointer"
                  >
                    로그아웃
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <NavContainer>
        {!showBackButton && (
          <div className="flex justify-center items-center ml-2 w-10 rounded "></div>
        )}
        {showBackButton && (
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
              <path
                d="M8 1L1 6.5L8 12"
                stroke="#878787"
                stroke-linecap="round"
              />
            </svg>
          </button>
        )}
        <button
          className="mr-4"
          id="open-sidebar"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {/* <svg
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
          </svg> */}
          <Profile>
            {profileImgUrl && (
              <ProfileImage2 src={profileImgUrl} alt="Profile" />
            )}
          </Profile>
        </button>
      </NavContainer>
    </div>
  );
};

export default Navbar;
