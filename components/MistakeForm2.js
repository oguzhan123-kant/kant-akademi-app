"use client";
import { useState } from 'react';
import { db, doc, setDoc, updateDoc, getDoc } from '../firebase/config.ts'; // firebaseConfig dosyanızın yolunu ayarlayın

const topicsBySubject = {
  "Türkçe": [
    "Sözcükte Anlam, Deyimler ve Atasözleri",
    "Cümle Bilgisi, Yorumu ve Cümlede Kavramlar (Cümlede Anlam)",
    "Paragrafta Anlam, Anlatım Biçimleri",
    "Ses Bilgisi",
    "Yazım Kuralları",
    "Noktalama İşaretleri",
    "Sözcük Yapısı ve Ekler",
    "İsim Soylu Sözcükler",
    "Fiiller, Ek Fiil, Fiilimsiler, Fiilde Yapı",
    "Cümlenin Ögeleri",
    "Cümle Çeşitleri",
    "Anlatım Bozukluğu"
  ],
  "Mat1": [
    "Temel Kavramlar (Sayılar)",
    "Sayı Basamakları ve Çözümleme",
    "Bölme ve Bölünebilme",
    "Asal Sayılar, Asal Çarpanlara Ayırma",
    "OBEB – OKEK",
    "Rasyonel Sayılar-Ondalık Sayılar",
    "Basit Eşitsizlikler",
    "Mutlak Değer",
    "Üslü Sayılar",
    "Köklü Sayılar",
    "Çarpanlara Ayırma",
    "Oran-Orantı",
    "Denklem Çözme (1.Dereceden Denklemler)",
    "Problemler",
    "Mantık",
    "Kümeler ve Kartezyen Çarpımı",
    "Fonksiyonlar ve Grafikleri",
    "Permütasyon",
    "Kombinasyon",
    "Binom",
    "Olasılık, İstatistik"
  ],
  "Geometri": [
    "Doğruda Açılar",
    "Üçgende Açılar",
    "Dik Üçgen, Özel Üçgenler ve Dik Üçgende Trigonometrik Bağlantılar",
    "İkizkenar Üçgen",
    "Eşkenar Üçgen",
    "Üçgende Açıortay",
    "Üçgende Kenarortay",
    "Üçgende Eşlik ve Benzerlik",
    "Üçgende Alan",
    "Üçgende Merkezler",
    "Üçgende Açı Kenar Bağıntıları",
    "Çokgenler",
    "Dörtgenler",
    "Paralelkenar",
    "Eşkenar Dörtgen",
    "Deltoid",
    "Dikdörtgen",
    "Kare",
    "Yamuk",
    "Çemberde Açılar",
    "Çemberde Uzunluk",
    "Dairenin Çevresi ve Alanı",
    "Noktanın Analitik İncelenmesi",
    "Doğrunun Analitik İncelenmesi",
    "Çemberin Analitik İncelenmesi (Çember Analitiği)",
    "Dönüşüm Geometrisi",
    "Katı cisimler"
  ],
  "Fizik": [
    "Fizik Bilimine Giriş",
    "Madde ve Özellikleri",
    "Hareket ve Kuvvet",
    "İş, Güç ve Enerji",
    "Isı, Sıcaklık ve Genleşme",
    "Basınç",
    "Kaldırma Kuvveti",
    "Elektrik Akımı ve Devreleri",
    "Mıknatıslar ve Manyetizma",
    "Aydınlanma, Gölge ve Düzlem Aynalar",
    "Küresel Aynalar",
    "Işığın Kırılması ve Renkler",
    "Mercekler ve Optik Araçlar",
    "Dalgalar"
  ],
  "Kimya": [
    "Kimya Bilimine Giriş",
    "Atom Bilgisi ve Periyodik Sistem",
    "Kimyasal Türler Arası Etkileşimler",
    "Maddenin Halleri, Sıvı Özellikleri, Buhar Basıncı",
    "Kimyanın Temel Kanunları ve Kimyasal Hesaplamalar, Mol Kavramı",
    "Karışımlar, Çözeltiler, Koligatif Özellikler",
    "Asitler-Bazlar-Tuzlar",
    "Kimya Her Yerde"
  ],
  "Biyoloji": [
    "Bilimsel Bilginin Doğası, Biyoloji Bilimi ve Canlıların Ortak Özellikleri",
    "Canlıların Temel Bileşenleri",
    "Hücrenin Yapısı ve İşlevleri",
    "Hücre Bölünmesi ve Üreme Çeşitleri",
    "Kalıtım",
    "Canlıların Sınıflandırılması",
    "Dünyamız ve Ekosistem Ekolojisi",
    "Güncel Çevre Sorunları"
  ],
  "Mat2": [
    "2. Dereceden Denklemler",
    "Karmaşık Sayılar",
    "Eşitsizlikler",
    "Polinomlar",
    "Fonksiyon ve Uygulamaları",
    "Parabol",
    "Trigonometri 1 (11.Sınıf)",
    "Üstel ve Logaritmik Fonksiyonlar (Logaritma)",
    "Diziler",
    "Trigonometri 2 (12.sınıf)",
    "Limit ve Süreklilik",
    "Türevin Tanımı, Türev Alma Kuralları Ve Limit-Türev-Süreklilik İlişkisi",
    "Türevin Geometrik Yorumu",
    "Türev-Maksimum Minimum Problemler",
    "İntegralin Tanımı ve Belirsiz İntegral",
    "Belirli İntegral ve Uygulamaları"
  ],
  "Coğrafya": [
    "Biyoçeşitlilik ve Ekosistem",
    "Nüfus ve Yerleşme",
    "Ekonomik Faaliyetler ve Doğal Kaynaklar",
    "Türkiyenin Konumu ve Ekonomisi",
    "Türkiye'de Tarım",
    "Türkiye'de Hayvancılık",
    "Türkiye'de Madencilik ve Enerji Kaynaklarımız",
    "Türkiye'de Sanayi",
    "Türkiye'de Ticaret",
    "Türkiye'de Ulaşım",
    "Türkiye'de Turizm",
    "Türkiye Ekonomisinin Sektörel Dağılımı",
    "İşlevsel Bölgeler, Kalkınma Planları",
    "Ülkelerarası Etkileşim",
    "Küreselleşen Dünya (Örgütler Dahil)",
    "Bölgeler ve Ülkeler",
    "Çevre ve Toplum",
    "Türkiye'nin Yer Şekilleri",
    "Türkiye’de Toprak ve Tipleri",
    "Bitki",
    "Yeryüzünde Su Varlığı",
    "Yeryüzünde Bitki Türlerinin Sınıflandırılması",
    "Nüfus ve Yerleşme",
    "Küresel Ortam: Bölgeler",
    "Küresel Çevre Sorunları"
  ],
  "Tarih": [
    "Tarih Bilimine Giriş/Tarih Öncesi Çağlar ve Uygarlıklar",
    "İlk ve Orta Çağlarda Türk Dünyası (Kültür ve Medeniyet Dahil)",
    "İslamiyetin Doğuşu ve İlk İslam Devletleri",
    "İlk Türk-İslam Devletleri",
    "İlk Türk-İslam Devletleri Kültür Medeniyet",
    "Anadolu Selçuklu (Medeniyet Dahil)",
    "Orta Çağ'da Avrupa",
    "Osmanlı Kültür Medeniyet Tarihi",
    "Osmanlı Kuruluş Dönemi",
    "Osmanlı Yükselme Dönemi",
    "Yeni Çağ'da Avrupa",
    "Osmanlı Duraklama Dönemi",
    "Osmanlı Gerileme Dönemi",
    "19. Yüzyıl Başlarında Osmanlı ve Dünya",
    "Osmanlı Dağılma Dönemi (Islahatlar Dahil)",
    "Osmanlı'da Darbe Girişimleri ve Osmanlı'yı Dağılmaktan Kurtarma Fikirleri",
    "1. Dünya Savaşı ve Milli Mücadele",
    "Atatürkçülük, İnkılaplar, Atatürk Dönemi Politika (Medeniyet Dahil)"
  ],
  "Felsefe": [
    "Felsefenin Alanı",
    "Bilgi Felsefesi",
    "Bilim Felsefesi",
    "Varlık Felsefesi",
    "Ahlak Felsefesi",
    "Siyaset Felsefesi",
    "Din Felsefesi",
    "Sanat Felsefesi"
  ],
  "Din": [
    "Bilgi ve İnanç",
    "İslam ve İbadet",
    "Ahlak ve Değerler",
    "Allah ve İnsan İlişkisi",
    "Hz. Muhammed (S.A.V)",
    "Vahiy ve Akıl",
    "İslam Düşüncesinde Yorumlar, Mezhepler",
    "Din, Kültür ve Medeniyet",
    "İslam ve Bilim, Estetik, Barış",
    "Yaşayan Dinler"
  ],
  "Edebiyat": [
    "Edebiyata Giriş",
    "Türk Edebiyatının Dönemleri",
    "Metinlerin Sınıflandırılması/Hikaye ve Roman Genel Özellikler",
    "Şiir Bilgisi ve Edebi Sanatlar",
    "İslamiyet Öncesi Türk Edebiyatı",
    "Geçiş Dönemi Türk Edebiyatı",
    "Halk Edebiyatı",
    "Divan Edebiyatı",
    "Tanzimat Edebiyatı",
    "Servet-i Fünun Edebiyatı",
    "Fecr-i Ati Edebiyatı",
    "Milli Edebiyat",
    "Milli Edebiyat Zevk ve Anlayışını Sürdüren Şiir",
    "Saf Şiir Anlayışı",
    "Toplumcu Şiir (1923-1960)",
    "Garip Şiiri ve Bağımsızlar",
    "Hisarcılar (Geleneğe Duyarlılık)",
    "2. Yeni",
    "1960 Sonrası Toplumcu, 1980 Sonrası Türk Şiiiri",
    "Milli Edebiyat Zevk ve Anlayışını Sürdüren Hikaye ve Roman",
    "Toplumcu Gerçekçi Anlayışla Yazılan Hikaye ve Roman",
    "Milli ve Dini Duyarlılığı Esas Alan Hikaye ve Roman",
    "Modernist ve Postmodernist Anlayışla Yazılan Hikaye ve Roman",
    "Genel Özellikler, Terimler, Modern Tiyatro Türleri",
    "Geleneksel Türk Tiyatrosu",
    "Cumhuriyet Tiyatrosu",
    "Öğretici Metinler",
    "Masal-Fabl",
    "Destan-Efsane",
    "Türk Dünyası Edebiyatı",
    "Edebi Akımlar",
    "Dünya Edebiyatı"
  ]
};

const MistakeForm = () => {
  const [formData, setFormData] = useState({
    subject: '',
    topic: '',
    examName: '',
    mistakeCount: '',
    mistakeReason: ''
  });
  const [submittedData, setSubmittedData] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { subject, topic, mistakeCount } = formData;
    const userId = "defaultUserId"; // Şimdilik default bir userId kullanıyoruz

    // Kullanıcı belgesi referansı
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // Belge varsa, ilgili subject-topic kombinasyonunu güncelle
      const currentData = docSnap.data();
      const mistakes = currentData.mistakes || [];
      const index = mistakes.findIndex(
        (mistake) => mistake.subject === subject && mistake.topic === topic
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

      await updateDoc(docRef, { mistakes });
    } else {
      // Belge yoksa, yeni bir belge oluştur
      await setDoc(docRef, {
        userId,
        mistakes: [
          {
            subject,
            topic,
            totalMistakes: parseInt(mistakeCount)
          }
        ]
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

  const getTopics = () => {
    return topicsBySubject[formData.subject] || [];
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
            {Object.keys(topicsBySubject).map((subject) => (
              <option key={subject} value={subject}>{subject}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="topic">
            Topic
          </label>
          <select name="topic" onChange={handleChange} value={formData.topic} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            <option value="">Select Topic</option>
            {getTopics().map((topic) => (
              <option key={topic} value={topic}>{topic}</option>
            ))}
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
          <input type="number" name="mistakeCount" min="1" step="10" onChange={handleChange} value={formData.mistakeCount} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
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

      {submittedData.length > 0 && (
        <div className="overflow-x-auto">
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
              {submittedData.map((data, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b">{data.subject}</td>
                  <td className="py-2 px-4 border-b">{data.topic}</td>
                  <td className="py-2 px-4 border-b">{data.examName}</td>
                  <td className="py-2 px-4 border-b">{data.mistakeCount}</td>
                  <td className="py-2 px-4 border-b">{data.mistakeReason}</td>
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
