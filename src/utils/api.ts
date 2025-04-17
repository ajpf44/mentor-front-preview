import axios from "axios"

// o back está configurado para rodar nessa porta
const defaultUrl = "http://localhost:8080"

const api = axios.create({baseURL: defaultUrl});


export default api;
