const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidU1PZnRBZ3JSb2VuYm9DYlhzc0d5U1ZiTjAxdzVBVzU3cTVzNFptTFZYTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNmtKL2JOVWhjYXVWcHZKc1IwMkFzNVcyZFc4YXhUUXJjcVlRN0RicndIUT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI2TkNseXF6OXVOKzZqOHdubklZSlBta3BpRHc1RG5iUDh5dW0zMExqV2wwPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJwd3ZleEg4eVlMNGJCeDVYb091SWUzNmJjNDc4Unc5NTBWWTZFYVAra0hZPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImdQRTFqbWtMSWhuRHdoMG5EcTRhd05pOEdNM0QwV2ZYTlVNUWplWWN6MVU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlFTVGdaZVN2ZmZ3ejIwRXNaQk0rcmdaNHFsMHNJbTlodlQxTUVDWks0R1U9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib0ZYZ25aa1V2SmhvTE1PY1Q1Z2ZHT3lzK0xrckd6amIyZE5vWkIyYU1rRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVHBvcGJ1TEJ5RzY4a2RYaTBMeDNlWWFrNHQzMSt4LzBxZW8rUExZVnNYVT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im9ndGhhUzlKSXJpdnc2Q2tHbC9ZakhhSnc3UUxzZUdRYnNkd3YzN1NRL1JGS2lweUtKckh3WHc1WmE3NmxxY3Q1NkRmNzJaRG9PT1lJSkh2dy9SS0RRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTk1LCJhZHZTZWNyZXRLZXkiOiJJcG1XU2RLM25paFNxRnRxc0d6dEc0ZVFmRXczdlo4WFRxNTZHZVBBYmhvPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjQ5MTU1NjIzNzgzNDNAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiOTE1NDU4M0YzNUFENzYxMDVDNEY1ODQ5NEIxRjREMzEifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc0MDYwMDk0Mn0seyJrZXkiOnsicmVtb3RlSmlkIjoiNDkxNTU2MjM3ODM0M0BzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI3NDc5N0UzQzE3QUJGNTU3MDI1RERBQjk2Qjg1QzM2QiJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQwNjAwOTQzfSx7ImtleSI6eyJyZW1vdGVKaWQiOiI0OTE1NTYyMzc4MzQzQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkEwNDg1RUM3NUQ5ODNGODY5NTY5MjlBOTE4QTZCQTVCIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NDA2MDA5NDZ9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6InNuRnRZWnROU3J5T1YweFFSNy1lVnciLCJwaG9uZUlkIjoiZDRkMGZhNzEtZTdlMy00MTdiLWIxMGQtNWIxNmE0NWFmODcyIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImtMZys1ZjYya09sWER2U3NFS0hRM2NEM1FRMD0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJjb3BYUCs4bkRwbHpycjd5V3grU201QWI0REE9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiWUJGWVZLV1MiLCJtZSI6eyJpZCI6IjQ5MTU1NjIzNzgzNDM6NTdAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiRGFkZHkifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0x6UHlTMFE0ZXo5dlFZWUFTQUFLQUE9IiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IjcyVjExbEladmFsSnZGMjYyYk1YdzM0bktnUk45S28zQ09ndys0SDRlUnM9IiwiYWNjb3VudFNpZ25hdHVyZSI6ImFZZHZIb00zalRaUTBpU2JteGhNL3RzRk5mUzh6ZzdZcVlEMkpZTC9VVkhBb0QvVXpyVmVRY00xVVNiV0sxaGdWcXF0dHdHSUNYOGNBOE11enBDQURBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJxcGlVMUJGVlBhY1FNS01PZmxEUExPWm8vdm0xVWlUTHR5VmxmdDhKb2ZCMFNYMktVMzZPRWJCYVpEZm1XRklKK2lGOW50QnFFc3JsYVByOXlDN3pEUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjQ5MTU1NjIzNzgzNDM6NTdAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCZTlsZGRaU0diMnBTYnhkdXRtekY4TitKeW9FVGZTcU53am9NUHVCK0hrYiJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc0MDYwMDk0MiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFGcisifQ',
    PREFIXE: process.env.PREFIX || "+",
    GITHUB : process.env.GITHUB|| 'https://github.com/enbbrand84/ENB-XMD',
    OWNER_NAME : process.env.OWNER_NAME || "Martin",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "4915562378343, 4915563151347",  
              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    AUTO_REACT: process.env.AUTO_REACTION || "non",  
    URL: process.env.URL || "https://files.catbox.moe/7ttvmj.jpg",  
    AUTO_REACT_STATUS: process.env.AUTO_REACT_STATUS || 'non',              
    CHATBOT: process.env.CHAT_BOT || "off",              
    AUTO_READ_MESSAGES: process.env.AUTO_READ_MESSAGES || "yes",
    AUTO_BLOCK: process.env.AUTO_BLOCK || 'no', 
    GCF: process.env.GROUP_HANDLE || 'no', 
    AUTO_REPLY : process.env.AUTO_REPLY || "no", 
    AUTO_STATUS_TEXT: process.env.AUTO_STATUS_TEXT || 'viewed by enb md',   
    AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || 'no',
    AUTO_BIO: process.env.AUTO_BIO || 'yes',       
    ANTI_CALL_TEXT : process.env.ANTI_CALL_MESSAGE || '',             
    GURL: process.env.GURL  || "https://whatsapp.com/channel/0029Vb2NqkvBPzjPEvFiYa0R",
    WEBSITE :process.env.GURL || "https://whatsapp.com/channel/0029Vb2NqkvBPzjPEvFiYa0R",
    CAPTION : process.env.CAPTION || "E.N.B-XMD",
    BOT : process.env.BOT_NAME || 'E.N.B-XMD⁠',
    MODE: process.env.PUBLIC_MODE || "no",              
    TIMEZONE: process.env.TIMEZONE || "Africa/Dodoma", 
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME || null,
    HEROKU_API_KEY : process.env.HEROKU_API_KEY || null,
    WARN_COUNT : process.env.WARN_COUNT || '5' ,
    ETAT : process.env.PRESENCE || '1',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTI_DELETE_MESSAGE : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTICALL: process.env.ANTICALL || 'yes',              
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

