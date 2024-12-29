import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:80/' });

export const translateEnToAr = (text) => API.post('/translate/en2ar/', { text });
export const translateArToEn = (text) => API.post('/translate/ar2en/', { text });
export const summarize = (text) => API.post('/summarize/', { text });
