// Mock Authentication Service for Frontend-Only Operation
// This replaces backend API calls with localStorage-based authentication

// Generate a simple mock token
const generateMockToken = (userId) => {
  const timestamp = Date.now();
  const randomStr = Math.random().toString(36).substring(7);
  return `mock_token_${userId}_${timestamp}_${randomStr}`;
};

// Mock user database (in real app, this would be in backend)
const MOCK_USERS_KEY = 'lawfull_mock_users';
const CURRENT_USER_KEY = 'lawfull_current_user';
const AUTH_TOKEN_KEY = 'token';

// Initialize mock users if not exists
const initializeMockUsers = () => {
  const existingUsers = localStorage.getItem(MOCK_USERS_KEY);
  if (!existingUsers) {
    const defaultUsers = [
      {
        id: 'user_001',
        name: 'John Smith',
        email: 'john@example.com',
        password: 'password123', // In real app, this would be hashed
        phone: '+1 (555) 123-4567',
        location: 'New York, USA',
        role: 'student',
        createdAt: new Date('2024-01-15').toISOString(),
        profileImage: null
      },
      {
        id: 'user_002',
        name: 'Sarah Johnson',
        email: 'sarah@example.com',
        password: 'password123',
        phone: '+1 (555) 234-5678',
        location: 'Los Angeles, USA',
        role: 'student',
        createdAt: new Date('2024-02-20').toISOString(),
        profileImage: null
      },
      {
        id: 'user_003',
        name: 'Michael Chen',
        email: 'michael@example.com',
        password: 'password123',
        phone: '+1 (555) 345-6789',
        location: 'San Francisco, USA',
        role: 'student',
        createdAt: new Date('2024-03-10').toISOString(),
        profileImage: null
      }
    ];
    localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(defaultUsers));
  }
};

// Get all mock users
const getMockUsers = () => {
  initializeMockUsers();
  const users = localStorage.getItem(MOCK_USERS_KEY);
  return JSON.parse(users || '[]');
};

// Save mock users
const saveMockUsers = (users) => {
  localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(users));
};

// Mock Login
export const mockLogin = async (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = getMockUsers();
      const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
      
      if (!user) {
        reject({
          response: {
            data: {
              message: 'User not found. Please check your email or register.'
            }
          }
        });
        return;
      }
      
      if (user.password !== password) {
        reject({
          response: {
            data: {
              message: 'Incorrect password. Please try again.'
            }
          }
        });
        return;
      }
      
      // Generate token
      const token = generateMockToken(user.id);
      
      // Remove password before sending user data
      const { password: _, ...userWithoutPassword } = user;
      
      // Store current user and token
      localStorage.setItem(AUTH_TOKEN_KEY, token);
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));
      
      resolve({
        data: {
          success: true,
          token,
          user: userWithoutPassword,
          message: 'Login successful'
        }
      });
    }, 800); // Simulate network delay
  });
};

// Mock Register
export const mockRegister = async (name, email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = getMockUsers();
      
      // Check if user already exists
      const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (existingUser) {
        reject({
          response: {
            status: 409,
            data: {
              message: 'Email already registered. Please use a different email or try logging in.'
            }
          }
        });
        return;
      }
      
      // Create new user
      const newUser = {
        id: `user_${Date.now()}`,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password, // In real app, this would be hashed
        phone: '',
        location: '',
        role: 'student',
        createdAt: new Date().toISOString(),
        profileImage: null
      };
      
      // Add to users array
      users.push(newUser);
      saveMockUsers(users);
      
      // Generate token
      const token = generateMockToken(newUser.id);
      
      // Remove password before sending user data
      const { password: _, ...userWithoutPassword } = newUser;
      
      // Store current user and token
      localStorage.setItem(AUTH_TOKEN_KEY, token);
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));
      
      resolve({
        data: {
          success: true,
          token,
          user: userWithoutPassword,
          message: 'Registration successful'
        }
      });
    }, 1000); // Simulate network delay
  });
};

// Mock Get Current User
export const mockGetCurrentUser = () => {
  const user = localStorage.getItem(CURRENT_USER_KEY);
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  
  if (!user || !token) {
    return null;
  }
  
  return JSON.parse(user);
};

// Mock Update User Profile
export const mockUpdateProfile = async (updates) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const currentUser = mockGetCurrentUser();
      if (!currentUser) {
        reject({
          response: {
            data: {
              message: 'User not authenticated'
            }
          }
        });
        return;
      }
      
      const users = getMockUsers();
      const userIndex = users.findIndex(u => u.id === currentUser.id);
      
      if (userIndex === -1) {
        reject({
          response: {
            data: {
              message: 'User not found'
            }
          }
        });
        return;
      }
      
      // Update user
      users[userIndex] = {
        ...users[userIndex],
        ...updates,
        id: currentUser.id, // Preserve ID
        email: currentUser.email, // Preserve email
        password: users[userIndex].password // Preserve password
      };
      
      saveMockUsers(users);
      
      // Remove password before sending
      const { password: _, ...updatedUser } = users[userIndex];
      
      // Update current user in storage
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser));
      
      resolve({
        data: {
          success: true,
          user: updatedUser,
          message: 'Profile updated successfully'
        }
      });
    }, 600);
  });
};

// Mock Logout
export const mockLogout = () => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(CURRENT_USER_KEY);
};

// Check if user is authenticated
export const isAuthenticated = () => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  return !!token;
};

// Get stored token
export const getStoredToken = () => {
  return localStorage.getItem(AUTH_TOKEN_KEY);
};

export default {
  mockLogin,
  mockRegister,
  mockGetCurrentUser,
  mockUpdateProfile,
  mockLogout,
  isAuthenticated,
  getStoredToken
};
