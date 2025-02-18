import { getKeyValue, TOKEN_MAPPER } from "./storage.service.js"
import axios from "axios";

const getIcon = (icon) => {
    switch (icon.slice(0, -1)) {
        case '01':
            return '☀️';
        case '02':
            return '🌤️';
        case '03':
            return '☁️';
        case '04':
            return '☁️';
        case '09':
            return '🌧️';
        case '10':
            return '🌦️';
        case '11':
            return '⛈️';
        case '13':
            return '❄️';
        case '50':
            return '🌫️';
    }
};

const getWeather = async (city) => {
    const token = process.env.TOKEN ?? await getKeyValue(TOKEN_MAPPER.token)
        if (!token) {
            throw new Error("Не задан ключ API, задайте его через команду -t [API_KEY]")
        } else if (!city) {
            throw new Error("Город не передан, задайте его через команду -s [CITY_NAME]")
        }
    const { data } = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
        params: {
            q: city,
            appid: token,
            lang: "ru",
            units: "metric",
        }
    })

    return data
}

export { getWeather, getIcon }