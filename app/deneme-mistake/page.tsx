"use client";

import React, { useState } from 'react';

const ExamSelection = () => {
  const [selectedExam, setSelectedExam] = useState('');
  const [selectedField, setSelectedField] = useState('');
  const [subjects, setSubjects] = useState<{ name: string, questionCount?: number, wrongCount: number, emptyCount: number, date: string }[]>([]);
  const [results, setResults] = useState<{ name: string, questionCount: number, correctCount: number, wrongCount: number, emptyCount: number, net: number, date: string }[]>([]);

  const handleExamChange = (examType: string) => {
    setSelectedExam(examType);
    setSelectedField('');
    setSubjects([]);
    setResults([]);
    if (examType === 'TYT') {
      setSubjects([
        { name: 'Türkçe', questionCount: 40, wrongCount: 0, emptyCount: 0, date: '' },
        { name: 'Matematik', questionCount: 40, wrongCount: 0, emptyCount: 0, date: '' },
        { name: 'Fen Bilimleri', questionCount: 20, wrongCount: 0, emptyCount: 0, date: '' },
        { name: 'Sosyal Bilimler', questionCount: 20, wrongCount: 0, emptyCount: 0, date: '' },
      ]);
    }
  };

  const handleFieldChange = (fieldType: string) => {
    setSelectedField(fieldType);
    if (fieldType === 'Sayısal') {
      setSubjects([
        { name: 'Matematik', questionCount: 40, wrongCount: 0, emptyCount: 0, date: '' },
        { name: 'Fizik', questionCount: 14, wrongCount: 0, emptyCount: 0, date: '' },
        { name: 'Kimya', questionCount: 13, wrongCount: 0, emptyCount: 0, date: '' },
        { name: 'Biyoloji', questionCount: 13, wrongCount: 0, emptyCount: 0, date: '' },
      ]);
    } else if (fieldType === 'Eşit Ağırlık') {
      setSubjects([
        { name: 'Matematik', questionCount: 40, wrongCount: 0, emptyCount: 0, date: '' },
        { name: 'Edebiyat', questionCount: 24, wrongCount: 0, emptyCount: 0, date: '' },
        { name: 'Tarih1', questionCount: 10, wrongCount: 0, emptyCount: 0, date: '' },
        { name: 'Coğrafya1', questionCount: 6, wrongCount: 0, emptyCount: 0, date: '' },
      ]);
    } else if (fieldType === 'Sözel') {
      setSubjects([
        { name: 'Edebiyat', questionCount: 24, wrongCount: 0, emptyCount: 0, date: '' },
        { name: 'Tarih1', questionCount: 10, wrongCount: 0, emptyCount: 0, date: '' },
        { name: 'Coğrafya1', questionCount: 6, wrongCount: 0, emptyCount: 0, date: '' },
        { name: 'Tarih2', questionCount: 11, wrongCount: 0, emptyCount: 0, date: '' },
        { name: 'Coğrafya2', questionCount: 11, wrongCount: 0, emptyCount: 0, date: '' },
        { name: 'Felsefe Grubu', questionCount: 12, wrongCount: 0, emptyCount: 0, date: '' },
        { name: 'Ek Felsefe Grubu', questionCount: 6, wrongCount: 0, emptyCount: 0, date: '' },
      ]);
    } else if (fieldType === 'Dil') {
      setSubjects([
        { name: 'Dil', questionCount: 80, wrongCount: 0, emptyCount: 0, date: '' },
      ]);
    }
  };

  const handleSubjectChange = (index: number, field: string, value: any) => {
    const newSubjects = [...subjects];
    newSubjects[index] = { ...newSubjects[index], [field]: value };
    const total = newSubjects[index].wrongCount + newSubjects[index].emptyCount;
    if (total > (newSubjects[index].questionCount || 0)) {
      newSubjects[index][field] = (newSubjects[index].questionCount || 0) - (field === 'wrongCount' ? newSubjects[index].emptyCount : newSubjects[index].wrongCount);
    }
    setSubjects(newSubjects);
  };

  const handleCalculate = () => {
    const calculatedResults = subjects.map(subject => {
      const correctCount = (subject.questionCount || 0) - subject.wrongCount - subject.emptyCount;
      const net = correctCount - (subject.wrongCount / 4);
      return {
        name: subject.name,
        questionCount: subject.questionCount || 0,
        correctCount,
        wrongCount: subject.wrongCount,
        emptyCount: subject.emptyCount,
        net,
        date: subject.date,
      };
    });
    setResults(calculatedResults);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', minHeight: '100vh', paddingTop: '50px' }}>
      <div>
        <img src="https://framerusercontent.com/images/U22Vo7N6tJ2bcvmMTzMVoXTgPF0.svg?scale-down-to=4096" alt="Kant Akademi Logo" style={{ width: '200px', height: '100px' }} />
      </div>
      <div style={{ textAlign: 'center', margin: '20px 0', width: '100%', maxWidth: '600px', border: '1px solid #ccc', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
        <label style={{ fontSize: '24px', fontWeight: 'bold' }}>Test Tipini Seç</label>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '20px' }}>
          <button onClick={() => handleExamChange('Bölüm')} style={selectedExam === 'Bölüm' ? selectedButtonStyle : buttonStyle}>Bölüm</button>
          <button onClick={() => handleExamChange('AYT')} style={selectedExam === 'AYT' ? selectedButtonStyle : buttonStyle}>AYT</button>
          <button onClick={() => handleExamChange('TYT')} style={selectedExam === 'TYT' ? selectedButtonStyle : buttonStyle}>TYT</button>
        </div>
      </div>

      <div style={{ marginTop: '20px', width: '100%', maxWidth: '800px' }}>
        {selectedExam === 'AYT' && (
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <label htmlFor="field" style={labelStyle}>Alan</label>
            <select id="field" value={selectedField} onChange={(e) => handleFieldChange(e.target.value)} style={selectStyle}>
              <option value="">Seçiniz</option>
              <option value="Sayısal">Sayısal</option>
              <option value="Eşit Ağırlık">Eşit Ağırlık</option>
              <option value="Sözel">Sözel</option>
              <option value="Dil">Dil</option>
            </select>
          </div>
        )}

        {(selectedExam === 'TYT' || (selectedExam === 'AYT' && selectedField)) && (
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <table style={{ borderCollapse: 'collapse', width: '100%', margin: 'auto' }}>
              <thead>
                <tr>
                  <th style={tableHeaderStyle}>Ders</th>
                  <th style={tableHeaderStyle}>Yanlış</th>
                  <th style={tableHeaderStyle}>Boş</th>
                  <th style={tableHeaderStyle}>Tarih</th>
                </tr>
              </thead>
              <tbody>
                {subjects.map((subject, index) => (
                  <tr key={index}>
                    <td style={subjectLabelStyle}>{subject.name}</td>
                    <td style={tableCellStyle}>
                      <input
                        type="text"
                        value={subject.wrongCount}
                        onChange={(e) => handleSubjectChange(index, 'wrongCount', parseInt(e.target.value))}
                        style={inputStyle}
                      />
                    </td>
                    <td style={tableCellStyle}>
                      <input
                        type="text"
                        value={subject.emptyCount}
                        onChange={(e) => handleSubjectChange(index, 'emptyCount', parseInt(e.target.value))}
                        style={inputStyle}
                      />
                    </td>
                    <td style={tableCellStyle}>
                      <input
                        type="date"
                        value={subject.date}
                        onChange={(e) => handleSubjectChange(index, 'date', e.target.value)}
                        style={inputStyle}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button onClick={handleCalculate} style={{ ...buttonStyle, marginTop: '20px' }}>Net Hesapla</button>
          </div>
        )}

        {selectedExam === 'Bölüm' && (
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <label htmlFor="subject" style={labelStyle}>Alan Denemesi Türü</label>
            <select id="subject" value={selectedField} onChange={(e) => setSelectedField(e.target.value)} style={selectStyle}>
              <option value="">Seçiniz</option>
              <option value="TYT Matematik Alan Denemesi">TYT Matematik Alan Denemesi</option>
              <option value="TYT Fen Bilimleri Alan Denemesi">TYT Fen Bilimleri Alan Denemesi</option>
              <option value="TYT Sosyal Bilimler Alan Denemesi">TYT Sosyal Bilimler Alan Denemesi</option>
              <option value="TYT Türkçe Alan Denemesi">TYT Türkçe Alan Denemesi</option>
              <option value="AYT Fen Bilimleri Alan Denemesi">AYT Fen Bilimleri Alan Denemesi</option>
              <option value="AYT Sosyal Bilimler-1 Alan Denemesi">AYT Sosyal Bilimler-1 Alan Denemesi</option>
              <option value="AYT Sosyal Bilimler-2 Alan Denemesi">AYT Sosyal Bilimler-2 Alan Denemesi</option>
              <option value="AYT Matematik Alan Denemesi">AYT Matematik Alan Denemesi</option>
              <option value="AYT Dil Alan Denemesi">AYT Dil Alan Denemesi</option>
            </select>

            <div style={{ marginTop: '10px' }}>
              <label style={labelStyle}>Soru Sayısı</label>
              <input
                type="text"
                value={subjects[0]?.questionCount || ''}
                onChange={(e) => handleSubjectChange(0, 'questionCount', parseInt(e.target.value))}
                style={inputStyle}
              />
            </div>

            <table style={{ borderCollapse: 'collapse', width: '100%', margin: 'auto', marginTop: '10px' }}>
              <thead>
                <tr>
                  <th style={tableHeaderStyle}>Alan Denemesi Türü</th>
                  <th style={tableHeaderStyle}>Yanlış</th>
                  <th style={tableHeaderStyle}>Boş</th>
                  <th style={tableHeaderStyle}>Tarih</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={subjectLabelStyle}>{selectedField}</td>
                  <td style={tableCellStyle}>
                    <input
                      type="text"
                      value={subjects[0]?.wrongCount || ''}
                      onChange={(e) => handleSubjectChange(0, 'wrongCount', parseInt(e.target.value))}
                      style={inputStyle}
                    />
                  </td>
                  <td style={tableCellStyle}>
                    <input
                      type="text"
                      value={subjects[0]?.emptyCount || ''}
                      onChange={(e) => handleSubjectChange(0, 'emptyCount', parseInt(e.target.value))}
                      style={inputStyle}
                    />
                  </td>
                  <td style={tableCellStyle}>
                    <input
                      type="date"
                      value={subjects[0]?.date || ''}
                      onChange={(e) => handleSubjectChange(0, 'date', e.target.value)}
                      style={inputStyle}
                    />
                  </td>
                </tr>
              </tbody>
            </table>

            <button onClick={handleCalculate} style={{ ...buttonStyle, marginTop: '20px' }}>Net Hesapla</button>
          </div>
        )}

        {results.length > 0 && (
          <div style={{ marginTop: '40px', textAlign: 'center' }}>
            <h2>Sonuçlar</h2>
            <table style={{ borderCollapse: 'collapse', width: '80%', margin: 'auto' }}>
              <thead>
                <tr>
                  <th style={tableHeaderStyle}>Ders</th>
                  <th style={tableHeaderStyle}>Soru Sayısı</th>
                  <th style={tableHeaderStyle}>Doğru</th>
                  <th style={tableHeaderStyle}>Yanlış</th>
                  <th style={tableHeaderStyle}>Boş</th>
                  <th style={tableHeaderStyle}>Net</th>
                  <th style={tableHeaderStyle}>Tarih</th>
                </tr>
              </thead>
              <tbody>
                {results.map((result, index) => (
                  <tr key={index}>
                    <td style={tableCellStyle}>{result.name}</td>
                    <td style={tableCellStyle}>{result.questionCount}</td>
                    <td style={tableCellStyle}>{result.correctCount}</td>
                    <td style={tableCellStyle}>{result.wrongCount}</td>
                    <td style={tableCellStyle}>{result.emptyCount}</td>
                    <td style={tableCellStyle}>{result.net.toFixed(2)}</td>
                    <td style={tableCellStyle}>{result.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

const buttonStyle = {
  backgroundColor: 'white',
  color: '#ff2400',
  border: '2px solid #ff2400',
  borderRadius: '10px',
  padding: '10px 20px',
  cursor: 'pointer',
  fontSize: '16px'
};

const selectedButtonStyle = {
  backgroundColor: '#ff2400',
  color: 'white',
  border: '2px solid #ff2400',
  borderRadius: '10px',
  padding: '10px 20px',
  cursor: 'pointer',
  fontSize: '16px'
};

const labelStyle = {
  fontSize: '18px',
  fontWeight: 'normal',
  display: 'block',
  margin: '10px 0'
};

const subjectLabelStyle = {
  fontSize: '18px',
  fontWeight: 'bold',
  textAlign: 'left'
};

const smallLabelStyle = {
  fontSize: '16px',
  fontWeight: 'normal',
  display: 'block',
  margin: '5px 0'
};

const selectStyle = {
  fontSize: '16px',
  padding: '5px',
  borderRadius: '5px',
  width: '200px'
};

const inputStyle = {
  fontSize: '16px',
  padding: '5px',
  borderRadius: '10px',
  border: '1px solid #ccc',
  width: '120px',
  textAlign: 'center'
};

const tableHeaderStyle = {
  borderBottom: '2px solid #ddd',
  padding: '8px',
  textAlign: 'left'
};

const tableCellStyle = {
  borderBottom: '1px solid #ddd',
  padding: '8px',
  textAlign: 'left'
};

export default ExamSelection;