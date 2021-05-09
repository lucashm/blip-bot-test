import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.GITHUB_URL,
  headers: {
    Accept: 'application/vnd.github.v3+json', // enforce v3 api version
  },
  ...(process.env.GITHUB_TOKEN && { auth: `token ${process.env.GITHUB_TOKEN}` }), // add auth if token is available
});

export default instance;
