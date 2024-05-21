const {format, createLogger, transports, transport} = require("winston");
require("winston-daily-rotate-file");
require("winston-mongodb");

require("dotenv").config();

const {combine, timestamp, label, prettyPrint} = format;

const fileRotateTransport = new transports.DailyRotateFile({
    level: "info",
    filename: "logs/info-%DATE%.log",
    datePattern: "DD-MM-YYYY",
    maxFiles: "10d",
});

const logger = createLogger({
    level : "debug",
    format : combine (
        label({label: "Logs for CoinTrack"}),
        timestamp({
            format: "DD-MM-YYYY HH:mm:ss"
        }),
        format.json()
    ),
    transports: [
        new transports.Console(),
        new transports.File({
            filename: "logs/example.log"
        }),
        new transports.File({
            level:"error",
            filename: "logs/error.log"
        }),
        new transports.File({
            level: "info",
            filename: "logs/info.log"
        }),
        fileRotateTransport,
        new transports.MongoDB({
            level: "info",
            db: process.env.MONGODB_URI,
            options: {
                useUnifiedTopology: true
            },
            collection: "server_logs",
            format: format.combine(
                format.timestamp(),
                format.json()
            )
        }),
        new transports.MongoDB({
            level: "error",
            db : process.env.MONGODB_URI,
            options: {
                useUnifiedTopology: true
            },
            collection: "server_error_logs",
            format: format.combine(
                format.timestamp(),
                format.json()
            )
        })
    ]
});

module.exports = logger;