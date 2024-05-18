import APIHandler from "./APIHandler";
import configs from "../configs.json"

async function login(username, password) {
    const loginData = {
        pyUserIdentifier: btoa(username + ":" + password)
    }
    APIHandler.setKey("Basic " + loginData.pyUserIdentifier);
    try {
        const data = await APIHandler.post(configs.LoginURL, loginData);
        localStorage.setItem("UserData", JSON.stringify(data));
        localStorage.setItem("UserKey", "Basic " + loginData.pyUserIdentifier)
    } catch (error) {
        return Promise.reject(error);
    }

}
async function createNewUser(UserInfo) {
    try {
        await APIHandler.post(configs.AddNewUser, UserInfo);

    } catch (error) {
        return Promise.reject(error);

    }
}
function getUserKey() {
    return localStorage.getItem("UserKey");

}
function getLoginStatus() {
    return localStorage.getItem("UserData") ? true : false;
}
function logOut() {
    localStorage.removeItem("UserKey");
    localStorage.removeItem("UserData");
}
function getUserID() {
    const { data } = JSON.parse(localStorage.getItem("UserData"));
    return data.pyUserIdentifier;
}
const AuthenticationServices = {
    login: login,
    getUserKey: getUserKey,
    logOut: logOut,
    getLoginStatus: getLoginStatus,
    getUserID: getUserID,
    createNewUser: createNewUser

}

export default AuthenticationServices;


