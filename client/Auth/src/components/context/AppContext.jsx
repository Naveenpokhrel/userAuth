const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

const loginUser = async (formData) => {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
    credentials: "include", // ✅ very important for cookies
  });
 



  const result = await response.json();
  localStorage.setItem("email", result.email);
console.log("sjfnjdfn",result)
  if (!response.ok) throw new Error(result.message || "Login failed");
  return result;
};

export default loginUser;
