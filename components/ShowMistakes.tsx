"use client";
import React, { useState } from 'react';
import { db, doc, getDoc } from '../firebase/config';
import { Button, Select, Table, Typography } from 'antd';

const { Title } = Typography;
const { Option } = Select;

const ShowMistakes = ({ userId }: { userId: string }) => {
  const [userMistakes, setUserMistakes] = useState([]);
  const [totalMistakes, setTotalMistakes] = useState([]);
  const [subjectTotals, setSubjectTotals] = useState({});
  const [reasonTotals, setReasonTotals] = useState({});
  const [selectedSubject, setSelectedSubject] = useState('');

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
      const data = totalsDocSnap.data().mistakeTotals;
      setTotalMistakes(data);

      // Calculate subject totals
      const subjectTotals = data.reduce((acc, mistake) => {
        if (acc[mistake.subject]) {
          acc[mistake.subject] += mistake.totalMistakes;
        } else {
          acc[mistake.subject] = mistake.totalMistakes;
        }
        return acc;
      }, {});
      setSubjectTotals(subjectTotals);

      // Calculate reason totals
      const reasonTotals = data.reduce((acc, mistake) => {
        for (const [reason, count] of Object.entries(mistake.reasonCounts)) {
          if (acc[reason]) {
            acc[reason] += count;
          } else {
            acc[reason] = count;
          }
        }
        return acc;
      }, {});
      setReasonTotals(reasonTotals);

    } else {
      setTotalMistakes([]);
      setSubjectTotals({});
      setReasonTotals({});
    }
  };

  const handleSubjectChange = (value: string) => {
    setSelectedSubject(value);
  };

  const filteredMistakes = totalMistakes.filter(mistake => mistake.subject === selectedSubject);

  const columns = [
    {
      title: 'Topic',
      dataIndex: 'topic',
      key: 'topic',
    },
    {
      title: 'Total Mistakes',
      dataIndex: 'totalMistakes',
      key: 'totalMistakes',
    },
    {
      title: 'Reason Counts',
      dataIndex: 'reasonCounts',
      key: 'reasonCounts',
      render: (text: any, record: any) => (
        Object.entries(record.reasonCounts).map(([reason, count], idx) => (
          <div key={idx}>
            {reason}: {count}
          </div>
        ))
      ),
    }
  ];

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '20px' }}>
      <Title level={2} style={{ textAlign: 'center', color: '#d32f2f' }}>Show Mistakes</Title>
      <Button type="primary" onClick={fetchUserMistakes} style={{ display: 'block', margin: '20px auto' }}>
        Show Mistakes
      </Button>

      {userMistakes.length > 0 && (
        <div style={{ marginBottom: 20, overflowX: 'auto', border: '1px solid #ddd', padding: '10px', borderRadius: '4px' }}>
          <Title level={4} style={{ color: '#d32f2f' }}>User Mistakes</Title>
          <Table dataSource={userMistakes} pagination={false} rowKey="index">
            <Table.Column title="Subject" dataIndex="subject" key="subject" />
            <Table.Column title="Topic" dataIndex="topic" key="topic" />
            <Table.Column title="Exam Name" dataIndex="examName" key="examName" />
            <Table.Column title="Mistake Count" dataIndex="mistakeCount" key="mistakeCount" />
            <Table.Column title="Mistake Reason" dataIndex="mistakeReason" key="mistakeReason" />
          </Table>
        </div>
      )}

      {Object.keys(subjectTotals).length > 0 && (
        <div style={{ marginBottom: 20, overflowX: 'auto', border: '1px solid #ddd', padding: '10px', borderRadius: '4px' }}>
          <Title level={4} style={{ color: '#d32f2f' }}>Total Mistakes by Subject</Title>
          <Table dataSource={Object.entries(subjectTotals).map(([subject, total], index) => ({ subject, total }))} pagination={false} rowKey="subject">
            <Table.Column title="Subject" dataIndex="subject" key="subject" />
            <Table.Column title="Total Mistakes" dataIndex="total" key="total" />
          </Table>
        </div>
      )}

      {Object.keys(reasonTotals).length > 0 && (
        <div style={{ marginBottom: 20, overflowX: 'auto', border: '1px solid #ddd', padding: '10px', borderRadius: '4px' }}>
          <Title level={4} style={{ color: '#d32f2f' }}>Total Mistakes by Reason</Title>
          <Table dataSource={Object.entries(reasonTotals).map(([reason, total], index) => ({ reason, total }))} pagination={false} rowKey="reason">
            <Table.Column title="Mistake Reason" dataIndex="reason" key="reason" />
            <Table.Column title="Total Mistakes" dataIndex="total" key="total" />
          </Table>
        </div>
      )}

      <div style={{ marginBottom: 20 }}>
        <label htmlFor="subject" style={{ fontWeight: 'bold', marginBottom: 8, display: 'block' }}>Select Subject</label>
        <Select id="subject" onChange={handleSubjectChange} style={{ width: '100%' }} placeholder="Select Subject">
          {Object.keys(subjectTotals).map((subject, index) => (
            <Option key={index} value={subject}>{subject}</Option>
          ))}
        </Select>
      </div>

      {selectedSubject && filteredMistakes.length > 0 && (
        <div style={{ overflowX: 'auto', border: '1px solid #ddd', padding: '10px', borderRadius: '4px' }}>
          <Title level={4} style={{ color: '#d32f2f' }}>Total Mistakes for {selectedSubject}</Title>
          <Table dataSource={filteredMistakes} columns={columns} pagination={false} rowKey="topic" />
        </div>
      )}
    </div>
  );
};

export default ShowMistakes;
