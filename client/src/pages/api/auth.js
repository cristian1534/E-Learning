import axios from 'axios';

const urlBase = "http://localhost:5000/api";

export async function registerUser(user) {
  console.log(user);
  if (user) {
    try {
      const response = await axios.post(`${urlBase}/auth/register`, user);

      return response.data;

    } catch (error) {
      console.error('Error al registrar el usuario:', error);
      throw error;
    }
  } else {
    throw new Error("User is null");
  }
}



export async function loginUser({ email, password }) {
  if (email && password) {
    try {
      const response = await axios.post(`${urlBase}/auth/login`, { email, password });
      return response.data;

    } catch (error) {
      console.error('Error al realiazr el login:', error);
      throw error;
    }
  } else {
    throw new Error("email && password null");
  }
}

