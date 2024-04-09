import React, { useState } from "react";
import SubjectView from "./SubjectView";
import { UseAllTabs } from "./UseAllTabs";

const TabHandler = ({ activeSubject, teacherId, subjectId }) => {
  const [currentTab, setCurrentTab] = useState(0);
  const { AddAttendance, AddMarks,CheckMarks,CheckAttendance } = UseAllTabs();

  const AddTermWork = () => {};

  const tabs = [
    {
      label: "Add attendance",
      content: <AddAttendance teacherId={teacherId} subjectId={subjectId}/>,
    },
    {
      label: "Add marks",
      content: <AddMarks teacherId={teacherId} subjectId={subjectId}/>,
    },
    {
      label: "check marks",
      content: <CheckMarks teacherId={teacherId} subjectId={subjectId}/>,
    },
    {
      label: "check attendance",
      content: <CheckAttendance teacherId={teacherId} subjectId={subjectId}/>,
    },
  ];

  return (
    <div className="p-3">
      <div>
        <h1 className="font-bold text-2xl">{activeSubject}</h1>
      </div>
      <div className="p-2 flex bg-slate-100">
        <div className="bg-slate-300 p-2 w-[14%] flex flex-col gap-1">
          {tabs.map((tab, index) => (
            <button
              onClick={() => setCurrentTab(index)}
              className="text-sm cursor-pointer bg-blue-500 p-1 rounded-xl text-white font-semibold font-"
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="p-2 w-[80%] mx-auto">
          <SubjectView tab={tabs[currentTab]} uid={activeSubject} />
        </div>
      </div>
    </div>
  );
};

export default TabHandler;
