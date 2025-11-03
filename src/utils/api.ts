// import axios from "axios";
// import { baseURL } from "./constants";
// import { clearUserSession, retrieveUserSession, storeUserSession } from "./tokens";
// import useAuthStore from "../store/useAuthStore";
// import { navigateAndReset } from "../navigation/navigationService";

import { ToastAndroid } from "react-native";
import { navigateAndReset } from "../navigation/navigationService";
import useAuthStore from "../store/useAuthStore";
import { clearUserSession, storeUserSession } from "./tokens";
import { baseURL } from "./constants";

// fetchInterceptor.js
// let accessToken = null;
// let refreshToken = null;

// // Call this to set tokens after login
// export function setTokens(access: string, refresh: string) {
//     console.log("Setting tokens:", { access, refresh });
//     accessToken = access;
//     refreshToken = refresh;
// }

// Custom fetch wrapper
// export async function customFetch(url: string, method: string, body: any = null, contentType : string = "application/json") {
//     // 1. Add Authorization header if token exists
//     console.log("accessToken in fetch:", accessToken);
//     const fullUrl = baseURL + url;
//     const headers = {
//         "Content-Type": contentType,
//         Authorization: accessToken ? `Bearer ${accessToken}` : undefined,

//     };
//     let config = {
//         method,
//         headers,
//     };
//     if (body) config.body = JSON.stringify(body)

//     // 2. Make API call
//     let response = await fetch(fullUrl, config);

//     // 3. If 401 -> try refresh
//     if (response.status === 401 && refreshToken) {
//         console.log("Access Token expired. Trying refresh token now ...");

//         const refreshResponse = await fetch(baseURL + "api/auth/refreshToken", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ refreshToken }),
//         });

//         if (refreshResponse.ok) {
//             const data = await refreshResponse.json();
//             accessToken = data.accessToken; // update token
//             // Store locally token
//             storeUserSession({ accessToken, refreshToken });
//             // Retry original request with new token
//             response = await fetch(fullUrl, config);
//         } else {
//             clearUserSession()
//             useAuthStore.getState().logout();
//             navigateAndReset("SignIn")
//             ToastAndroid.show("Session expired. Please log in again.", ToastAndroid.SHORT);
//             // throw new Error("Refresh token failed");
//         }
//     }

//     //convert response to JSON 
//     return response.json();
// }





// fetchInterceptor.js
let accessToken = null;
let refreshToken = null;

// Call this to set tokens after login
export function setTokens(access: string, refresh: string) {
    console.log("Setting tokens:", { access, refresh });
    accessToken = access;
    refreshToken = refresh;
}


export async function customFetch(
    url: string,
    method: string,
    body: any = null,
    contentType: string = "application/json"
) {
    const fullUrl = baseURL + url;
    console.log("full url : ",fullUrl );
    console.log("accessToken in fetch:", accessToken);
    const headers: any = {
        Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
    };

    let config: any = { method, headers };

    if (body) {
        if (body instanceof FormData) {
            // ✅ FormData case → don’t set Content-Type
            config.body = body;
        } else {
            // ✅ JSON case
            headers["Content-Type"] = contentType;
            config.body = JSON.stringify(body);
        }
    }

    let response = await fetch(fullUrl, config);

    if (response.status === 401 && refreshToken) {
        console.log("Access Token expired. Trying refresh token now ...");

        const refreshResponse = await fetch(baseURL + "/api/auth/refreshToken", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "refreshToken": refreshToken }),
        });
        console.log("refresh token done ")

        if (refreshResponse.ok) {
            const res = await refreshResponse.json();
            console.log("refresh response data", res.data);
            accessToken = res.data.accessToken;
            storeUserSession({ accessToken, refreshToken });
            accessToken = res.data.accessToken; // update token
            config.headers.Authorization = `Bearer ${accessToken}`;
            response = await fetch(fullUrl, config);
        } else {
            clearUserSession();
            useAuthStore.getState().logout();
            navigateAndReset("SignIn");
            ToastAndroid.show(
                "Session expired. Please log in again.",
                ToastAndroid.SHORT
            );
        }
    }

    return response.json();
}
