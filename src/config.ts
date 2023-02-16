import dotenv from 'dotenv';
dotenv.config();

const config = {
  GUILD_ID: '624836560247848970',
  CLIENT_ID: '899179130413801503',
  TOKEN: process.env.TOKEN || '',
};

export default config;
