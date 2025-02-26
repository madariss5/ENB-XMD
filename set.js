const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU0dzRzArUnFjaVUrSUVMallVUEFVTmN2TjNSRTY0N3J0TG1HcEgwNmtGMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTEowQ0s0SUVGOVd5SjQwRGE4NFlSTUQxczlIZitJa3gyODZnbkpoNk5rRT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI0TERqWWdWN3h3SzAvSzR2S2tnZmFjMGMxa0pHcGVRNjYyV3hSZ1kyZzBFPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJxWklvMGR1NDc5V0tBampFbklINGw0a2lnOUJQSmRlbkRhVkI3K3Y0Skg4PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjRKVDRHTURYTE9Ib3Q2UWJPU1VzZXQwUGNVUldLV1FxandBUjdQaVV0Rnc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlJmNTdPRmFsVXBmS1JMLzBRVlkrMjNicUlsbUtad1ozWVBLT3ljQ1Z4VHc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZU1mcUxNVEhsaGxRa0xNTFhzeUd6NnBPdWIzcENBN0FwZzB0Z2RNTU5rQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUTRHRmZUaVduY3FvOVdtZThEaVhmR0RGNThYN2owcTFGZkhsdUI1dUZWQT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InJjMElVSy94aytKeE5pMlpvdWpDbWF5b3RlMXhRZTBzWEZxdUVERE01ZjQrckovTzVjR3JuelRkOWNHUzZoYUNpRVI4cTVEYkRPeUdLM1I3a0ExcUR3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MzYsImFkdlNlY3JldEtleSI6InV0aDFaYkJJdzB4Y1pxTEljT3N5enh6aXUrMTBhL1VvL3hDUHZLUS94aE09IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiNDkxNTU2MjM3ODM0M0BzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJDMTNBODc2RjY3MUVEMjU5REVCNUQ5REZBMzc4MUVFRSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQwNjAwNDcwfSx7ImtleSI6eyJyZW1vdGVKaWQiOiI0OTE1NTYyMzc4MzQzQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjY3N0MwNTYxOThDN0ExM0YyRUIwRjhFRDY4N0IxNTAyIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NDA2MDA0NzF9LHsia2V5Ijp7InJlbW90ZUppZCI6IjQ5MTU1NjIzNzgzNDNAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiNzQzQ0FFRTVCQjdCMzc2NjVGRkFBQkNFNkJFNEUxRDYifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc0MDYwMDQ3NX1dLCJuZXh0UHJlS2V5SWQiOjYxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6NjEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiZmpiODJ1MmpTUk82S0Z2YURTbXF0ZyIsInBob25lSWQiOiJmMTIxNjI5MS1iNThhLTQyZjMtYTJkZi0yYmJlNzRmZjNkYTgiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibFlwSmdOR0ZKbGgwOE80SVJDVFJ5WGlUZEM0PSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InBzOUg4VTcxNFQ5T3RSV1llTHlCZFJKcitEMD0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJMSllRRkxFUiIsIm1lIjp7ImlkIjoiNDkxNTU2MjM3ODM0Mzo1NkBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJEYWRkeSJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTHZQeVMwUWlPbjl2UVlZQWlBQUtBQT0iLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiNzJWMTFsSVp2YWxKdkYyNjJiTVh3MzRuS2dSTjlLbzNDT2d3KzRINGVScz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiYkYzMUNJUys3bmhGajVNTmZuc1Z1VzlZNTdVZzRJeGllc0ttYVNDWW05NTVIbFVBZUs0OVZCdGJPSENPZUtuaEY5QTBhS1ppNzJKcjNWNFN4b1Z5QkE9PSIsImRldmljZVNpZ25hdHVyZSI6IlJHNEFCZS84a3NQYzJEelZFYU82aGN5eTZXMVN4eFltVUxaWlpHOUhWY3FrekxpVUwyeUVWRFliUjYvbFNYeTVxSStlRzV4bTNCTlZUdGs3R3g2YkRBPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiNDkxNTU2MjM3ODM0Mzo1NkBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJlOWxkZFpTR2IycFNieGR1dG16RjhOK0p5b0VUZlNxTndqb01QdUIrSGtiIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQwNjAwNDY5LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUV6QiJ9',
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

