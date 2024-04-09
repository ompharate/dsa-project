import React, { useState } from "react";
import SubjectView from "./SubjectView";
import { UseAllTabs } from "./UseAllTabs";

const TabHandler = ({ activeSubject }) => {
  const [currentTab, setCurrentTab] = useState(0);
  const { AddAttendance, AddMarks } = UseAllTabs();
  const tabs = [
    {
      label: "Add attendance",
      content: <AddAttendance />,
    },
    {
      label: "Add marks",
      content: <AddMarks />,
    },
    {
      label: "Add Prelim performance",
      content: <div>done</div>,
    },
  ];

  return (
    <div className="p-3">
      <div>
        <h1 className="font-bold text-2xl">{activeSubject}</h1>
      </div>
      <div className="p-2 flex bg-slate-100">
        <div className="bg-slate-300 p-2 w-[10%] flex flex-col gap-1">
          {tabs.map((tab, index) => (
            <button
              onClick={() => setCurrentTab(index)}
              className="text-sm cursor-pointer bg-blue-500 p-1 rounded-xl text-white"
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="p-2">
          <SubjectView tab={tabs[currentTab]} uid={activeSubject} />
        </div>
      </div>
    </div>
  );
};

export default TabHandler;
