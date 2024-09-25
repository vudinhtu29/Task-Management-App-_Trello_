import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://localhost:5042/api', // Update this with your API URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
