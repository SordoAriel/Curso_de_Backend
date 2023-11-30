import dotenv from 'dotenv';
import program from './commander.js';

const env = program.opts().mode;

dotenv.config({
    path: 
    env === 'dev' ? '.env.development' : 
    env === 'test' ? '.env.testing' : 
    env === 'prod' ? '.env.production' : console.log('No environment detected')
});

export default {
    mongo_uri: process.env.MONGO_URI,
    google_client_id: process.env.GOOGLE_CLIENT_ID,
    google_client_secret: process.env.GOOGLE_CLIENT_SECRET,
    google_callback_url: process.env.GOOGLE_CALLBACK_URL
}
