import React from "react";

const SubjectView = ({ tab, uid }) => {
  return (
    <div>
      {tab.label} {uid}
    </div>
  );
};

export default SubjectView;
