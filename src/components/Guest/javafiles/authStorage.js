const STORAGE_KEY = "vernal_auth_users";

const getUsers = () => {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
};

const saveUsers = (users) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
};

export const createUser = (form) => {
  const users = getUsers();

  const exists = users.find(
    (user) => user.email.toLowerCase() === form.email.toLowerCase()
  );

  if (exists) {
    return {
      success: false,
      message: "User already exists with this email.",
    };
  }

  const newUser = {
    id: Date.now(),
    fullName: form.fullName,
    email: form.email,
    password: form.password,
  };

  saveUsers([...users, newUser]);

  return {
    success: true,
    user: newUser,
  };
};

export const loginUser = (email, password) => {
  const users = getUsers();

  const user = users.find(
    (item) =>
      item.email.toLowerCase() === email.toLowerCase() &&
      item.password === password
  );

  if (!user) {
    return {
      success: false,
      message: "Invalid email or password.",
    };
  }

  return {
    success: true,
    user,
  };
};

export const findUserByEmail = (email) => {
  const users = getUsers();

  return (
    users.find((user) => user.email.toLowerCase() === email.toLowerCase()) ||
    null
  );
};

export const updatePassword = (email, newPassword) => {
  const users = getUsers();
  const index = users.findIndex(
    (user) => user.email.toLowerCase() === email.toLowerCase()
  );

  if (index === -1) {
    return {
      success: false,
      message: "User not found.",
    };
  }

  users[index].password = newPassword;
  saveUsers(users);

  return {
    success: true,
  };
};