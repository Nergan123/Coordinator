function loadEnv() {
    if (process.env.NODE_ENV === 'production') {
        require('dotenv').config({ path: '.env' });
    } else {
        require('dotenv').config({ path: '.env' });
    }
}

export default loadEnv;