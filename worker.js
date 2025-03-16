addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

/**
 * Respond to the request
 * @param {Request} request
 */
async function handleRequest(request) {
  // Set CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  }

  // Handle OPTIONS request
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: corsHeaders
    })
  }

  // Add CORS headers to all responses
  const url = new URL(request.url)
  
  try {
    // Route the request to the appropriate handler
    if (url.pathname.startsWith('/api/v1/user')) {
      return handleUserRoutes(request, corsHeaders)
    } else if (url.pathname.startsWith('/api/v1/appointment')) {
      return handleAppointmentRoutes(request, corsHeaders)
    } else {
      return new Response('Not Found', {
        status: 404,
        headers: {
          ...corsHeaders,
          'Content-Type': 'text/plain'
        }
      })
    }
  } catch (error) {
    return new Response(JSON.stringify({ success: false, message: error.message }), {
      status: 500,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json'
      }
    })
  }
}

/**
 * Handle user-related routes
 * @param {Request} request
 * @param {Object} corsHeaders
 */
async function handleUserRoutes(request, corsHeaders) {
  const url = new URL(request.url)
  
  // Mock user data - in production, this would come from a database
  const mockDoctors = [
    {
      _id: '1',
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@example.com',
      phone: '123-456-7890',
      userType: 'doctor',
      specialization: 'Cardiology',
      experience: 12,
      feePerConsultation: 150,
      timings: ['9:00 AM', '5:00 PM'],
      isAvailable: true,
      password: 'password123' // In a real app, this would be hashed
    },
    {
      _id: '2',
      name: 'Dr. Michael Chen',
      email: 'michael.chen@example.com',
      phone: '123-456-7891',
      userType: 'doctor',
      specialization: 'Dermatology',
      experience: 8,
      feePerConsultation: 120,
      timings: ['10:00 AM', '6:00 PM'],
      isAvailable: true,
      password: 'password123' // In a real app, this would be hashed
    },
    {
      _id: '3',
      name: 'Dr. Emily Rodriguez',
      email: 'emily.rodriguez@example.com',
      phone: '123-456-7892',
      userType: 'doctor',
      specialization: 'Pediatrics',
      experience: 15,
      feePerConsultation: 130,
      timings: ['8:00 AM', '4:00 PM'],
      isAvailable: true,
      password: 'password123' // In a real app, this would be hashed
    }
  ]

  // Mock patient data
  const mockPatients = [
    {
      _id: '201',
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '123-456-7893',
      userType: 'patient',
      password: 'password123' // In a real app, this would be hashed
    },
    {
      _id: '202',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '123-456-7894',
      userType: 'patient',
      password: 'password123' // In a real app, this would be hashed
    }
  ]

  // Handle different endpoints
  if (url.pathname === '/api/v1/user/doctors' && request.method === 'GET') {
    return new Response(JSON.stringify({
      success: true,
      message: 'Doctors List Fetched Successfully',
      data: mockDoctors.map(doctor => {
        // Remove password from response
        const { password, ...doctorWithoutPassword } = doctor;
        return doctorWithoutPassword;
      })
    }), {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json'
      }
    })
  }
  
  // Handle login endpoint
  if (url.pathname === '/api/v1/user/login' && request.method === 'POST') {
    try {
      const requestBody = await request.json();
      const { email, password, userType } = requestBody;
      
      // Determine which user collection to check based on userType
      const userCollection = userType === 'doctor' ? mockDoctors : mockPatients;
      
      // Find user by email
      const user = userCollection.find(u => u.email === email);
      
      if (!user) {
        return new Response(JSON.stringify({
          success: false,
          message: 'User not found'
        }), {
          status: 404,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json'
          }
        });
      }
      
      // Check password (in a real app, you would compare hashed passwords)
      if (user.password !== password) {
        return new Response(JSON.stringify({
          success: false,
          message: 'Invalid credentials'
        }), {
          status: 401,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json'
          }
        });
      }
      
      // Generate a mock token (in a real app, you would use JWT)
      const token = 'mock-jwt-token-' + Date.now();
      
      // Remove password from user object before sending response
      const { password: userPassword, ...userWithoutPassword } = user;
      
      return new Response(JSON.stringify({
        success: true,
        message: 'Login successful',
        token,
        data: userWithoutPassword
      }), {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      });
    } catch (error) {
      return new Response(JSON.stringify({
        success: false,
        message: 'Error processing login request: ' + error.message
      }), {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      });
    }
  }
  
  // Add more route handlers as needed
  
  return new Response('Not Found', {
    status: 404,
    headers: {
      ...corsHeaders,
      'Content-Type': 'text/plain'
    }
  })
}

/**
 * Handle appointment-related routes
 * @param {Request} request
 * @param {Object} corsHeaders
 */
async function handleAppointmentRoutes(request, corsHeaders) {
  const url = new URL(request.url)
  
  // Mock appointment data
  const mockAppointments = [
    {
      _id: '101',
      doctorId: '1',
      patientId: '201',
      patientName: 'John Doe',
      doctorName: 'Dr. Sarah Johnson',
      date: '2023-06-15',
      time: '10:00 AM',
      status: 'pending'
    }
  ]
  
  // Handle different endpoints
  if (url.pathname === '/api/v1/appointment/get-appointments' && request.method === 'GET') {
    return new Response(JSON.stringify({
      success: true,
      message: 'Appointments Fetched Successfully',
      data: mockAppointments
    }), {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json'
      }
    })
  }
  
  // Add more route handlers as needed
  
  return new Response('Not Found', {
    status: 404,
    headers: {
      ...corsHeaders,
      'Content-Type': 'text/plain'
    }
  })
} 