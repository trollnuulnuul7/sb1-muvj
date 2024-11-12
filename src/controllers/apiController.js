export const healthCheck = (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
};

export const testEndpoint = (req, res) => {
  res.json({
    status: 'API is working!',
    timestamp: new Date().toISOString()
  });
};