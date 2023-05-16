//change url to backend url
export const BASE_API_URL = "http://localhost:8080";
const DEFAULT_API_KEY = "enter_your_api_key_here";
export let API_KEY = localStorage.getItem("API_KEY") || DEFAULT_API_KEY;
export function setApiKey(key: string) {
  API_KEY = key;
  localStorage.setItem("API_KEY", key);
}
