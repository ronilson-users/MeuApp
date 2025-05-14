// context/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true); // loading true por padrão
const [errorMessage, setErrorMessage] = useState("");

useEffect(() => {
const loadUserData = async () => {
try {
const token = await AsyncStorage.getItem("userToken");
if (token) {
const response = await axios.get(
"http://localhost:4000/auth/me",
{
headers: { Authorization: `Bearer ${token}` }
}
);
setUser(response.data.user);
}
} catch (error) {
console.log("Erro ao validar token", error);
await AsyncStorage.clear();
setUser(null);
} finally {
setLoading(false);
}
};
loadUserData();
}, []);

const signIn = async (email, password) => {
setLoading(true);
setErrorMessage("");
try {
const response = await axios.post(
"http://localhost:4000/auth/login",
{ email, password }
);
if (response.data.token) {
await AsyncStorage.multiSet([
["userToken", response.data.token],
["userId", String(response.data.user.id)],
["userEmail", response.data.user.email]
]);
setUser(response.data.user);
return true; // sucesso
}
} catch (error) {
setErrorMessage(
error.response?.data?.message || "Erro ao fazer login"
);
return false; // falha
} finally {
setLoading(false);
}
};

const signUp = async (name, cpf, email, password) => {
setLoading(true);
setErrorMessage("");
console.log("Iniciando cadastro...", { name, cpf, email }); // Log de início

try {
const response = await axios.post(
"http://localhost:4000/auth/register",
{
name,
cpf,
email,
password
}
);
console.log("Resposta da API:", response.data); // Log da resposta

if (response.data.token) {
await AsyncStorage.multiSet([
["userToken", response.data.token],
["userId", String(response.data.user.id)],
["userEmail", response.data.user.email]
]);
console.log("Dados salvos no AsyncStorage"); // Confirmação de storage
setUser(response.data.user);
}
} catch (error) {
const errorMsg =
error.response?.data?.message || "Erro ao fazer cadastro";
console.error("Erro no cadastro:", errorMsg, error); // Log detalhado do erro
setErrorMessage(errorMsg);
} finally {
setLoading(false);
console.log("Processo de cadastro finalizado"); // Log de finalização
}
};

const signOut = async () => {
await AsyncStorage.clear();
setUser(null);
};

return (
<AuthContext.Provider
 value={{
 user,
 loading,
 errorMessage,
 signIn,
 signUp,
 signOut
 }}
 >
            {children}
        </AuthContext.Provider>
);
};