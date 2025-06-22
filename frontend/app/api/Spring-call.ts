import axios from "axios";

export const getEvents = async () => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const res = await axios.get(`${baseUrl}/api/events`);
    return res.data;
};
