import chalk from "chalk"
import dedent from "dedent-js";

const printError = (error) => {
    console.log(chalk.bgRed("ERROR") +  " " + error)
}

const printSuccess = (message) => {
    console.log(chalk.bgGreen("SUCCESS") +  " " + message)
}

const printHelp = () => {
    console.log(dedent(`
    ${chalk.bgCyan("HELP")}
    Без параметров - вывод погоды
    -s [CITY] для установки города
    -h для вывода помощи
    -t [API_KEY] для сохранения токена
    `))
}

const printWeather = (res, icon) => {
    console.log(dedent(`
    ${chalk.bgMagenta("WEATHER")} Погода в городе ${res.name}
    ${icon} ${res.weather[0].description}
    Температура: ${res.main.temp}\u00B0С (ощущается как ${res.main.feels_like}\u00B0С)
    Влажность: ${res.main.humidity}%
    Ветер: ${res.wind.speed} м/с, порывами до ${res.wind.gust} м/с
    Давление: ${res.main.pressure} гПа
    `))
}

export { printError, printSuccess, printHelp, printWeather }