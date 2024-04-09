import React from "react";

const SubjectView = ({ tab, uid }) => {
  return (
    <div>
      <h1 className="font-bold"> {tab.label}</h1>
      {tab.content}
    </div>
  );
};

export default SubjectView;
