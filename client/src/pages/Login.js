import React from 'react';
import { Form, Input, Button, Card, Typography, message, Tabs } from 'antd';
import { useNavigate } from 'react-router-dom';
import { UserOutlined, LockOutlined, MedicineBoxOutlined } from '@ant-design/icons';
import api from '../api/axios';
import '../styles/Register.css';

const { Title, Text } = Typography;

const Login = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const response = await api.post('/api/v1/user/login', values);
      
      if (response.data?.success) {
        // Store user data with proper type
        const userData = {
          ...response.data.data,
          userType: values.userType
        };
        
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(userData));
        
        message.success('Login Successful!');
        
        // Redirect based on user type
        navigate(values.userType === 'doctor' ? '/doctor-dashboard' : '/patient-dashboard');
      } else {
        message.error(response.data?.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      message.error(error.response?.data?.message || 'Invalid credentials');
    }
  };

  const items = [
    {
      key: 'patient',
      label: (
        <span>
          <UserOutlined />
          Patient Login
        </span>
      ),
      children: (
        <LoginForm 
          form={form} 
          onFinish={(values) => onFinish({ ...values, userType: 'patient' })}
          userType="patient"
        />
      )
    },
    {
      key: 'doctor',
      label: (
        <span>
          <MedicineBoxOutlined />
          Doctor Login
        </span>
      ),
      children: (
        <LoginForm 
          form={form} 
          onFinish={(values) => onFinish({ ...values, userType: 'doctor' })}
          userType="doctor"
        />
      )
    }
  ];

  return (
    <div className="register-container">
      <Card className="register-card">
        <Title level={2} className="text-center">Welcome Back</Title>
        <Text className="description">
          Login to access your healthcare account
        </Text>

        <Tabs defaultActiveKey="patient" items={items} centered />
      </Card>
    </div>
  );
};

const LoginForm = ({ form, onFinish, userType }) => {
  const navigate = useNavigate();

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      className="register-form"
    >
      <Form.Item
        name="email"
        rules={[
          { required: true, message: 'Please input your email!' },
          { type: 'email', message: 'Please enter a valid email!' }
        ]}
      >
        <Input 
          prefix={<UserOutlined />} 
          placeholder="Email" 
          size="large"
        />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[
          { required: true, message: 'Please input your password!' }
        ]}
      >
        <Input.Password 
          prefix={<LockOutlined />} 
          placeholder="Password" 
          size="large"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block size="large">
          Login
        </Button>
      </Form.Item>

      <div className="text-center">
        <Text>Don't have an account? </Text>
        <Button 
          type="link" 
          onClick={() => navigate(userType === 'doctor' ? '/doctor-register' : '/patient-register')}
        >
          Register here
        </Button>
      </div>
    </Form>
  );
};

export default Login;
