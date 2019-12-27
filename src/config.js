const APP_SECRET = process.env.APP_SECRET;
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const VERIFY_TOKEN = process.env.VERIFY_TOKEN;
const IS_DEV_ENV = process.env.IS_DEV_ENV;
const CHATBOT_CONSOLE = process.env.CHATBOT_CONSOLE;

const TABLES_HOST = "a95zjcc2rg.execute-api.ap-northeast-1.amazonaws.com";
const CHAT_STATUS_TABLE_URL = "/default/chat-status-cb";
const STAGING_CONFESSION_URL = "/default/staging-confession-cb";
module.exports = {
  APP_SECRET,
  PAGE_ACCESS_TOKEN,
  VERIFY_TOKEN,
  IS_DEV_ENV,
  CHATBOT_CONSOLE,
  CHAT_STATUS_TABLE_URL,
  TABLES_HOST,
  STAGING_CONFESSION_URL
};
