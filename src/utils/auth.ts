import axios from "axios"
import api from "./api.ts"

export type UserType = "adm" | "mentor" | "mentorado";

interface User {
  id: string;
  name: string;
  email: string;
  role: UserType;
  profileImage?: string;
  description: string;
  job?: string;
}

// Verifica se o usuário está autenticado
export const isUserLoggedIn = (): boolean => {
  return localStorage.getItem("user_session") !== null;
};

// Verifica o tipo do usuário autenticado
export const getUserType = (): UserType | null => {
  const userSession = localStorage.getItem("user_session");
  if (!userSession) return null;
  
  try {
    const user = JSON.parse(userSession);
    return user.role;
  } catch (error) {
    return null;
  }
};

// Verifica se o usuário é um administrador
export const isAdminLoggedIn = (): boolean => {
  return getUserType() === "adm";
};

// Verifica se o usuário é um mentor
export const isMentorLoggedIn = (): boolean => {
  return getUserType() === "mentor";
};

// Verifica se o usuário é um mentorado
export const isMenteeLoggedIn = (): boolean => {
  return getUserType() === "mentorado";
};

// Obtém os dados do usuário autenticado
export const getLoggedUser = (): User | null => {
  const userSession = localStorage.getItem("user_session");
  if (!userSession) return null;
  
  try {
    return JSON.parse(userSession);
  } catch (error) {
    return null;
  }
};

// Realiza o login do usuário
export const loginUser = async(email: string, password: string): Promise<User> | null => {
  
  let user: User|null = null;
  try{
    const dataReq = {
      email: email,
      password: password
    }
    const res = await api.post("/users/login", dataReq); 
    //const res = await axios.post('http://localhost:8080/users/login', dataReq);
    const response = res.data;

    console.log("Sucess fetching /users/login")
    console.log(res.data);
    console.log('status: ' + res.status);

    // o back nessa versão retorna status 200 para sucesso ou falha
    // isso já foi corrigido, mas agurdar o merge
    if(res.status >= 200 && res.status < 300)
      user = res.data
    else
      console.log(res.data);

  }catch(err){
    console.error("Error fetching " + '/users/login' + err)
  }

  if (user) {
    localStorage.setItem("user_session", JSON.stringify(user));

    // Se for admin, também definir a sessão de admin para compatibilidade
    if (user.role === "adm") {
      localStorage.setItem("admin_session", "true");
    }

    return user;
  }

  return null;
};

// Realiza o logout do usuário
export const logoutUser = (): void => {
  localStorage.removeItem("user_session");
  localStorage.removeItem("admin_session");
};
