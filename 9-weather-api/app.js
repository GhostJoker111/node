import express from 'express'
import {getIcon, getWeather} from "./services/api.service.js";
import {getKeyValue, TOKEN_MAPPER} from "./services/storage.service.js";
import {settingsRouter} from "./settings/settings.js";

const port = 8000
const app = express()

app.use(express.json())

app.get("/weather", async (req, res) => {
    try {
        const city = req.query.city || await getKeyValue(TOKEN_MAPPER.city)

        if (!city) {
            return res.status(400).json({error: "Город не указан"})
        }

        const weatherData = await getWeather(city);
        console.log(weatherData);

        res.status(200).json({
            weather: weatherData,
            icon: getIcon(weatherData.weather[0].icon)
        });
    } catch (err) {
        switch (err?.response?.status) {
            case 404:
                return res.status(404).json({error: "Город не найден"});
            case 401:
                return res.status(401).json({error: "Токен не передан"});
            default:
                return res.status(500).json({error: "Ошибка сервера"});
            }

        }

})

app.use("/settings", settingsRouter)

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`)
})