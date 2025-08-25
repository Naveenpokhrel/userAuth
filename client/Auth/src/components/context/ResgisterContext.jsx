const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

const signupUser = async (formData) => {
  const response = await fetch(`${API_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
    credentials: "include", // important for cookie-based auth
  });

  const result = await response.json();
  if (!response.ok) throw new Error(result.message || "Signup failed");
  return result;
};

export default signupUser;
