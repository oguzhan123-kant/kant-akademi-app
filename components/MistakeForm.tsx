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
  const userId = "defaultUserId"; // Şimdilik default bir userId kullanıyoruz

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { subject, topic, examName, mistakeCount, mistakeReason } = formData;

    // DetailedMistakes koleksiyonuna veri ekleme
    const detailedDocRef = doc(db, "DetailedMistakes", userId);
    const detailedDocSnap = await getDoc(detailedDocRef);

    if (detailedDocSnap.exists()) {
      // Belge varsa, mistakes dizisini güncelle
      const currentData = detailedDocSnap.data();
      const mistakes = currentData.mistakes || [];
      mistakes.push({
        subject,
        topic,
        examName,
        mistakeCount: parseInt(mistakeCount),
        mistakeReason
      });

      await updateDoc(detailedDocRef, { mistakes });
    } else {
      // Belge yoksa, yeni bir belge oluştur
      const mistakes = [
        {
          subject,
          topic,
          examName,
          mistakeCount: parseInt(mistakeCount),
          mistakeReason
        }
      ];

      await setDoc(detailedDocRef, {
        userId,
        mistakes
      });
    }

    // Mistakes koleksiyonunu güncelleme
    const totalsDocRef = doc(db, "Mistakes", userId);
    const totalsDocSnap = await getDoc(totalsDocRef);

    if (totalsDocSnap.exists()) {
      // Belge varsa, ilgili subject-topic kombinasyonunu güncelle
      const currentData = totalsDocSnap.data();
      const mistakeTotals = currentData.mistakeTotals || [];
      const index = mistakeTotals.findIndex(
        (mistake: any) => mistake.subject === subject && mistake.topic === topic
      );

      if (index > -1) {
        mistakeTotals[index].totalMistakes += parseInt(mistakeCount);
        mistakeTotals[index].reasonCounts[mistakeReason] = (mistakeTotals[index].reasonCounts[mistakeReason] || 0) + parseInt(mistakeCount);
      } else {
        mistakeTotals.push({
          subject,
          topic,
          totalMistakes: parseInt(mistakeCount),
          reasonCounts: {
            [mistakeReason]: parseInt(mistakeCount)
          }
        });
      }

      await updateDoc(totalsDocRef, { mistakeTotals });
    } else {
      const mistakeTotals = [
        {
          subject,
          topic,
          totalMistakes: parseInt(mistakeCount),
          reasonCounts: {
            [mistakeReason]: parseInt(mistakeCount)
          }
        }
      ];

      await setDoc(totalsDocRef, {
        userId,
        mistakeTotals
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
    </div>
  );
};

export default MistakeForm;
