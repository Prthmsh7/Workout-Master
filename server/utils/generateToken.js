import jwt from 'jsonwebtoken';

// Generate a JWT token for authentication
const generateToken = (res, userId) => {
  // Create token
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });

  // Set HTTP-only cookie
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
  });

  return token;
};

export default generateToken; 