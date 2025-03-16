import React from 'react';
import { Row, Col, Card, Button, Typography, Space, Carousel, Divider, Avatar, Rate } from 'antd';
import { useNavigate } from 'react-router-dom';
import {
  UserOutlined,
  MedicineBoxOutlined,
  CalendarOutlined,
  SafetyOutlined,
  LoginOutlined,
  UserAddOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  TeamOutlined,
  HeartOutlined,
  PhoneOutlined,
  MailOutlined
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <CalendarOutlined className="feature-icon" />,
      title: 'Easy Scheduling',
      description: 'Book appointments with just a few clicks, anytime and anywhere'
    },
    {
      icon: <UserOutlined className="feature-icon" />,
      title: 'Expert Specialists',
      description: 'Connect with experienced healthcare professionals across all specialties'
    },
    {
      icon: <MedicineBoxOutlined className="feature-icon" />,
      title: 'Comprehensive Care',
      description: 'Wide range of medical specialties available to meet all your healthcare needs'
    },
    {
      icon: <SafetyOutlined className="feature-icon" />,
      title: 'Secure & Private',
      description: 'Your health data is protected with enterprise-grade security measures'
    }
  ];

  const specialties = [
    { name: 'Cardiology', icon: <HeartOutlined />, count: 12 },
    { name: 'Neurology', icon: <MedicineBoxOutlined />, count: 8 },
    { name: 'Pediatrics', icon: <TeamOutlined />, count: 15 },
    { name: 'Dermatology', icon: <SafetyOutlined />, count: 10 },
    { name: 'Orthopedics', icon: <MedicineBoxOutlined />, count: 9 },
    { name: 'Psychiatry', icon: <UserOutlined />, count: 7 }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Patient',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      rating: 5,
      text: 'The booking process was incredibly smooth. I found a specialist quickly and got an appointment the same week. Highly recommended!'
    },
    {
      name: 'Dr. Michael Chen',
      role: 'Cardiologist',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      rating: 5,
      text: 'As a doctor, this platform has streamlined my practice. Patient management is easier than ever, and the scheduling system is intuitive.'
    },
    {
      name: 'Robert Williams',
      role: 'Patient',
      avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
      rating: 4,
      text: 'I appreciate how easy it is to find doctors by specialty and book appointments. The reminders are also very helpful.'
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Patients' },
    { number: '500+', label: 'Doctors' },
    { number: '30+', label: 'Specialties' },
    { number: '24/7', label: 'Support' }
  ];

  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="hero-section">
        <Row gutter={[32, 32]} align="middle">
          <Col xs={24} lg={12}>
            <div className="hero-content">
              <Title level={1} className="hero-title">
                Healthcare Made <span className="text-primary">Simple</span>
              </Title>
              <Paragraph className="hero-text">
                Connect with top healthcare professionals in your area. 
                Book appointments, manage your health records, and receive 
                quality care - all in one secure platform.
              </Paragraph>
              <div className="hero-features">
                <div className="hero-feature">
                  <CheckCircleOutlined className="hero-feature-icon" />
                  <span>Verified Specialists</span>
                </div>
                <div className="hero-feature">
                  <ClockCircleOutlined className="hero-feature-icon" />
                  <span>24/7 Booking</span>
                </div>
                <div className="hero-feature">
                  <SafetyOutlined className="hero-feature-icon" />
                  <span>Secure Platform</span>
                </div>
              </div>
              <Space size="large" className="hero-buttons">
                <Button type="primary" size="large" icon={<LoginOutlined />} onClick={() => navigate('/login')}>
                  Sign In
                </Button>
                <Button size="large" icon={<UserAddOutlined />} onClick={() => navigate('/register')}>
                  Create Account
                </Button>
              </Space>
            </div>
          </Col>
          <Col xs={24} lg={12} className="hero-image-container">
            <img 
              src="https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg" 
              alt="Healthcare Professionals" 
              className="hero-image"
            />
          </Col>
        </Row>
      </div>

      {/* Stats Section */}
      <div className="stats-section">
        <Row gutter={[32, 32]} justify="center">
          {stats.map((stat, index) => (
            <Col xs={12} md={6} key={index}>
              <div className="stat-item">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            </Col>
          ))}
        </Row>
      </div>

      {/* User Type Selection */}
      <div className="user-type-section">
        <Title level={2} className="section-title">Get Started Today</Title>
        <Paragraph className="section-subtitle">
          Join our healthcare platform as a patient or doctor and experience seamless healthcare management
        </Paragraph>
        <Row gutter={[32, 32]} justify="center">
          <Col xs={24} sm={12} md={10} lg={8}>
            <Card 
              hoverable 
              className="role-card patient-card"
              onClick={() => navigate('/register')}
            >
              <UserOutlined className="role-icon" />
              <Title level={3}>For Patients</Title>
              <ul className="role-features">
                <li><CheckCircleOutlined /> Find specialists near you</li>
                <li><CheckCircleOutlined /> Book appointments online</li>
                <li><CheckCircleOutlined /> Manage your medical history</li>
                <li><CheckCircleOutlined /> Receive appointment reminders</li>
              </ul>
              <Button type="primary" block size="large">
                Register as Patient
              </Button>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={10} lg={8}>
            <Card 
              hoverable 
              className="role-card doctor-card"
              onClick={() => navigate('/register')}
            >
              <MedicineBoxOutlined className="role-icon" />
              <Title level={3}>For Doctors</Title>
              <ul className="role-features">
                <li><CheckCircleOutlined /> Manage your practice online</li>
                <li><CheckCircleOutlined /> Organize patient appointments</li>
                <li><CheckCircleOutlined /> Access patient records securely</li>
                <li><CheckCircleOutlined /> Grow your patient network</li>
              </ul>
              <Button type="primary" block size="large">
                Register as Doctor
              </Button>
            </Card>
          </Col>
        </Row>
      </div>

      {/* Features Section */}
      <div className="features-section">
        <Title level={2} className="section-title">Why Choose Our Platform</Title>
        <Paragraph className="section-subtitle">
          We provide a comprehensive healthcare management system designed for both patients and doctors
        </Paragraph>
        <Row gutter={[32, 32]}>
          {features.map((feature, index) => (
            <Col xs={24} sm={12} lg={6} key={index}>
              <Card className="feature-card" hoverable>
                <div className="feature-icon-wrapper">
                  {feature.icon}
                </div>
                <Title level={4}>{feature.title}</Title>
                <Paragraph>{feature.description}</Paragraph>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* Specialties Section */}
      <div className="specialties-section">
        <Title level={2} className="section-title">Medical Specialties</Title>
        <Paragraph className="section-subtitle">
          Connect with specialists across a wide range of medical fields
        </Paragraph>
        <Row gutter={[24, 24]}>
          {specialties.map((specialty, index) => (
            <Col xs={12} sm={8} md={4} key={index}>
              <Card className="specialty-card" hoverable>
                <div className="specialty-icon">
                  {specialty.icon}
                </div>
                <Title level={5}>{specialty.name}</Title>
                <Text type="secondary">{specialty.count} Doctors</Text>
              </Card>
            </Col>
          ))}
        </Row>
        <div className="view-all-container">
          <Button type="primary" size="large" onClick={() => navigate('/login')}>
            View All Specialties
          </Button>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="how-it-works-section">
        <Title level={2} className="section-title">How It Works</Title>
        <Paragraph className="section-subtitle">
          Getting started with our platform is quick and easy
        </Paragraph>
        <Row gutter={[32, 32]} justify="center">
          <Col xs={24} md={8}>
            <Card className="step-card">
              <div className="step-number-container">
                <div className="step-number">1</div>
              </div>
              <Title level={4}>Create Your Account</Title>
              <Paragraph>
                Sign up as a patient or doctor with your basic information and verify your email
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card className="step-card">
              <div className="step-number-container">
                <div className="step-number">2</div>
              </div>
              <Title level={4}>Find Your Specialist</Title>
              <Paragraph>
                Browse through our extensive list of qualified healthcare professionals by specialty
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card className="step-card">
              <div className="step-number-container">
                <div className="step-number">3</div>
              </div>
              <Title level={4}>Book Your Appointment</Title>
              <Paragraph>
                Select a convenient time slot, add your symptoms, and confirm your appointment
              </Paragraph>
            </Card>
          </Col>
        </Row>
      </div>

      {/* Testimonials Section */}
      <div className="testimonials-section">
        <Title level={2} className="section-title">What Our Users Say</Title>
        <Paragraph className="section-subtitle">
          Hear from patients and doctors who use our platform
        </Paragraph>
        <Carousel autoplay dots={true} className="testimonial-carousel">
          {testimonials.map((testimonial, index) => (
            <div key={index}>
              <Card className="testimonial-card">
                <div className="testimonial-header">
                  <Avatar size={64} src={testimonial.avatar} />
                  <div className="testimonial-info">
                    <Title level={4}>{testimonial.name}</Title>
                    <Text type="secondary">{testimonial.role}</Text>
                    <Rate disabled defaultValue={testimonial.rating} />
                  </div>
                </div>
                <Paragraph className="testimonial-text">
                  "{testimonial.text}"
                </Paragraph>
              </Card>
            </div>
          ))}
        </Carousel>
      </div>

      {/* CTA Section */}
      <div className="cta-section">
        <Title level={2}>Ready to Transform Your Healthcare Experience?</Title>
        <Paragraph>
          Join thousands of patients and doctors who are already using our platform
        </Paragraph>
        <Space size="large">
          <Button type="primary" size="large" onClick={() => navigate('/register')}>
            Get Started Now
          </Button>
          <Button size="large" onClick={() => navigate('/login')}>
            Sign In
          </Button>
        </Space>
      </div>

      {/* Contact Section */}
      <div className="contact-section">
        <Row gutter={[32, 32]} align="middle">
          <Col xs={24} md={12}>
            <Title level={3}>Have Questions?</Title>
            <Paragraph>
              Our support team is here to help you with any questions or concerns
            </Paragraph>
            <div className="contact-info">
              <p><PhoneOutlined /> +1 (800) 123-4567</p>
              <p><MailOutlined /> support@healthcarebooking.com</p>
            </div>
          </Col>
          <Col xs={24} md={12}>
            <Card className="contact-card">
              <Title level={4}>Contact Us</Title>
              <Paragraph>
                Fill out the form below and we'll get back to you as soon as possible
              </Paragraph>
              <Button type="primary" block size="large" onClick={() => navigate('/login')}>
                Send Message
              </Button>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Home; 