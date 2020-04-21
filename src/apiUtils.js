import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const handleError = (err) => {
  console.error(err);
  throw err;
};

export async function get(endpoint, playerToken = null) {
  try {
    const headers = playerToken ? { "X-CurrentPlayerToken": playerToken } : {};
    const response = await axiosInstance.get(endpoint, { headers });
    return response;
  } catch (error) {
    handleError(error);
  }
}

export async function post(endpoint, data, playerToken = null) {
  try {
    const headers = playerToken ? { "X-CurrentPlayerToken": playerToken } : {};
    const response = await axiosInstance.post(endpoint, data, { headers });
    return response;
  } catch (error) {
    handleError(error);
  }
}

export async function put(endpoint, data) {
  try {
    const response = await axiosInstance.put(endpoint, data);
    return response;
  } catch (error) {
    handleError(error);
  }
}

export async function del(endpoint, data) {
  try {
    const response = await axiosInstance.delete(endpoint);
    return response;
  } catch (error) {
    handleError(error);
  }
}
