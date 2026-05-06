// Simple API wrapper using fetch
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";

// Ensure no trailing slash in BASE_URL
const BASE_URL = API_URL.endsWith('/') ? API_URL.slice(0, -1) : API_URL;

const API = {
  post: async (endpoint: string, data: any, config: any = {}) => {
    // Ensure endpoint starts with /
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    
    const isFormData = data instanceof FormData;
    
    const response = await fetch(`${BASE_URL}${cleanEndpoint}`, {
      method: "POST",
      body: isFormData ? data : JSON.stringify(data),
      headers: {
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
        ...config.headers,
      },
      ...config,
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return { data: await response.json() };
  },
  
  get: async (endpoint: string, config: any = {}) => {
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    
    const response = await fetch(`${BASE_URL}${cleanEndpoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...config.headers,
      },
      ...config,
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return { data: await response.json() };
  }
};

export default API;

