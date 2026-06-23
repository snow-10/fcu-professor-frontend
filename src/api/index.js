// 設定後端 API 的基礎網址
const BASE_URL = 'https://fcu-professor-api-cehmg6hcahcgdmcx.eastasia-01.azurewebsites.net/api';

// 取得所有教授清單
export const getProfessors = async () => {
  try {
    const response = await fetch(`${BASE_URL}/professors`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    // 將回傳的 JSON 格式解析為 JavaScript 物件/陣列
    return await response.json(); 
  } catch (error) {
    console.error("無法取得教授資料:", error);
    throw error;
  }
};

// 先把未來會用到的兩支 API 也寫好架構
export const getProfessorsByDomain = async (domainName) => {
  try {
    // 將中文領域名稱進行編碼，避免網址亂碼問題
    const encodedDomain = encodeURIComponent(domainName);
    const response = await fetch(`${BASE_URL}/domains/${encodedDomain}/professors`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json(); 
  } catch (error) {
    console.error(`無法取得 ${domainName} 領域的資料:`, error);
    throw error;
  }
};

export const getProfessorExpertises = async (id) => {
  try {
    // 🌟 網址改成吃 id
    const response = await fetch(`${BASE_URL}/professors/${id}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json(); 
  } catch (error) {
    console.error(`無法取得教授資料:`, error);
    throw error;
  }
};