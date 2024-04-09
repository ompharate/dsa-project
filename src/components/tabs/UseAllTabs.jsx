import React, { useEffect, useState } from "react";
import { useHandleSubject } from "../../hooks/useHandleSubject";

export const UseAllTabs = () => {
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  }, [isAdded]);

  const AddAttendance = ({ teacherId, subjectId }) => {
    const [roll, setRoll] = useState();
    const [date, setDate] = useState();
    const [isPresent, setIsPresent] = useState(false);
    const { AddAttendance } = useHandleSubject();

    async function handleSubmit() {
      const isAdded = await AddAttendance(
        roll,
        date,
        isPresent,
        subjectId,
        teacherId
      );
      if (isAdded) setIsAdded(true);
    }

    return (
      <div className="p-2 flex flex-col gap-3 justify-center">
        <input
          type="text"
          className="p-3 outline-none  bg-slate-200"
          placeholder="Enter Roll Num"
          onChange={(e) => setRoll(e.target.value)}
        />
        <input
          type="date"
          className="p-3 outline-none bg-slate-200"
          placeholder="Enter Date"
          onChange={(e) => setDate(e.target.value)}
        />
        <div>
          <div>
            <label>Present </label>
            <input
              type="radio"
              className="p-3 outline-none"
              placeholder="Enter Roll Num"
              checked={isPresent}
              onChange={(e) => setIsPresent(true)}
            />
          </div>
          <div>
            <label>Absent </label>
            <input
              type="radio"
              className="p-3 outline-none"
              placeholder="Enter Roll Num"
              checked={!isPresent}
              onChange={(e) => setIsPresent(false)}
            />
          </div>
        </div>
        <button
          onClick={handleSubmit}
          className="bg-blue-500 p-2 text-white rounded-sm"
        >
          Submit
        </button>
        <p className="text-green-500">
          {isAdded ? "Data Added Successfully" : null}{" "}
        </p>
      </div>
    );
  };
  const AddMarks = ({ teacherId, subjectId }) => {
    const [label, setLabel] = useState();
    const [roll, setRoll] = useState();
    const [outOf, setOutOf] = useState();
    const [received, setReceived] = useState();
    const { AddMarks } = useHandleSubject();
    async function handleSubmit() {
      const isAdded = await AddMarks(
        label,
        roll,
        outOf,
        received,
        subjectId,
        teacherId
      );
      if (isAdded) setIsAdded(true);
    }
    return (
      <div className="flex flex-col gap-3">
        <input
          type="text"
          className="p-3 outline-none  bg-slate-200"
          placeholder="Enter Label"
          autoComplete={true}          
          onChange={(e) => setLabel(e.target.value)}
        />
        <input
          className="bg-slate-200 p-3 "
          type="text"
          placeholder="Enter Roll Number"
          onChange={(e) => setRoll(e.target.value)}
        />
        <input
          className="bg-slate-200 p-3 "
          onChange={(e) => setOutOf(e.target.value)}
          type="text"
          autoComplete={true}
          placeholder="out of"
        />
        <input
          className="bg-slate-200 p-3 "
          type="text"
          placeholder="Received"
          onChange={(e) => setReceived(e.target.value)}
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-500 p-2 text-white rounded-sm"
        >
          Submit
        </button>
        <p className="text-green-500">
          {isAdded ? "Data Added Successfully" : null}{" "}
        </p>
      </div>
    );
  };

  const CheckMarks = ({ teacherId, subjectId }) => {
    const { fetchMarks } = useHandleSubject();
    const [marksData, setMarksData] = useState([]);
    useEffect(() => {
      async function getMarks() {
        const marks = await fetchMarks(teacherId, subjectId);
        setMarksData(marks);
      }
      getMarks();
    }, []);

    return (
      <div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Sr.
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Roll
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Received
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                OutOf
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {marksData?.map((mark, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">{index+1}</td>
                <td className="px-6 py-4 whitespace-nowrap">{mark.roll}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {mark.received}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {mark.outof}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Edit
                  </button>
                  <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return { AddAttendance, AddMarks, CheckMarks };
};
