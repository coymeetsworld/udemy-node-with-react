// header, for now. Will refactor later
import axios from 'axios';
import { FETCH_USER } from './types';


const fetchUser = () => {
  axios.get('/api/current_user'); // path comes from authRoutes.js
  /*
  Under package.json, setup this proxy for ALL api calls.
  "/api/*": {
    "target": "http://localhost:5000"
  }*/
};