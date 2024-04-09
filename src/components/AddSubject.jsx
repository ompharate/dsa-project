import React, { useState } from "react";

const AddSubject = ({ fetchSubjectData, addSubject, uid }) => {
  const [subjectName, setSubjectName] = useState("");
  const handleFormSubmit = (e) => {
    e.preventDefault();
    addSubject(uid, subjectName);
    setSubjectName("");
    fetchSubjectData();
  };

  return (
    <div className="flex flex-col gap-2">
      <input
        className="p-2 outline-none"
        type="text"
        name="subjectName"
        value={subjectName}
        placeholder="subject Name"
        onChange={(e) => setSubjectName(e.target.value)}
      />
      <button
        onClick={handleFormSubmit}
        className="bg-blue-500 text-white font-semibold rounded-xl p-2"
      >
        Add subject
      </button>
    </div>
  );
};

export default AddSubject;
