import axios from "axios";

const API_URL = "http://localhost:8000/api";

const predict = async (data) => {
  const fileRequest = {
    fileName: data.fileName,
    fileUrl: data.fileUrl,
    storagePath: data.storagePath,
  };

  const response = await axios.post(`${API_URL}/predict`, fileRequest);
  return response.data;
};

const getResult = async (id) => {
  const response = await axios.get(`${API_URL}/results/${id}`);
  return response.data;
};

const getResults = async () => {
  const response = await axios.get(`${API_URL}/results`);
  return response.data;
};

const classifierService = {
  predict,
  getResult,
  getResults,
};

export default classifierService;
