import React from 'react';
import WorkspaceBottom from '../../component/WorkspaceBottom';
import * as W from "../../styles/WorkspaceStyle";

const FeedbackStorage = () => {
  return (
    <div>
      <FeedbackTitle />
      <WorkspaceBottom activeItem={'chat'} />
    </div>
  );
};

export default FeedbackStorage;

export const FeedbackTitle = () => {
  return (
    <div>피드백 보관함</div>
  )
}