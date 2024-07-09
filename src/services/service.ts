import {Participant, updateResponse} from "../types/participants.type.ts";
import {StylesResponse} from "../types/style.type.ts";
import axios from "axios";

let baseUrl: string | null = null;
let xApiKey: string | null = null;

const getUrl = async (): Promise<{ baseURL: string | null, xApiKey: string | null }> => {
    if (baseUrl && xApiKey) {
        return {baseURL: baseUrl, xApiKey: xApiKey};
    }

    const res = await fetch('./settings.json', {cache: "no-cache"});
    //const res = await fetch('../../../settings.json', {cache: "no-cache"});
    const data = await res.json();
    baseUrl = data.baseURL;
    xApiKey = data.xApiKey;
    return {baseURL: baseUrl, xApiKey: xApiKey};
};

const instance = axios.create();

instance.interceptors.request.use(async (config) => {
    const {baseURL, xApiKey} = await getUrl();
    config.headers['x-api-key'] = xApiKey;
    if (baseUrl !== null && baseURL) {
        config.baseURL = baseURL;
    }
    return config;
}, (error) => Promise.reject(error));

export const API = {
    async getParticipant() {
        return instance.get<Participant[]>('');

    },
    async getStyles() {
        return instance.get<StylesResponse>('/styles.php');

    },
    async updateParticipant(id: number, registered: boolean) {
        const response = await instance.patch<updateResponse>(`/${id}/`, {registred: registered});
        return response.data;
    }
};

