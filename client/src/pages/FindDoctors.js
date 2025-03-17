import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Card, Select, Input, Button, Tag, Rate, Avatar, Divider, Typography, Empty, Spin, notification } from 'antd';
import { UserOutlined, PhoneOutlined, MailOutlined, ClockCircleOutlined, DollarOutlined, SearchOutlined, FilterOutlined, HeartOutlined, HeartFilled } from '@ant-design/icons';
import api from '../api/axios';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { Meta } = Card;

const FindDoctors = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch doctors from the database
    const fetchDoctors = async () => {
      setLoading(true);
      setError('');
      
      try {
        const response = await api.get('/api/v1/user/doctors');
        
        if (response.data?.success) {
          const doctorData = response.data.data;
          setDoctors(doctorData);
          setFilteredDoctors(doctorData);
          
          // Extract unique specialties from doctor data
          const uniqueSpecialties = [...new Set(doctorData.map(doctor => doctor.specialization))];
          setSpecialties(uniqueSpecialties);
        } else {
          setError('Failed to fetch doctors');
          notification.error({
            message: 'Error',
            description: 'Failed to fetch doctors from the server',
          });
        }
      } catch (error) {
        console.error('Error fetching doctors:', error);
        setError('Error connecting to the server');
        notification.error({
          message: 'Server Error',
          description: error.response?.data?.message || 'Failed to connect to the server',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();

    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem('favoriteDoctors');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  useEffect(() => {
    filterDoctors();
  }, [selectedSpecialty, searchQuery, doctors]);

  const filterDoctors = () => {
    if (!doctors.length) return;
    
    let filtered = [...doctors];
    
    if (selectedSpecialty) {
      filtered = filtered.filter(doctor => doctor.specialization === selectedSpecialty);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(doctor => 
        doctor.name?.toLowerCase().includes(query) || 
        doctor.specialization?.toLowerCase().includes(query)
      );
    }
    
    setFilteredDoctors(filtered);
  };

  const handleSpecialtyChange = (value) => {
    setSelectedSpecialty(value);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const toggleFavorite = (doctorId) => {
    let newFavorites = [...favorites];
    
    if (newFavorites.includes(doctorId)) {
      newFavorites = newFavorites.filter(id => id !== doctorId);
      notification.success({
        message: 'Removed from favorites',
        description: 'Doctor has been removed from your favorites list.',
        placement: 'bottomRight',
      });
    } else {
      newFavorites.push(doctorId);
      notification.success({
        message: 'Added to favorites',
        description: 'Doctor has been added to your favorites list.',
        placement: 'bottomRight',
      });
    }
    
    setFavorites(newFavorites);
    localStorage.setItem('favoriteDoctors', JSON.stringify(newFavorites));
  };

  const handleBookAppointment = (doctor) => {
    // Store selected doctor in localStorage or state management
    localStorage.setItem('selectedDoctor', JSON.stringify(doctor));
    
    // Navigate to appointment booking page
    navigate('/patient-dashboard');
  };

  const renderDoctorCard = (doctor) => {
    const isFavorite = favorites.includes(doctor._id);
    
    return (
      <Col xs={24} sm={12} lg={8} xl={6} key={doctor._id} style={{ marginBottom: 24 }}>
        <Card
          hoverable
          className="doctor-card"
          cover={
            <div style={{ height: 200, overflow: 'hidden', position: 'relative' }}>
              <img 
                alt={doctor.name} 
                src={doctor.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(doctor.name)}&background=random`} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(doctor.name)}&background=random`;
                }}
              />
              <Button
                type="text"
                icon={isFavorite ? <HeartFilled style={{ color: '#ff4d4f' }} /> : <HeartOutlined />}
                onClick={() => toggleFavorite(doctor._id)}
                style={{ 
                  position: 'absolute', 
                  top: 10, 
                  right: 10,
                  background: 'rgba(255, 255, 255, 0.8)',
                  borderRadius: '50%',
                  width: 32,
                  height: 32,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              />
            </div>
          }
          actions={[
            <Button type="primary" block onClick={() => handleBookAppointment(doctor)}>
              Book Appointment
            </Button>
          ]}
        >
          <Meta
            title={
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text strong style={{ fontSize: 16 }}>{doctor.name}</Text>
                <Rate disabled defaultValue={doctor.rating || 4.5} style={{ fontSize: 12 }} />
              </div>
            }
            description={
              <>
                <Tag color="blue">{doctor.specialization}</Tag>
                <div style={{ marginTop: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
                    <ClockCircleOutlined style={{ marginRight: 8, color: '#1890ff' }} />
                    <Text type="secondary">{doctor.experience || 'N/A'} years experience</Text>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
                    <DollarOutlined style={{ marginRight: 8, color: '#52c41a' }} />
                    <Text type="secondary">${doctor.feePerConsultation || 'N/A'} per consultation</Text>
                  </div>
                </div>
                <Paragraph ellipsis={{ rows: 2 }} style={{ marginTop: 12 }}>
                  {doctor.about || `Dr. ${doctor.name} is a specialist in ${doctor.specialization}.`}
                </Paragraph>
              </>
            }
          />
        </Card>
      </Col>
    );
  };

  return (
    <div className="find-doctors-container" style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px' }}>
      <div className="page-header" style={{ marginBottom: 40 }}>
        <Title level={2}>Find Doctors</Title>
        <Paragraph>
          Search for the best doctors in your area based on specialty, experience, and patient reviews.
        </Paragraph>
      </div>

      <Card className="search-filters" style={{ marginBottom: 40 }}>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} md={8}>
            <Select
              placeholder="Select Specialty"
              style={{ width: '100%' }}
              onChange={handleSpecialtyChange}
              value={selectedSpecialty}
              allowClear
            >
              {specialties.map(specialty => (
                <Option key={specialty} value={specialty}>{specialty}</Option>
              ))}
            </Select>
          </Col>
          <Col xs={24} md={12}>
            <Input
              placeholder="Search by doctor name or specialty"
              prefix={<SearchOutlined />}
              onChange={handleSearchChange}
              value={searchQuery}
            />
          </Col>
          <Col xs={24} md={4}>
            <Button 
              type="primary" 
              icon={<FilterOutlined />} 
              onClick={filterDoctors}
              block
            >
              Filter
            </Button>
          </Col>
        </Row>
      </Card>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px 0' }}>
          <Spin size="large" />
          <div style={{ marginTop: 16 }}>Loading doctors...</div>
        </div>
      ) : error ? (
        <div style={{ textAlign: 'center', padding: '40px 0' }}>
          <Empty
            description={
              <span>
                {error}
                <br />
                <Button type="primary" onClick={() => window.location.reload()} style={{ marginTop: 16 }}>
                  Try Again
                </Button>
              </span>
            }
          />
        </div>
      ) : filteredDoctors.length > 0 ? (
        <Row gutter={[24, 24]}>
          {filteredDoctors.map(doctor => renderDoctorCard(doctor))}
        </Row>
      ) : (
        <Empty
          description="No doctors found matching your criteria"
          style={{ margin: '40px 0' }}
        />
      )}
    </div>
  );
};

export default FindDoctors; 