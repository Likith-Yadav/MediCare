import React, { useState, useEffect } from 'react';
import { Card, Typography, Tabs, List, Button, Tag, Badge, message, Modal } from 'antd';
import { UserOutlined, ClockCircleOutlined, BellOutlined } from '@ant-design/icons';
import api from '../api/axios';
import moment from 'moment';

const { Title, Text, Paragraph } = Typography;

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [profileModal, setProfileModal] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));

  // Fetch doctor's appointments
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        
        // Get token from localStorage
        const token = localStorage.getItem('token');
        if (!token) {
          return; // Don't fetch if not authenticated
        }
        
        const response = await api.get('/api/v1/appointment/doctor', {
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
      } finally {
        setLoading(false);
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

  const handleStatusChange = async (appointmentId, status) => {
    try {
      // Get token from localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        message.error('You must be logged in to update appointment status');
        return;
      }

      const response = await api.put(`/api/v1/appointment/status`, {
        appointmentId,
        status
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data.success) {
        message.success(`Appointment ${status} successfully`);
        // Refresh appointments
        const updatedResponse = await api.get('/api/v1/appointment/doctor', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setAppointments(updatedResponse.data.data);
      }
    } catch (error) {
      console.error('Failed to update appointment status:', error);
      message.error('Failed to update appointment status');
    }
  };

  const viewPatientProfile = (appointment) => {
    setSelectedAppointment(appointment);
    setProfileModal(true);
  };

  const items = [
    {
      key: 'appointments',
      label: (
        <span>
          <ClockCircleOutlined /> Appointments
        </span>
      ),
      children: (
        <List
          loading={loading}
          itemLayout="horizontal"
          dataSource={appointments}
          renderItem={appointment => (
            <List.Item
              actions={[
                <Button type="primary" onClick={() => viewPatientProfile(appointment)}>
                  View Profile
                </Button>,
                appointment.status === 'pending' && (
                  <>
                    <Button type="primary" onClick={() => handleStatusChange(appointment._id, 'approved')}>
                      Approve
                    </Button>
                    <Button danger onClick={() => handleStatusChange(appointment._id, 'rejected')}>
                      Reject
                    </Button>
                  </>
                )
              ].filter(Boolean)}
            >
              <Card style={{ width: '100%' }}>
                <List.Item.Meta
                  avatar={<UserOutlined style={{ fontSize: '32px' }} />}
                  title={appointment.patientId.name}
                  description={
                    <>
                      <Text>Date: {moment(appointment.date).format('MMMM Do, YYYY')}</Text>
                      <br />
                      <Text>Time: {appointment.time}</Text>
                      <br />
                      {appointment.reason && (
                        <>
                          <Text strong>Reason: </Text>
                          <Text>{appointment.reason}</Text>
                          <br />
                        </>
                      )}
                      {appointment.symptoms && (
                        <>
                          <Text strong>Symptoms: </Text>
                          <Text>{appointment.symptoms}</Text>
                          <br />
                        </>
                      )}
                      <Tag color={appointment.status === 'pending' ? 'gold' : appointment.status === 'approved' ? 'green' : 'red'}>
                        {appointment.status.toUpperCase()}
                      </Tag>
                    </>
                  }
                />
              </Card>
            </List.Item>
          )}
          locale={{ emptyText: loading ? 'Loading...' : 'No appointments' }}
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
      <Title level={2}>Doctor Dashboard</Title>
      <Card className="doctor-info" style={{ marginBottom: '20px' }}>
        <Title level={4}>Dr. {user?.name || 'Doctor'}</Title>
        <Paragraph>
          <Text strong>Email:</Text> {user?.email}
          <br />
          <Text strong>Phone:</Text> {user?.phone}
          <br />
          <Text strong>Specialization:</Text> {user?.specialization || 'Not specified'}
          <br />
          <Text strong>Experience:</Text> {user?.experience || 0} years
          <br />
          <Text strong>Fee per Visit:</Text> ${user?.feePerConsultation || 0}
          <br />
          <Text strong>Timings:</Text> {user?.timings?.[0] || '9:00'} - {user?.timings?.[1] || '17:00'}
        </Paragraph>
      </Card>
      
      <Tabs defaultActiveKey="appointments" items={items} />

      <Modal
        title="Patient Profile"
        open={profileModal}
        onCancel={() => setProfileModal(false)}
        footer={null}
      >
        {selectedAppointment && (
          <Card>
            <Title level={4}>{selectedAppointment.patientId.name}</Title>
            <Paragraph>
              <Text strong>Email:</Text> {selectedAppointment.patientId.email}
              <br />
              <Text strong>Phone:</Text> {selectedAppointment.patientId.phone}
              <br />
              <Text strong>Appointment Date:</Text> {moment(selectedAppointment.date).format('MMMM Do, YYYY')}
              <br />
              <Text strong>Appointment Time:</Text> {selectedAppointment.time}
              <br />
              {selectedAppointment.reason && (
                <>
                  <Text strong>Reason for Visit:</Text> {selectedAppointment.reason}
                  <br />
                </>
              )}
              {selectedAppointment.symptoms && (
                <>
                  <Text strong>Symptoms:</Text> {selectedAppointment.symptoms}
                  <br />
                </>
              )}
              <Text strong>Status:</Text>{' '}
              <Tag color={selectedAppointment.status === 'pending' ? 'gold' : selectedAppointment.status === 'approved' ? 'green' : 'red'}>
                {selectedAppointment.status.toUpperCase()}
              </Tag>
            </Paragraph>
          </Card>
        )}
      </Modal>
    </div>
  );
};

export default DoctorDashboard; 