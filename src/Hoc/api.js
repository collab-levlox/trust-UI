
import axios from "axios"

const babaseulseurl = "http://localhost:8081/360-api/";
axios.defaults.baseURL = babaseulseurl;
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("token")}`;


export const loginAPI = async (payload) => {
    try {
        const response = await axios.post("auth/login", payload);
        return response.data; // ✅ Important: actual data
    } catch (error) {
        throw error.response?.data || "somthing went wrong"
    }
};


export const slotsListAPI = async (payload) => {
    try {
        const response = await axios.get("360/slots", { params: payload });
        return response.data;
    } catch (error) {
        throw error.response.data
    }
}

export const configureSotAllDayAPI = async (payload) => {
    try {
        const response = await axios.put("360/setting-create-update", payload);
        return response.data;
    } catch (error) {
        throw error.response.data
    }
}

export const configureSotAllDayDeleteAPI = async (payload) => {
    try {
        const response = await axios.delete("360/setting-delete", {
            params: payload
        });
        return response.data;
    } catch (error) {
        throw error.response.data
    }
}

export const getAllDayConfigAPI = async (payload) => {
    try {
        const response = await axios.get("360/setting-data", { params: payload });
        return response.data;
    } catch (error) {
        throw error.response.data
    }
}




export const settingList = async (payload) => {
    try {
        const response = await axios.get("360/setting-list", { params: payload });
        return response.data;
    } catch (error) {
        throw error.response.data
    }
}


export const bookSlotAPI = async (payload) => {
    try {
        const response = await axios.post("360/slots-book", payload);
        return response.data;
    } catch (error) {
        throw error.response.data
    }
}


export const dashboardAPI = async (payload) => {
    try {
        const response = await axios.get("360/dashboard-info", { params: payload });
        return response.data;
    } catch (error) {
        throw error.response.data
    }
}

export const bookingSlotList = async (payload) => {
    try {
        const response = await axios.get("360/booking-list", { params: payload });
        return response.data;
    } catch (error) {
        throw error.response.data
    }
}