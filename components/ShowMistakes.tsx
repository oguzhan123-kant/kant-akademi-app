"use client";
import { useState } from 'react';
import { db, doc, getDoc } from '../firebase/config';

const ShowMistakes = ({ userId }: { userId: string }) => {
  const [userMistakes, setUserMistakes] = useState([]);
  const [totalMistakes, setTotalMistakes] = useState([]);

  const fetchUserMistakes = async () => {
    const detailedDocRef = doc(db, "DetailedMistakes", userId);
    const detailedDocSnap = await getDoc(detailedDocRef);

    if (detailedDocSnap.exists()) {
      setUserMistakes(detailedDocSnap.data().mistakes);
    } else {
      setUserMistakes([]);
    }

    const totalsDocRef = doc(db, "Mistakes", userId);
    const totalsDocSnap = await getDoc(totalsDocRef);

    if (totalsDocSnap.exists()) {
      setTotalMistakes(totalsDocSnap.data().mistakeTotals);
    } else {
      setTotalMistakes([]);
    }
  };

  return (
    <div>
      <button onClick={fetchUserMistakes} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4">
        Show Mistakes
      </button>

      {userMistakes.length > 0 && (
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b-2 border-gray-300">Subject</th>
                <th className="py-2 px-4 border-b-2 border-gray-300">Topic</th>
                <th className="py-2 px-4 border-b-2 border-gray-300">Exam Name</th>
                <th className="py-2 px-4 border-b-2 border-gray-300">Mistake Count</th>
                <th className="py-2 px-4 border-b-2 border-gray-300">Mistake Reason</th>
              </tr>
            </thead>
            <tbody>
              {userMistakes.map((mistake, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b">{mistake.subject}</td>
                  <td className="py-2 px-4 border-b">{mistake.topic}</td>
                  <td className="py-2 px-4 border-b">{mistake.examName}</td>
                  <td className="py-2 px-4 border-b">{mistake.mistakeCount}</td>
                  <td className="py-2 px-4 border-b">{mistake.mistakeReason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {totalMistakes.length > 0 && (
        <div className="overflow-x-auto mt-4">
          <h2 className="text-lg font-bold mb-4">Total Mistakes by Subject and Topic</h2>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b-2 border-gray-300">Subject</th>
                <th className="py-2 px-4 border-b-2 border-gray-300">Topic</th>
                <th className="py-2 px-4 border-b-2 border-gray-300">Total Mistakes</th>
                <th className="py-2 px-4 border-b-2 border-gray-300">Reason Counts</th>
              </tr>
            </thead>
            <tbody>
              {totalMistakes.map((mistake, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b">{mistake.subject}</td>
                  <td className="py-2 px-4 border-b">{mistake.topic}</td>
                  <td className="py-2 px-4 border-b">{mistake.totalMistakes}</td>
                  <td className="py-2 px-4 border-b">
                    {Object.entries(mistake.reasonCounts).map(([reason, count], idx) => (
                      <div key={idx}>
                        {reason}: {count}
                      </div>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ShowMistakes;
