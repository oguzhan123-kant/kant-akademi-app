"use client";
import { useState } from 'react';
import { db, doc, setDoc, updateDoc, getDoc } from '../firebase/config';

const MistakeForm = () => {
  const [formData, setFormData] = useState({
    subject: '',
    topic: '',
    examName: '',
    mistakeCount: '',
    mistakeReason: ''
  });
  const [submittedData, setSubmittedData] = useState([]);
  const [userMistakes, setUserMistakes] = useState([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { subject, topic, mistakeCount } = formData;
    const userId = "defaultUserId"; // Şimdilik default bir userId kullanıyoruz

    // Kullanıcı belgesi referansı
    const docRef = doc(db, "mistakes", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // Belge varsa, ilgili subject-topic kombinasyonunu güncelle
      const currentData = docSnap.data();
      const mistakes = currentData.mistakes || [];
      const index = mistakes.findIndex(
        (mistake: any) => mistake.subject === subject && mistake.topic === topic
      );

      if (index > -1) {
        mistakes[index].totalMistakes += parseInt(mistakeCount);
      } else {
        mistakes.push({
          subject,
          topic,
          totalMistakes: parseInt(mistakeCount)
        });
      }

      console.log("Updating document with mistakes: ", mistakes);
      await updateDoc(docRef, { mistakes });
    } else {
      // Belge yoksa, yeni bir belge oluştur
      const newMistakes = [
        {
          subject,
          topic,
          totalMistakes: parseInt(mistakeCount)
        }
      ];
      console.log("Setting new document with mistakes: ", newMistakes);
      await setDoc(docRef, {
        userId,
        mistakes: newMistakes
      });
    }

    setSubmittedData([...submittedData, formData]);
    setFormData({
      subject: '',
      topic: '',
      examName: '',
      mistakeCount: '',
      mistakeReason: ''
    });
  };

  const fetchUserMistakes = async () => {
    const userId = "defaultUserId"; // Şimdilik default bir userId kullanıyoruz
    const docRef = doc(db, "mistakes", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setUserMistakes(docSnap.data().mistakes);
    } else {
      setUserMistakes([]);
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="subject">
            Subject
          </label>
          <select name="subject" onChange={handleChange} value={formData.subject} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            <option value="">Select Subject</option>
            <option value="Math">Math</option>
            <option value="Science">Science</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="topic">
            Topic
          </label>
          <select name="topic" onChange={handleChange} value={formData.topic} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            <option value="">Select Topic</option>
            <option value="Algebra">Algebra</option>
            <option value="Physics">Physics</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="examName">
            Exam Name
          </label>
          <select name="examName" onChange={handleChange} value={formData.examName} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            <option value="">Select Exam</option>
            <option value="Midterm">Midterm</option>
            <option value="Final">Final</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mistakeCount">
            Mistake Count
          </label>
          <input type="number" name="mistakeCount" onChange={handleChange} value={formData.mistakeCount} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mistakeReason">
            Mistake Reason
          </label>
          <select name="mistakeReason" onChange={handleChange} value={formData.mistakeReason} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            <option value="">Select Reason</option>
            <option value="Conceptual">Conceptual</option>
            <option value="Calculation">Calculation</option>
          </select>
        </div>
        <div className="flex items-center justify-between">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Submit
          </button>
        </div>
      </form>

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
                <th className="py-2 px-4 border-b-2 border-gray-300">Total Mistakes</th>
              </tr>
            </thead>
            <tbody>
              {userMistakes.map((mistake, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b">{mistake.subject}</td>
                  <td className="py-2 px-4 border-b">{mistake.topic}</td>
                  <td className="py-2 px-4 border-b">{mistake.totalMistakes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MistakeForm;
