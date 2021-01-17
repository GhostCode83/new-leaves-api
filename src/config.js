module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  // DATABASE_URL: process.env.DATABASE_URL || 'postgresql://postgres@localhost/new_leaves',
  DATABASE_URL: process.env.DATABASE_URL || 'postgresql://dpdqbggzrwkayz@ec2-3-220-23-212.compute-1.amazonaws.com/new_leaves',
  TEST_DATABASE_URL: process.env.TEST_DATABASE_URL || 'postgresql://postgres@localhost/new_leaves_test',
  JWT_SECRET: process.env.JWT_SECRET || 'change-this-secret',
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || 'https://new-leaves-app.vercel.app/'
}
