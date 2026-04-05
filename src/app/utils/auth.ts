export const saveUser = (user: any) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const updateUser = (updatedData: any) => {
  const existing = getUser();
  const newUser = { ...existing, ...updatedData };
  localStorage.setItem("user", JSON.stringify(newUser));
};

export const logoutUser = () => {
  localStorage.removeItem("user");
};