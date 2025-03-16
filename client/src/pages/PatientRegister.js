import React from 'react';
import { Form, Input, Button, Card, Typography, message, DatePicker } from 'antd';
import { useNavigate } from 'react-router-dom';
import { UserOutlined, MailOutlined, LockOutlined, PhoneOutlined } from '@ant-design/icons';
import api from '../api/axios';
import moment from 'moment';
import '../styles/Register.css';

const { Title, Text } = Typography;

const PatientRegister = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      // Format date of birth
      const formattedValues = {
        ...values,
        dateOfBirth: values.dateOfBirth.format('YYYY-MM-DD'),
        userType: 'patient'  // Add user type for backend
      };

      const response = await api.post('/api/v1/user/register', formattedValues);
      
      if (response.data?.success) {
        message.success('Patient Registration Successful!');
        navigate('/login');
      } else {
        message.error(response.data?.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      message.error(error.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      className="register-form"
    >
      <Form.Item
        name="name"
        rules={[{ required: true, message: 'Please input your name!' }]}
      >
        <Input prefix={<UserOutlined />} placeholder="Full Name" size="large" />
      </Form.Item>

      <Form.Item
        name="email"
        rules={[
          { required: true, message: 'Please input your email!' },
          { type: 'email', message: 'Please enter a valid email!' }
        ]}
      >
        <Input prefix={<MailOutlined />} placeholder="Email" size="large" />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[
          { required: true, message: 'Please input your password!' },
          { min: 6, message: 'Password must be at least 6 characters!' }
        ]}
      >
        <Input.Password prefix={<LockOutlined />} placeholder="Password" size="large" />
      </Form.Item>

      <Form.Item
        name="phone"
        rules={[{ required: true, message: 'Please input your phone number!' }]}
      >
        <Input prefix={<PhoneOutlined />} placeholder="Phone Number" size="large" />
      </Form.Item>

      <Form.Item
        name="dateOfBirth"
        rules={[{ required: true, message: 'Please select your date of birth!' }]}
      >
        <DatePicker 
          placeholder="Date of Birth"
          size="large"
          style={{ width: '100%' }}
          disabledDate={current => current && current > moment().endOf('day')}
        />
      </Form.Item>

      <Form.Item
        name="address"
        rules={[{ required: true, message: 'Please input your address!' }]}
      >
        <Input.TextArea 
          placeholder="Address"
          rows={3}
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block size="large">
          Register as Patient
        </Button>
      </Form.Item>

      <div className="text-center">
        <Text>Already have an account? </Text>
        <Button type="link" onClick={() => navigate('/login')}>
          Login here
        </Button>
      </div>
    </Form>
  );
};

export default PatientRegister; 