// import axios from "axios";
// import { baseURL } from "./constants";
// import { clearUserSession, retrieveUserSession, storeUserSession } from "./tokens";
// import useAuthStore from "../store/useAuthStore";
// import { navigateAndReset } from "../navigation/navigationService";

import { ToastAndroid } from "react-native";
import { navigateAndReset } from "../navigation/navigationService";
import useAuthStore from "../store/useAuthStore";
import { baseURL } from "./constants";
import { clearUserSession, storeUserSession } from "./tokens";


// const api = axios.create({
//     baseURL: `${baseURL}/api`,
//     timeout: 10000,
// })


// api.interceptors.request.use(
//     async config => {
//         const {accessToken} = await retrieveUserSession();
//         if (accessToken) {
//             config.headers.Authorization = `Bearer ${accessToken}`;
//         }
//         return config;
//     },
//     error => Promise.reject(error)
// );

// api.interceptors.response.use(
//     response => response,
//     async error => {
//         const originalRequest = error.config;

//         // Only retry once
//         if (
//             error.response?.status === 401 &&
//             !originalRequest._retry &&
//             !(originalRequest.url?.includes('refresh'))
//         ) {
//             originalRequest._retry = true;

//             try {
//                 const {accessToken,refreshToken} = await retrieveUserSession();
//                 if (!refreshToken) throw new Error('No refresh token');

//                 // Request new access token
//                 const response = await axios.post(`${baseURL}/api/auth/refershToken`, {
//                     accessToken,
//                 });

//                 const newAccessToken = response.data.data.accessToken;
//                 // Save tokens
//                 await storeUserSession({
//                     accessToken: newAccessToken,
//                     refreshToken,
//                 });
//                 // Retry the original request
//                 originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//                 return api(originalRequest);
//             } catch (refreshError) {
//                 // ❌ Refresh token failed, force logout
//                 await clearUserSession();
//                 useAuthStore.getState().logout();
//                 // You can redirect user to login screen here
//                 navigateAndReset("SignIn")
//                 console.warn('Session expired. Please log in again.');
//             }
//         }
//         return Promise.reject(error);
//     }
// )

// export default api;




// fetchInterceptor.js
let accessToken = null;
let refreshToken = null;

// Call this to set tokens after login
export function setTokens({ access, refresh }) {
    accessToken = access;
    refreshToken = refresh;
}

// Custom fetch wrapper
export async function customFetch(url: string, method: string, body: any = null) {
    // 1. Add Authorization header if token exists
    const fullUrl = baseURL + url;
    const headers = {
        "Content-Type": "application/json",
        Authorization: accessToken ? `Bearer ${accessToken}` : undefined,

    };
    let config = {
        method,
        headers,
    };
    if (body) config.body = JSON.stringify(body)

    // 2. Make API call
    let response = await fetch(fullUrl, config);

    // 3. If 401 -> try refresh
    if (response.status === 401 && refreshToken) {
        console.log("Access Token expired. Trying refresh token now ...");

        const refreshResponse = await fetch(baseURL + "api/auth/refreshToken", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refreshToken }),
        });

        if (refreshResponse.ok) {
            const data = await refreshResponse.json();
            accessToken = data.accessToken; // update token
            // Store locally token
            storeUserSession({ accessToken, refreshToken });
            // Retry original request with new token
            response = await fetch(fullUrl, config);
        } else {
            clearUserSession()
            useAuthStore.getState().logout();
            navigateAndReset("SignIn")
            ToastAndroid.show("Session expired. Please log in again.", ToastAndroid.SHORT);
            // throw new Error("Refresh token failed");
        }
    }

    //convert response to JSON 
    return response.json();
}


