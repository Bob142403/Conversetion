const baseURL = "https://www.cbr-xml-daily.ru/daily_json.js";

export const dailiApi = {
  getCurrency: async () => await fetch(baseURL).then((res) => res.json()),
};
