"use client";
import { useState } from 'react';
import { db, doc, setDoc, updateDoc, getDoc } from '../firebase/config';

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
      "Asal Sayılar,Asal Çarpanlara Ayırma",
      "OBEB – OKEK",
      "Rasyonel Sayılar-Ondalık Sayılar",
      "Basit Eşitsizlikler",
      "Mutlak Değer",
      "Üslü Sayılar",
      "Köklü Sayılar",
      "Çarpanlara Ayırma",
      "Oran-Orantı",
      "Denklem Çözme(1.Dereceden Denklemler)",
      "Problemler",
      "Mantık",
      "Kümeler ve Kartezyen Çarpımı",
      "Fonksiyonlar ve Grafikleri",
      "Permütasyon",
      "Kombinasyon",
      "Binom",
      "Olasılık,İstatistik"
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
      "Biyoçeşitlilik Ve Ekosistem",
      "Nüfus Ve Yerleşme",
      "Ekonomik Faaliyetler Ve Doğal Kaynaklar",
      "Türkiyenin Konumu Ve Ekonomisi",
      "Türkiye'de Tarım",
      "Türkiye'de Hayvancılık",
      "Türkiye'de Madencilik Ve Enerji Kaynaklarımız",
      "Türkiye'de Sanayi",
      "Türkiye'de Ticaret",
      "Türkiye'de Ulaşım",
      "Türkiye'de Turizm",
      "Türkiye Ekonomisinin Sektörel Dağılımı",
      "İşlevsel Bölgeler, Kalkınma Planları",
      "Ülkelerarası Etkileşim",
      "Küreselleşen Dünya(Örgütler Dahil)",
      "Bölgeler Ve Ülkeler",
      "Çevre Ve Toplum",
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
      "Tarih Bilimine Giriş/Tarih Öncesi Çağlar Ve Uygarlıklar",
      "İlk Ve Orta Çağlarda Türk Dünyası (Kültür Ve Medeniyet Dahil)",
      "İslamiyetin Doğuşu Ve İlk İslam Devletleri",
      "İlk Türk-İslam Devletleri",
      "İlk Türk-İslam Devletleri Kültür Medeniyet",
      "Anadolu Selçuklu(Medeniyet Dahil)",
      "Orta Çağ'Da Avrupa",
      "Osmanlı Kültür Medeniyet Tarihi",
      "Osmanlı Kuruluş Dönemi",
      "Osmanlı Yükselme Dönemi",
      "Yeni Çağ'Da Avrupa",
      "Osmanlı Duraklama Dönemi",
      "Osmanlı Gerileme Dönemi",
      "19.Yüzyıl Başlarında Osmanlı Ve Dünya",
      "Osmanlı Dağılma Dönemi(Islahatlar Dahil)",
      "Osmanlı'Da Darbe Girişimleri Ve Osmanlı'Yı Dağılmaktan Kurtarma Fikirleri",
      "1.Dünya Savaşı Ve Milli Mücadele",
      "Atatürkçülük,İnkılaplar,Atatürk Dönemi Politika(Medeniyet Dahil)"
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
      "Metinlerin Sınıflandırılması/Hikaye Ve Roman Genel Özellikler",
      "Şiir Bilgisi Ve Edebi Sanatlar",
      "İslamiyet Öncesi Türk Edebiyatı",
      "Geçiş Dönemi Türk Edebiyatı",
      "Halk Edebiyatı",
      "Divan Edebiyatı",
      "Tanzimat Edebiyatı",
      "Servet-İ Fünun Edebiyatı",
      "Fecr-i Ati Edebiyatı",
      "Milli Edebiyat",
      "Milli Edebiyat Zevk Ve Anlayışını Sürdüren Şiir",
      "Saf Şiir Anlayışı",
      "Toplumcu Şiir(1923-1960)",
      "Garip Şiiri Ve Bağımsızlar",
      "Hisarcılar(Geleneğe Duyarlılık)",
      "2.Yeni",
      "1960 Sonrası Toplumcu,1980 Sonrası Türk Şiiiri",
      "Milli Edebiyat Zevk Ve Anlayışını Sürdüren Hikaye Ve Roman",
      "Toplumcu Gerçekçi Anlayışla Yazılan Hikaye Ve Roman",
      "Milli Ve Dini Fuyarlılığı Esas Alan Hikaye Ve Roman",
      "Modernist Ve Postmodernist Anlayışla Yazılan Hikaye Ve Roman",
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
          <select name="subject" onChange={handleChange} value={formData.subject} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
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
          <select name="topic" onChange={handleChange} value={formData.topic} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
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
          <input type="number" name="mistakeCount" min="0" step="1" onChange={handleChange} value={formData.mistakeCount} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
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
          <button type="submit" disabled={!formData.subject || !formData.topic || !formData.examName || !formData.mistakeCount || !formData.mistakeReason} className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${!formData.subject || !formData.topic || !formData.examName || !formData.mistakeCount || !formData.mistakeReason ? 'opacity-50 cursor-not-allowed' : ''}`}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default MistakeForm;
