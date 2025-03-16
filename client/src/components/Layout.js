import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Layout as AntLayout, Menu, Button, Dropdown, Avatar, Space } from 'antd';
import { UserOutlined, DownOutlined, MedicineBoxOutlined, LogoutOutlined, DashboardOutlined } from '@ant-design/icons';
import '../styles/Layout.css';

const { Header, Content, Footer } = AntLayout;

const Layout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const userMenuItems = [
    {
      key: 'dashboard',
      label: 'Dashboard',
      icon: <DashboardOutlined />,
      onClick: () => navigate(user?.userType === 'doctor' ? '/doctor-dashboard' : '/patient-dashboard')
    },
    {
      key: 'logout',
      label: 'Logout',
      icon: <LogoutOutlined />,
      onClick: handleLogout
    }
  ];

  const menuItems = [
    {
      key: '/',
      label: 'Home'
    },
    {
      key: '/doctors',
      label: 'Find Doctors'
    },
    {
      key: '/about',
      label: 'About Us'
    },
    {
      key: '/contact',
      label: 'Contact'
    }
  ];

  return (
    <AntLayout className="layout-wrapper">
      <Header className="header">
        <div className="logo">
          <Link to="/">
            <Space>
              <MedicineBoxOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
              <h1 className="brand-text">MediCare</h1>
            </Space>
          </Link>
        </div>
        
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={({ key }) => navigate(key)}
        />
        
        <div className="auth-buttons">
          {user ? (
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
              <Button type="text" style={{ color: 'white' }}>
                <Space>
                  <Avatar icon={<UserOutlined />} />
                  {user.name}
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>
          ) : (
            <>
              <Button type="primary" ghost onClick={() => navigate('/login')}>
                Login
              </Button>
              <Button type="primary" onClick={() => navigate('/register')}>
                Register
              </Button>
            </>
          )}
        </div>
      </Header>
      
      <Content className="site-content">
        {children}
      </Content>

      <Footer style={{ textAlign: 'center', background: '#001529', color: 'white', padding: '24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', marginBottom: '20px' }}>
            <div style={{ minWidth: '200px', marginBottom: '20px' }}>
              <h3 style={{ color: 'white' }}>MediCare</h3>
              <p>Your trusted healthcare partner</p>
            </div>
            <div style={{ minWidth: '200px', marginBottom: '20px' }}>
              <h4 style={{ color: 'white' }}>Quick Links</h4>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li><Link to="/" style={{ color: 'rgba(255,255,255,0.65)' }}>Home</Link></li>
                <li><Link to="/doctors" style={{ color: 'rgba(255,255,255,0.65)' }}>Find Doctors</Link></li>
                <li><Link to="/about" style={{ color: 'rgba(255,255,255,0.65)' }}>About Us</Link></li>
              </ul>
            </div>
            <div style={{ minWidth: '200px', marginBottom: '20px' }}>
              <h4 style={{ color: 'white' }}>Contact</h4>
              <p>Email: support@medicare.com</p>
              <p>Phone: +1 (555) 123-4567</p>
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }}>
            MediCare © {new Date().getFullYear()} - All Rights Reserved
          </div>
        </div>
      </Footer>
    </AntLayout>
  );
};

export default Layout; 