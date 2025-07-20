import axios from "axios";

import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
    baseURL: 'http://10.90.137.24:8080/api',
    timeout: 10000,

})


api.interceptors.request.use(
    async config => {
        const token = await AsyncStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);
api.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        // Only retry once
        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            !(originalRequest.url?.includes('refresh'))
        ) {
            originalRequest._retry = true;

            try {
                const refreshToken = await AsyncStorage.getItem('refreshToken');
                if (!refreshToken) throw new Error('No refresh token');

                // Request new access token
                const response = await axios.post('https://10.90.137.24:8080/api/auth/refresh', {
                    refreshToken,
                });

                const newAccessToken = response.data.accessToken;
                const newRefreshToken = response.data.refreshToken;

                // Save tokens
                await AsyncStorage.setItem('accessToken', newAccessToken);
                await AsyncStorage.setItem('refreshToken', newRefreshToken);

                // Retry the original request
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return api(originalRequest);
            } catch (refreshError) {
                // ❌ Refresh token failed, force logout
                await AsyncStorage.clear();
                // You can redirect user to login screen here
                console.warn('Session expired. Please log in again.');
            }
        }

        return Promise.reject(error);
    }
)


export default api;