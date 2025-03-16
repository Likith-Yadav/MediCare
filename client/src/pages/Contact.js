import React from 'react';
import { Row, Col, Form, Input, Button, Card, Typography, Divider, message } from 'antd';
import { 
  EnvironmentOutlined, 
  PhoneOutlined, 
  MailOutlined, 
  ClockCircleOutlined,
  SendOutlined,
  UserOutlined,
  CommentOutlined,
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  LinkedinOutlined
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;

const Contact = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Form values:', values);
    message.success('Your message has been sent! We will get back to you soon.');
    form.resetFields();
  };

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px' }}>
      <div className="page-header" style={{ marginBottom: 60, textAlign: 'center' }}>
        <Title level={2}>Contact Us</Title>
        <Paragraph style={{ fontSize: 18, maxWidth: 800, margin: '0 auto' }}>
          We're here to help! Reach out to us with any questions, feedback, or support needs.
        </Paragraph>
      </div>

      <Row gutter={[32, 32]}>
        {/* Contact Information */}
        <Col xs={24} md={10}>
          <Card bordered={false} style={{ height: '100%' }}>
            <Title level={3} style={{ marginBottom: 24 }}>Get in Touch</Title>
            
            <div style={{ marginBottom: 40 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 24 }}>
                <EnvironmentOutlined style={{ fontSize: 24, marginRight: 16, color: '#1890ff', marginTop: 4 }} />
                <div>
                  <Text strong style={{ display: 'block', fontSize: 18, marginBottom: 8 }}>Our Location</Text>
                  <Paragraph style={{ margin: 0 }}>
                    123 Healthcare Avenue<br />
                    Medical District<br />
                    Los Angeles, CA 90210
                  </Paragraph>
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 24 }}>
                <PhoneOutlined style={{ fontSize: 24, marginRight: 16, color: '#1890ff', marginTop: 4 }} />
                <div>
                  <Text strong style={{ display: 'block', fontSize: 18, marginBottom: 8 }}>Phone</Text>
                  <Paragraph style={{ margin: 0 }}>
                    Main: +1 (555) 123-4567<br />
                    Support: +1 (555) 987-6543
                  </Paragraph>
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 24 }}>
                <MailOutlined style={{ fontSize: 24, marginRight: 16, color: '#1890ff', marginTop: 4 }} />
                <div>
                  <Text strong style={{ display: 'block', fontSize: 18, marginBottom: 8 }}>Email</Text>
                  <Paragraph style={{ margin: 0 }}>
                    General Inquiries: info@medicare.com<br />
                    Support: support@medicare.com<br />
                    Partnerships: partners@medicare.com
                  </Paragraph>
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                <ClockCircleOutlined style={{ fontSize: 24, marginRight: 16, color: '#1890ff', marginTop: 4 }} />
                <div>
                  <Text strong style={{ display: 'block', fontSize: 18, marginBottom: 8 }}>Hours</Text>
                  <Paragraph style={{ margin: 0 }}>
                    Monday - Friday: 9AM - 6PM<br />
                    Saturday: 10AM - 4PM<br />
                    Sunday: Closed
                  </Paragraph>
                </div>
              </div>
            </div>
            
            <Divider />
            
            <Title level={4} style={{ marginBottom: 16 }}>Connect With Us</Title>
            <Paragraph>
              Follow us on social media for the latest updates, health tips, and more.
            </Paragraph>
            <div style={{ display: 'flex', gap: 16 }}>
              <Button type="primary" shape="circle" icon={<FacebookOutlined />} />
              <Button type="primary" shape="circle" icon={<TwitterOutlined />} />
              <Button type="primary" shape="circle" icon={<InstagramOutlined />} />
              <Button type="primary" shape="circle" icon={<LinkedinOutlined />} />
            </div>
          </Card>
        </Col>
        
        {/* Contact Form */}
        <Col xs={24} md={14}>
          <Card bordered={false}>
            <Title level={3} style={{ marginBottom: 24 }}>Send Us a Message</Title>
            <Paragraph style={{ marginBottom: 24 }}>
              Fill out the form below and we'll get back to you as soon as possible.
            </Paragraph>
            
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              requiredMark={false}
            >
              <Row gutter={16}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="firstName"
                    label="First Name"
                    rules={[{ required: true, message: 'Please enter your first name' }]}
                  >
                    <Input prefix={<UserOutlined />} placeholder="Enter your first name" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="lastName"
                    label="Last Name"
                    rules={[{ required: true, message: 'Please enter your last name' }]}
                  >
                    <Input prefix={<UserOutlined />} placeholder="Enter your last name" />
                  </Form.Item>
                </Col>
              </Row>
              
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: 'Please enter your email' },
                  { type: 'email', message: 'Please enter a valid email' }
                ]}
              >
                <Input prefix={<MailOutlined />} placeholder="Enter your email" />
              </Form.Item>
              
              <Form.Item
                name="phone"
                label="Phone Number"
                rules={[{ required: true, message: 'Please enter your phone number' }]}
              >
                <Input prefix={<PhoneOutlined />} placeholder="Enter your phone number" />
              </Form.Item>
              
              <Form.Item
                name="subject"
                label="Subject"
                rules={[{ required: true, message: 'Please enter a subject' }]}
              >
                <Input placeholder="What is your message about?" />
              </Form.Item>
              
              <Form.Item
                name="message"
                label="Message"
                rules={[{ required: true, message: 'Please enter your message' }]}
              >
                <TextArea 
                  prefix={<CommentOutlined />} 
                  placeholder="How can we help you?" 
                  rows={6} 
                />
              </Form.Item>
              
              <Form.Item>
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  icon={<SendOutlined />} 
                  size="large"
                  block
                >
                  Send Message
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
      
      {/* FAQ Section */}
      <div style={{ marginTop: 60 }}>
        <Title level={3} style={{ textAlign: 'center', marginBottom: 40 }}>Frequently Asked Questions</Title>
        <Row gutter={[24, 24]}>
          <Col xs={24} md={8}>
            <Card bordered={false} style={{ height: '100%' }}>
              <Title level={4}>How do I book an appointment?</Title>
              <Paragraph>
                You can book an appointment by creating an account, browsing available doctors, and selecting a convenient time slot. Our booking process is designed to be simple and user-friendly.
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card bordered={false} style={{ height: '100%' }}>
              <Title level={4}>Can I reschedule my appointment?</Title>
              <Paragraph>
                Yes, you can reschedule your appointment through your patient dashboard. Please note that rescheduling should be done at least 24 hours before your scheduled appointment time.
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card bordered={false} style={{ height: '100%' }}>
              <Title level={4}>How do I become a doctor on MediCare?</Title>
              <Paragraph>
                Healthcare professionals can join our platform by registering as a doctor and completing the verification process. Please contact our partnerships team for more information.
              </Paragraph>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Contact; 