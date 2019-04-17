const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/api', (req, res) => {
  res.json({
    message: 'Bem vindo à API'
  });
});

app.post('/api/posts', verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if(err){
      res.sendStatus(403);
    } else {
      res.json({
        message: 'Post criado...',
        authData
      });
    }
  });
});

app.post('/api/login', (req, res) => {
  // Mock user
  const user = {
    id: 1,
    username: 'marcos',
    email: 'marcos10@outlook.com'
  }

  jwt.sign({user}, 'secretkey', { expiresIn: '10m' } (err, token) => {
    res.json({
      token
    });
  });
});

// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

// Verify Token
function verifyToken(req, res, next){
  // Get outh header value
  const bearerHeader = req.headers['authorization'];
  // Check if bearer is undefined
  if (typeof bearerHeader !== 'undefined'){
    // Split at the space
    const bearer = bearerHeader.split(' ');
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerHeader;
    // Next middleware
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }
}

app.listen(5000, () => console.log('Servidor iniciou na porta 5000'));
