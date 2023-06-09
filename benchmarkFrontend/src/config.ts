//change url to the public url of your backend or read env variable
//@ts-ignore
const PUBLIC_API_URL = import.meta.env.VITE_PUBLIC_URL;
export const BASE_API_URL = PUBLIC_API_URL || "http://localhost:8080";
const DEFAULT_API_KEY = "enter_your_api_key_here";
export let API_KEY = localStorage.getItem("API_KEY") || DEFAULT_API_KEY;
export function setApiKey(key: string) {
  API_KEY = key;
  localStorage.setItem("API_KEY", key);
}
