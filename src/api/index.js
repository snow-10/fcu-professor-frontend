// 設定後端 API 的基礎網址
const BASE_URL = 'http://localhost:3000/api';

// 教授清單
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

// 領域資料
export const getProfessorsByDomain = async (domainName) => {
  try {
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

// 教授個人資料
export const getProfessorExpertises = async (id) => {
  try {
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