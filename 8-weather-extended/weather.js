#!/usr/bin/env node
import {getArgs} from "./helpers/args.js";
import {printHelp, printSuccess, printError, printWeather} from "./services/log.service.js";
import {getKeyValue, saveKeyValue, TOKEN_MAPPER} from "./services/storage.service.js";
import {getIcon, getWeather} from "./services/api.service.js";

const saveCity = async (city) => {
    if (!city.length) {
        printError("Введите название города")
        return
    }
    try {
        await getWeather(city);
        await saveKeyValue(TOKEN_MAPPER.city, city)
        printSuccess("Город успешно сохранен")
    } catch(e) {
        if (e?.response?.status === 404) {
            printError("Неверно указан город")
        } else {
            printError(e.message)
        }
    }
}

const saveToken = async (token) => {
    if (!token.length) {
        printError("Токен не передан")
        return
    }
    try {
        await saveKeyValue(TOKEN_MAPPER.token, token);
        printSuccess("Токен успешно сохранен")
    } catch (e) {
        if (e?.response?.status === 401) {
            printError("Неверно указан токен")
        } else {
            printError(e.message)
        }
    }
}

const getForecast = async () => {
    try {
        const city = process.env.CITY ?? await getKeyValue(TOKEN_MAPPER.city)
        const weather = await getWeather(city);
        printWeather(weather, getIcon(weather.weather[0].icon));
    } catch (e) {
        printError(e.message);
    }
}


const initCLI = () => {
    const args = getArgs(process.argv);

    if (args.h) {
        return printHelp();
    }
    if (args.s) {
        return saveCity(args.s)
    }
    if (args.t) {
        return saveToken(args.t);
    }
    return getForecast()
}

initCLI()