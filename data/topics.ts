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
      "Milli Ve Dini Duyarlılığı Esas Alan Hikaye Ve Roman",
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
  
  export default topicsBySubject;
  