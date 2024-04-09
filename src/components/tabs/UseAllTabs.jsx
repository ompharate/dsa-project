import React from "react";

export const UseAllTabs = () => {
  const AddAttendance = () => {
    <div>All attendance</div>;
  };
  const AddMarks = () => {
    <div>All marks</div>;
  };

  return {AddAttendance,AddMarks};
};
