import React, { useEffect, useState } from "react";
import { useHandleSubject } from "../../hooks/useHandleSubject";
import Loader from "../Loader";

export const UseAllTabs = () => {
  const [isAdded, setIsAdded] = useState(true);

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
      if(!roll || ! date ) return;
      const isAdded = await AddAttendance(
        roll,
        date,
        isPresent,
        subjectId,
        teacherId
      );
      if (isAdded) setIsAdded(isAdded);
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
        <p className="text-green-500">{isAdded ? isAdded : null}</p>
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
      if(!label || !roll || !outOf || !received || !AddMarks) return;
      const isAdded = await AddMarks(
        label,
        roll,
        outOf,
        received,
        subjectId,
        teacherId
      );
      if (isAdded) setIsAdded(isAdded);
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
        <p className="text-green-500">{isAdded ? isAdded : null}</p>
      </div>
    );
  };

  const CheckAttendance = ({ teacherId, subjectId }) => {
    const { fetchAttendance, deleteAttendance } = useHandleSubject();
    const [attendance, setAttendance] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    async function getAttendance() {
      setIsLoading(true);
      const attendance = await fetchAttendance(teacherId, subjectId);
      setAttendance(attendance);
      setIsLoading(false);
    }
    useEffect(() => {
      getAttendance();
    }, []);

    const handleDelete = async (id) => {
      const isDeleted = await deleteAttendance(id);
      if (isDeleted) setIsAdded(isDeleted);
      getAttendance();
    };

    return (
      <div>
        {isLoading ? (
          <div className="w-[100%] flex justify-center items-center mt-5">
            <Loader />
          </div>
        ) : (
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
                  Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Is Present
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <p className="text-green-500">{isAdded ? isAdded : null}</p>
              {attendance?.map((att, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{att.roll}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{att.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {att.isPresent ? "Present" : "Not Present"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleDelete(att.attendanceId)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  };
  const CheckMarks = ({ teacherId, subjectId }) => {
    const [isLoading, setIsLoading] = useState(false);
    const { fetchMarks, deleteMarks } = useHandleSubject();
    const [marksData, setMarksData] = useState([]);
    async function getMarks() {
      setIsLoading(true);
      const marks = await fetchMarks(teacherId, subjectId);
      setMarksData(marks);
      setIsLoading(false);
    }
    useEffect(() => {
      getMarks();
    }, []);

    const handleDelete = async (id) => {
      const isDeleted = await deleteMarks(id);
      if (isDeleted) setIsAdded(isDeleted);
      getMarks();
    };

    return (
      <div>
        {isLoading ? (
          <div className="w-[100%] flex justify-center items-center mt-5">
            <Loader />
          </div>
        ) : (
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
              <p className="text-green-500">{isAdded ? isAdded : null}</p>
              {marksData?.map((mark, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{mark.roll}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {mark.received}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{mark.outof}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleDelete(mark.marksId)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  };

  return { AddAttendance, AddMarks, CheckMarks, CheckAttendance };
};
