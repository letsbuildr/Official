const redis = require('redis');

const client = redis.createClient({
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
  },
});

client.on('connect', () => {
  console.log('Connected to Redis...');
});
client.on('error', (err) => console.log('Redis Client Error', err));

(async () => {
  try {
    await client.connect();
  } catch (err) {
    console.error('Redis connection error:', err);
  }
})();

module.exports = client;
