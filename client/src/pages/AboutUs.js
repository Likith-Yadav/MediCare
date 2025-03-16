import React from 'react';
import { Row, Col, Card, Typography, Avatar, Divider, Timeline, Image } from 'antd';
import { 
  EnvironmentOutlined, 
  PhoneOutlined, 
  MailOutlined, 
  ClockCircleOutlined,
  TeamOutlined,
  TrophyOutlined,
  HeartOutlined,
  SafetyOutlined
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

const AboutUs = () => {
  const teamMembers = [
    {
      name: 'Likith Yadav',
      role: 'Founder & CEO',
      image: 'https://github.com/user-attachments/assets/336d4c5c-6f7c-4eba-a35d-44090b650a1a',
      bio: 'As the founder of MediCare, I am passionate about making healthcare accessible to everyone. With a background in healthcare and technology, I lead our team in creating innovative solutions for patients and doctors.'
    },
  ];

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px' }}>
      <div className="page-header" style={{ marginBottom: 60, textAlign: 'center' }}>
        <Title level={2}>About MediCare</Title>
        <Paragraph style={{ fontSize: 18, maxWidth: 800, margin: '0 auto' }}>
          Connecting patients with quality healthcare professionals since 2020
        </Paragraph>
      </div>

      {/* Mission and Vision */}
      <Row gutter={[32, 32]} style={{ marginBottom: 60 }}>
        <Col xs={24} md={12}>
          <Card 
            title={<Title level={3}>Our Mission</Title>} 
            bordered={false}
            style={{ height: '100%' }}
          >
            <Paragraph style={{ fontSize: 16 }}>
              At MediCare, our mission is to make quality healthcare accessible to everyone. We believe that finding the right doctor should be simple, transparent, and stress-free. Our platform connects patients with qualified healthcare professionals, enabling them to make informed decisions about their health.
            </Paragraph>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card 
            title={<Title level={3}>Our Vision</Title>} 
            bordered={false}
            style={{ height: '100%' }}
          >
            <Paragraph style={{ fontSize: 16 }}>
              We envision a world where everyone has access to quality healthcare without barriers. Through technology and innovation, we aim to transform the healthcare experience, making it more patient-centered, efficient, and effective. We strive to be the most trusted platform for connecting patients and healthcare providers.
            </Paragraph>
          </Card>
        </Col>
      </Row>

      {/* Core Values */}
      <div style={{ marginBottom: 60 }}>
        <Title level={3} style={{ textAlign: 'center', marginBottom: 40 }}>Our Core Values</Title>
        <Row gutter={[24, 24]}>
          <Col xs={24} sm={12} md={6}>
            <Card className="value-card" style={{ textAlign: 'center', height: '100%' }}>
              <HeartOutlined style={{ fontSize: 36, color: '#1890ff', marginBottom: 16 }} />
              <Title level={4}>Patient-Centered</Title>
              <Paragraph>
                We put patients first in everything we do, ensuring their needs and preferences guide our decisions.
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card className="value-card" style={{ textAlign: 'center', height: '100%' }}>
              <SafetyOutlined style={{ fontSize: 36, color: '#52c41a', marginBottom: 16 }} />
              <Title level={4}>Quality</Title>
              <Paragraph>
                We are committed to maintaining the highest standards of healthcare delivery and service excellence.
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card className="value-card" style={{ textAlign: 'center', height: '100%' }}>
              <TeamOutlined style={{ fontSize: 36, color: '#faad14', marginBottom: 16 }} />
              <Title level={4}>Collaboration</Title>
              <Paragraph>
                We foster partnerships between patients, healthcare providers, and our team to achieve better outcomes.
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card className="value-card" style={{ textAlign: 'center', height: '100%' }}>
              <TrophyOutlined style={{ fontSize: 36, color: '#eb2f96', marginBottom: 16 }} />
              <Title level={4}>Innovation</Title>
              <Paragraph>
                We continuously seek new ways to improve healthcare delivery and the patient experience.
              </Paragraph>
            </Card>
          </Col>
        </Row>
      </div>

      {/* Our Story */}
      <div style={{ marginBottom: 60 }}>
        <Title level={3} style={{ textAlign: 'center', marginBottom: 40 }}>Our Story</Title>
        <Row gutter={[32, 32]} align="middle">
          <Col xs={24} md={12}>
            <Paragraph style={{ fontSize: 16 }}>
              MediCare was founded in 2020 with a simple yet powerful idea: to make quality healthcare accessible to everyone. Our founders, a team of healthcare professionals and technology experts, recognized the challenges patients face when trying to find the right doctor and book appointments.
            </Paragraph>
            <Paragraph style={{ fontSize: 16 }}>
              What started as a small platform connecting patients with a handful of doctors has grown into a comprehensive healthcare ecosystem serving thousands of patients and healthcare providers. Throughout our journey, we have remained committed to our core values and mission.
            </Paragraph>
            <Paragraph style={{ fontSize: 16 }}>
              Today, MediCare continues to innovate and expand, always with the goal of improving the healthcare experience for patients and doctors alike. We are proud of how far we've come and excited about the future of healthcare.
            </Paragraph>
          </Col>
          <Col xs={24} md={12}>
            <Timeline
              mode="alternate"
              items={[
                {
                  children: 'Founded MediCare with a vision to transform healthcare access',
                  color: 'green',
                  label: '2020'
                },
                {
                  children: 'Expanded our network to include specialists across multiple disciplines',
                  color: 'green',
                  label: '2021'
                },
                {
                  children: 'Launched our mobile application for easier appointment booking',
                  color: 'green',
                  label: '2022'
                },
                {
                  children: 'Introduced telemedicine services for remote consultations',
                  color: 'green',
                  label: '2023'
                },
                {
                  children: 'Continuing to innovate and improve healthcare access',
                  color: 'blue',
                  label: 'Today'
                }
              ]}
            />
          </Col>
        </Row>
      </div>

      {/* Our Team */}
      <div style={{ marginBottom: 60, textAlign: 'center' }}>
        <Title level={3} style={{ textAlign: 'center', marginBottom: 40 }}>Our Leadership Team</Title>
        <Row gutter={[24, 24]} justify="center">
          {teamMembers.map((member, index) => (
            <Col xs={24} sm={12} md={6} key={index}>
              <Card 
                hoverable
                className="team-card"
                style={{ textAlign: 'center', height: '100%', position: 'relative' }}
                cover={
                  <div style={{ padding: '20px 0' }}>
                    <Avatar 
                      src={member.image} 
                      size={120} 
                      style={{ border: '4px solid #f0f0f0' }}
                    />
                  </div>
                }
              >
                <Title level={4} style={{ marginBottom: 4 }}>{member.name}</Title>
                <Text type="secondary" style={{ display: 'block', marginBottom: 16 }}>{member.role}</Text>
                <Paragraph>{member.bio}</Paragraph>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* Contact Information */}
      <div style={{ marginBottom: 60, textAlign: 'center' }}>
        <Title level={3} style={{ textAlign: 'center', marginBottom: 40 }}>Visit Us</Title>
        <Row justify="center">
          <Col xs={24} md={16} lg={12}>
            <Card bordered={false} style={{ height: '100%', textAlign: 'center' }}>
              <div style={{ marginBottom: 20 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 24 }}>
                  <EnvironmentOutlined style={{ fontSize: 32, color: '#1890ff', marginBottom: 12 }} />
                  <div>
                    <Text strong style={{ display: 'block', fontSize: 18, marginBottom: 8 }}>Our Location</Text>
                    <Text>123 Healthcare Avenue, Koramangala, Bangalore 560034</Text>
                  </div>
                </div>
                <Divider style={{ margin: '16px 0' }} />
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 24 }}>
                  <PhoneOutlined style={{ fontSize: 32, color: '#1890ff', marginBottom: 12 }} />
                  <div>
                    <Text strong style={{ display: 'block', fontSize: 18, marginBottom: 8 }}>Phone</Text>
                    <Text>+91 (080) 123-4567</Text>
                  </div>
                </div>
                <Divider style={{ margin: '16px 0' }} />
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 24 }}>
                  <MailOutlined style={{ fontSize: 32, color: '#1890ff', marginBottom: 12 }} />
                  <div>
                    <Text strong style={{ display: 'block', fontSize: 18, marginBottom: 8 }}>Email</Text>
                    <Text>info@medicare.com</Text>
                  </div>
                </div>
                <Divider style={{ margin: '16px 0' }} />
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <ClockCircleOutlined style={{ fontSize: 32, color: '#1890ff', marginBottom: 12 }} />
                  <div style={{ textAlign: 'center' }}>
                    <Text strong style={{ display: 'block', fontSize: 18, marginBottom: 8 }}>Hours</Text>
                    <Text>Monday - Friday: 9AM - 6PM</Text>
                    <br />
                    <Text>Saturday: 10AM - 4PM</Text>
                    <br />
                    <Text>Sunday: Closed</Text>
                  </div>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default AboutUs; 