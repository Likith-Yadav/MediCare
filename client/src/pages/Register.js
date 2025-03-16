import React from 'react';
import { Card, Typography, Tabs } from 'antd';
import { UserOutlined, MedicineBoxOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import DoctorRegister from './DoctorRegister';
import PatientRegister from './PatientRegister';
import '../styles/Register.css';

const { Title, Text } = Typography;

const Register = () => {
  const navigate = useNavigate();

  const items = [
    {
      key: 'patient',
      label: (
        <span>
          <UserOutlined />
          Register as Patient
        </span>
      ),
      children: <PatientRegister />
    },
    {
      key: 'doctor',
      label: (
        <span>
          <MedicineBoxOutlined />
          Register as Doctor
        </span>
      ),
      children: <DoctorRegister />
    }
  ];

  return (
    <div className="register-container">
      <Card className="register-card">
        <Title level={2} className="text-center">Create Account</Title>
        <Text className="description">
          Register to join our healthcare platform
        </Text>

        <Tabs defaultActiveKey="patient" items={items} centered />
      </Card>
    </div>
  );
};

export default Register;
