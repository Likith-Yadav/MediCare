import React from 'react';
import { Form, Input, Button, Card, Typography, message, TimePicker, InputNumber, Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import { UserOutlined, MailOutlined, LockOutlined, PhoneOutlined, DollarOutlined } from '@ant-design/icons';
import api from '../api/axios';
import moment from 'moment';
import '../styles/Register.css';

const { Title, Text } = Typography;
const { Option } = Select;

const specializations = [
  'Cardiologist',
  'Dermatologist',
  'Neurologist',
  'Pediatrician',
  'Psychiatrist',
  'Orthopedic',
  'Gynecologist',
  'General Physician'
];

const DoctorRegister = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      // Format timings to string array and add doctor type
      const formattedValues = {
        ...values,
        timings: [
          values.timings[0].format('HH:mm'),
          values.timings[1].format('HH:mm')
        ],
        userType: 'doctor',
        isDoctor: true
      };

      const response = await api.post('/api/v1/user/register', formattedValues);
      
      if (response.data?.success) {
        message.success('Doctor Registration Successful!');
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
        name="specialization"
        rules={[{ required: true, message: 'Please select your specialization!' }]}
      >
        <Select placeholder="Select Specialization" size="large">
          {specializations.map(spec => (
            <Option key={spec} value={spec}>{spec}</Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="experience"
        rules={[{ required: true, message: 'Please input your years of experience!' }]}
      >
        <InputNumber 
          min={0} 
          placeholder="Years of Experience" 
          size="large" 
          style={{ width: '100%' }}
        />
      </Form.Item>

      <Form.Item
        name="feePerConsultation"
        rules={[{ required: true, message: 'Please input your consultation fee!' }]}
      >
        <InputNumber
          prefix={<DollarOutlined />}
          min={0}
          placeholder="Consultation Fee"
          size="large"
          style={{ width: '100%' }}
        />
      </Form.Item>

      <Form.Item
        name="timings"
        rules={[{ required: true, message: 'Please select your consultation hours!' }]}
      >
        <TimePicker.RangePicker 
          format="HH:mm"
          size="large"
          style={{ width: '100%' }}
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block size="large">
          Register as Doctor
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

export default DoctorRegister; 