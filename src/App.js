import "./App.css";
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Splash from "./pages/Splash/Splash";
import Login from "./pages/Login/Login";
import WorkSpaceHome from "./pages/WorkSpace/WorkSpaceHome";
import WorkspaceList from "./pages/WorkSpace/WorkspaceList";
import SecretFeedback from "./pages/WorkSpace/SecretFeedback";
import FeedbackStorage from "./pages/WorkSpace/FeedbackStorage";
import SignUp from "./pages/SignUp/SignUp";
import SignUpEnd from "./pages/SignUp/SignUpEnd";
import RecommendStart from "./pages/Recommend/RecommendStart";
import RecommendMiddle from "./pages/Recommend/RecommendMiddle";
import RecommendChoose from "./pages/Recommend/RecommendChoose";
import RecommendEnd from "./pages/Recommend/RecommendEnd";
import WorkSpaceEnter from "./pages/WorkSpace/WorkSpaceEnter";

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3500); // 3.5초 후에 스플래시 화면 숨기기

    return () => clearTimeout(timer); // 타이머 해제
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={showSplash ? <Splash /> : <Navigate to="/login" />}
          />
          <Route path="/splash" element={<Splash />} />
          <Route path="/login" element={<Login />} />
          <Route path="/workspacelist" element={<WorkspaceList />} />
          <Route path="/workspacehome/:workspaceUUID" element={<WorkSpaceHome />} />
          <Route path="/feedbackstorage/:workspaceUUID" element={<FeedbackStorage />} />
          <Route path="/workspaceenter" element={<WorkSpaceEnter />} />
          <Route
            path="/secretfeedback/:chatRoomId"
            element={<SecretFeedback />}
          />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signend" element={<SignUpEnd />} />
          <Route path="/recommendstart" element={<RecommendStart />} />
          <Route path="/recommendmiddle" element={<RecommendMiddle />} />
          <Route path="/recommendchoose" element={<RecommendChoose />} />
          <Route path="/recommendend" element={<RecommendEnd />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
