"use client";
import { useState } from 'react';
import Link from 'next/link';
import { db, doc, setDoc, updateDoc, getDoc } from '../firebase/config';
import topicsBySubject from '../data/topics'; // topics dosyanızın doğru yolunu burada belirtin

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

    try {
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
    } catch (error) {
      console.error("Error writing document: ", error);
    }
  };

  const filteredTopics = formData.subject ? topicsBySubject[formData.subject] : [];

  return (
    <div className="max-w-lg mx-auto">
      <div className="flex justify-center mb-6">
        <img src="https://framerusercontent.com/images/U22Vo7N6tJ2bcvmMTzMVoXTgPF0.svg?scale-down-to=2048" alt="Logo" className="h-16" />
        <Link href="/view-mistakes">
          <button className="ml-100 bg-red-600 hover:bg-red-700 text-white font-bold py-25 px-10 rounded focus:outline-none focus:shadow-outline">
            Kaydedilen Hatalarımı Göster
          </button>
        </Link>
      </div>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="subject">
            Ders
          </label>
          <select name="subject" onChange={handleChange} value={formData.subject} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            <option value="">Ders seç</option>
            {Object.keys(topicsBySubject).map((subject) => (
              <option key={subject} value={subject}>{subject}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="topic">
            Konu
          </label>
          <select name="topic" onChange={handleChange} value={formData.topic} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            <option value="">Konu Seç</option>
            {filteredTopics.map((topic) => (
              <option key={topic} value={topic}>{topic}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="examName">
            Sınav Adı
          </label>
          <select name="examName" onChange={handleChange} value={formData.examName} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            <option value="">Sınav Adı Seç</option>
            <option value="Vize">Vize</option>
            <option value="Final">Final</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mistakeCount">
            Hata Sayısı
          </label>
          <input type="number" name="mistakeCount" min="0" step="1" onChange={handleChange} value={formData.mistakeCount} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mistakeReason">
            Hata Sebebi
          </label>
          <select name="mistakeReason" onChange={handleChange} value={formData.mistakeReason} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            <option value="">Hatanın sebebini seç</option>
            <option value="Bilgi Eksikliği">Bilgi Eksikliği</option>
            <option value="Yorumlama Eksikliği">Yorumlama Eksikliği</option>
            <option value="Özgün Soru">Özgün Soru</option>
            <option value="Dikkat Hatası">Dikkat Hatası</option>
          </select>
        </div>
        <div className="flex items-center justify-between">
          <button type="submit" disabled={!formData.subject || !formData.topic || !formData.examName || !formData.mistakeCount || !formData.mistakeReason} className={`bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${(!formData.subject || !formData.topic || !formData.examName || !formData.mistakeCount || !formData.mistakeReason) && "opacity-50 cursor-not-allowed"}`}>
            Hatayı Kaydet
          </button>
        </div>
      </form>
      <div className="mt-8">
        <h2 className="text-lg font-bold mb-2 text-center">Sisteme Kaydedilen Hatalar</h2>
        <div className="flex justify-center">
          <table className="min-w-full bg-white text-center">
            <thead>
              <tr>
                <th className="py-2 border">Ders</th>
                <th className="py-2 border">Konu</th>
                <th className="py-2 border">Sınav Adı</th>
                <th className="py-2 border">Hata Sayısı</th>
                <th className="py-2 border">Hata Sebebi</th>
              </tr>
            </thead>
            <tbody>
              {submittedData.map((data, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{data.subject}</td>
                  <td className="border px-4 py-2">{data.topic}</td>
                  <td className="border px-4 py-2">{data.examName}</td>
                  <td className="border px-4 py-2">{data.mistakeCount}</td>
                  <td className="border px-4 py-2">{data.mistakeReason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MistakeForm;