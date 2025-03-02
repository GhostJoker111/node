import {getKeyValue, saveKeyValue, TOKEN_MAPPER} from "../services/storage.service.js";
import express from "express";
import {getWeather} from "../services/api.service.js";

const settingsRouter = express.Router()

settingsRouter.get("/", async (req, res) => {
    const city = await getKeyValue(TOKEN_MAPPER.city)
    const token = await getKeyValue(TOKEN_MAPPER.token)

    return res.status(200).json({city: city, token: token});
})

settingsRouter.post("/token", async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ error: "Тело запроса отсутствует" });
        }
        const { token } = req.body;

        if (!token || token.trim() === "") {
            return res.status(400).json({ error: "Токен не передан" })
        }

        await saveKeyValue(TOKEN_MAPPER.token, token)

        return res.status(201).json({message: "Токен успешно сохранен"})
    } catch (err) {
        return res.status(500).json({error: "Ошибка при сохранении токена"})
    }
})

settingsRouter.post("/city", async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ error: "Тело запроса отсутствует" });
        }

        const { city } = req.body;

        if (!city || city.trim() === "") {
            return res.status(400).json({ error: "Город не передан" })
        }
        await getWeather(city);
        await saveKeyValue(TOKEN_MAPPER.city, city)

        return res.status(201).json({message: "Город успешно сохранен"})
    } catch (err) {
        if (err?.response?.status === 404) {
            return res.status(404).json({error: "Неверно указан город"})
        } else if (err?.response?.status === 401) {
            return res.status(401).json({error: "Токен не передан"});
        }
        return res.status(500).json({error: "Ошибка при сохранении города"})
    }
})
export { settingsRouter }