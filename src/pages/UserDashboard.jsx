import React, { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContex";
import { useHandleSubject } from "../hooks/useHandleSubject";
import AddSubject from "../components/AddSubject";
import TabHandler from "../components/tabs/TabHandler";

const UserDashboard = () => {
  const { user } = UserAuth();
  const { addSubject, fetchSubject } = useHandleSubject();
  const [subjectData, setSubjectData] = useState([]);
  const [activeSubject, setActiveSubject] = useState();
  const [activeSubjectId, setActiveSubjectId] = useState();


  const fetchSubjectData = async () => {
    const subjectData = await fetchSubject(user.uid);
    setSubjectData(subjectData);
    setActiveSubject(subjectData[0]?.subjectName);
    setActiveSubjectId(subjectData[0]?.subjectId);
  };
  useEffect(() => {
    fetchSubjectData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-slate-300  p-3 rounded-xl  mt-5">
        <div className="flex">
          <AddSubject
            fetchSubjectData={fetchSubjectData}
            addSubject={addSubject}
            uid={user.uid}
          />
          <div className="flex gap-1 justify-center w-[100%]">
            {subjectData.map((subject, index) => (
              <div
                key={index}
                className="border  w-44 p-2 h-[100%] flex flex-col items-center rounded-xl"
              >
                <h1 className="font-bold p-2">{subject.subjectName}</h1>
                <button
                  onClick={() => {
                    setActiveSubject(subject.subjectName);
                    setActiveSubjectId(subject.subjectId);
                  }}
                  className="bg-blue-500 text-white font-semibold rounded-xl p-2 w-[100%]"
                >
                  show
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <TabHandler
        subjectId={activeSubjectId}
        teacherId={user.uid}
        activeSubject={activeSubject}
      />
    </div>
  );
};

export default UserDashboard;
