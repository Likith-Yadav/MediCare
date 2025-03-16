import React, { useState, useEffect } from 'react';
import { Card, Typography, Tabs, List, Button, Modal, Form, DatePicker, TimePicker, message, Badge, Tag, Input } from 'antd';
import { UserOutlined, ClockCircleOutlined, BellOutlined } from '@ant-design/icons';
import api from '../api/axios';
import moment from 'moment';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

// Mock data for fallback
const mockDoctors = [
  {
    _id: '1',
    name: 'John Smith',
    specialization: 'Cardiologist',
    experience: 10,
    feePerConsultation: 100,
    phone: '123-456-7890',
    timings: ['9:00 AM', '5:00 PM']
  },
  {
    _id: '2',
    name: 'Sarah Johnson',
    specialization: 'Dermatologist',
    experience: 8,
    feePerConsultation: 90,
    phone: '123-456-7891',
    timings: ['10:00 AM', '6:00 PM']
  },
  {
    _id: '3',
    name: 'Michael Brown',
    specialization: 'Neurologist',
    experience: 15,
    feePerConsultation: 120,
    phone: '123-456-7892',
    timings: ['8:00 AM', '4:00 PM']
  }
];

const PatientDashboard = () => {
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [appointmentModal, setAppointmentModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [form] = Form.useForm();
  const user = JSON.parse(localStorage.getItem('user'));

  // Fetch doctors list
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        
        const response = await api.get('/api/v1/user/doctors');
        if (response.data?.success) {
          setDoctors(response.data.data);
        } else {
          // If API call fails, use mock data
          setDoctors(mockDoctors);
        }
      } catch (error) {
        // Use mock data as fallback
        setDoctors(mockDoctors);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
    
    // Set up polling for real-time updates
    const interval = setInterval(fetchDoctors, 30000); // Poll every 30 seconds
    
    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // Fetch patient's appointments
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        // Get token from localStorage
        const token = localStorage.getItem('token');
        if (!token) {
          return; // Don't fetch if not authenticated
        }
        
        const response = await api.get('/api/v1/appointment/patient', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        if (response.data?.success) {
          setAppointments(response.data.data);
        }
      } catch (error) {
        // Silently handle error - don't show message
        console.error('Failed to fetch appointments:', error);
      }
    };

    fetchAppointments();
    
    // Set up polling for real-time updates
    const interval = setInterval(fetchAppointments, 10000); // Poll every 10 seconds
    
    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // Fetch notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        // Get token from localStorage
        const token = localStorage.getItem('token');
        if (!token) {
          return; // Don't fetch if not authenticated
        }
        
        const response = await api.get('/api/v1/user/notifications', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        if (response.data?.success) {
          setNotifications(response.data.data);
        }
      } catch (error) {
        // Silently handle error - don't show message
        console.error('Failed to fetch notifications:', error);
      }
    };

    fetchNotifications();
    
    // Set up polling for real-time updates
    const interval = setInterval(fetchNotifications, 5000); // Poll every 5 seconds
    
    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const handleBookAppointment = (doctor) => {
    setSelectedDoctor(doctor);
    setAppointmentModal(true);
  };

  const handleAppointmentSubmit = async (values) => {
    try {
      const appointmentData = {
        doctorId: selectedDoctor._id,
        date: values.date.format('YYYY-MM-DD'),
        time: values.time.format('HH:mm'),
        reason: values.reason || '',
        symptoms: values.symptoms || ''
      };

      // For mock data, just show success message
      if (selectedDoctor._id.startsWith('1') || selectedDoctor._id.startsWith('2') || selectedDoctor._id.startsWith('3')) {
        message.success('Appointment booked successfully');
        setAppointmentModal(false);
        form.resetFields();
        
        // Add mock appointment to the list
        const mockAppointment = {
          _id: Date.now().toString(),
          doctorId: {
            name: selectedDoctor.name
          },
          date: values.date.format('YYYY-MM-DD'),
          time: values.time.format('HH:mm'),
          status: 'pending'
        };
        
        setAppointments([mockAppointment, ...appointments]);
        return;
      }

      // Get token from localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        message.error('You must be logged in to book an appointment');
        return;
      }

      // Try API call for real data
      const response = await api.post('/api/v1/appointment/create', appointmentData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if (response.data.success) {
        message.success('Appointment booked successfully');
        setAppointmentModal(false);
        form.resetFields();
        // Refresh appointments
        try {
          const updatedAppointments = await api.get('/api/v1/appointment/patient', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setAppointments(updatedAppointments.data.data);
        } catch (error) {
          console.error('Error refreshing appointments:', error);
        }
      }
    } catch (error) {
      console.error('Error booking appointment:', error);
      message.error('Failed to book appointment');
    }
  };

  const items = [
    {
      key: 'doctors',
      label: 'Available Doctors',
      children: (
        <List
          loading={loading}
          itemLayout="horizontal"
          dataSource={doctors}
          renderItem={doctor => (
            <List.Item
              actions={[
                <Button type="primary" onClick={() => handleBookAppointment(doctor)}>
                  Book Appointment
                </Button>
              ]}
            >
              <List.Item.Meta
                avatar={<UserOutlined style={{ fontSize: '32px' }} />}
                title={`Dr. ${doctor.name}`}
                description={
                  <>
                    <Text>Specialization: {doctor.specialization}</Text>
                    <br />
                    <Text>Experience: {doctor.experience} years</Text>
                    <br />
                    <Text>Fee per Visit: ${doctor.feePerConsultation}</Text>
                    <br />
                    <Text>Phone: {doctor.phone}</Text>
                    <br />
                    <Text>Timings: {doctor.timings?.[0]} - {doctor.timings?.[1]}</Text>
                  </>
                }
              />
            </List.Item>
          )}
          locale={{ 
            emptyText: loading ? 'Loading doctors...' : 'No doctors available at the moment' 
          }}
        />
      )
    },
    {
      key: 'appointments',
      label: (
        <span>
          <ClockCircleOutlined /> My Appointments
        </span>
      ),
      children: (
        <List
          itemLayout="horizontal"
          dataSource={appointments}
          renderItem={appointment => (
            <List.Item>
              <Card style={{ width: '100%' }}>
                <List.Item.Meta
                  title={`Dr. ${appointment.doctorId.name}`}
                  description={
                    <>
                      <Text>Date: {moment(appointment.date).format('MMMM Do, YYYY')}</Text>
                      <br />
                      <Text>Time: {appointment.time}</Text>
                      <br />
                      <Tag color={appointment.status === 'pending' ? 'gold' : appointment.status === 'approved' ? 'green' : 'red'}>
                        {appointment.status.toUpperCase()}
                      </Tag>
                    </>
                  }
                />
              </Card>
            </List.Item>
          )}
        />
      )
    },
    {
      key: 'notifications',
      label: (
        <span>
          <Badge count={notifications.filter(n => !n.read).length}>
            <BellOutlined /> Notifications
          </Badge>
        </span>
      ),
      children: (
        <List
          itemLayout="horizontal"
          dataSource={notifications}
          renderItem={notification => (
            <List.Item>
              <List.Item.Meta
                title={notification.title}
                description={notification.message}
              />
              <Text type="secondary">{moment(notification.createdAt).fromNow()}</Text>
            </List.Item>
          )}
        />
      )
    }
  ];

  return (
    <div style={{ padding: '20px' }}>
      <Title level={2}>Patient Dashboard</Title>
      
      <Card className="patient-info" style={{ marginBottom: '20px' }}>
        <Title level={4}>{user?.name || 'Patient'}</Title>
        <div>
          <Text strong>Email:</Text> {user?.email}
          <br />
          <Text strong>Phone:</Text> {user?.phone}
          <br />
          {user?.dateOfBirth && (
            <>
              <Text strong>Date of Birth:</Text> {moment(user.dateOfBirth).format('MMMM Do, YYYY')}
              <br />
            </>
          )}
        </div>
      </Card>
      
      <Tabs defaultActiveKey="doctors" items={items} />

      <Modal
        title={`Book Appointment with Dr. ${selectedDoctor?.name}`}
        open={appointmentModal}
        onCancel={() => {
          setAppointmentModal(false);
          form.resetFields();
        }}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleAppointmentSubmit}
        >
          <Form.Item
            name="date"
            label="Date"
            rules={[{ required: true, message: 'Please select a date' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="time"
            label="Time"
            rules={[{ required: true, message: 'Please select a time' }]}
          >
            <TimePicker format="HH:mm" style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="reason"
            label="Reason for Visit"
          >
            <Input.TextArea rows={2} placeholder="Briefly describe the reason for your visit" />
          </Form.Item>
          <Form.Item
            name="symptoms"
            label="Symptoms"
          >
            <Input.TextArea rows={3} placeholder="Describe any symptoms you're experiencing" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Book Appointment
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PatientDashboard; 