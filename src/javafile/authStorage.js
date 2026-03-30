const USERS_KEY = "vernal_users";

export function getUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  } catch {
    return [];
  }
}

export function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function findUserByEmail(email) {
  const users = getUsers();
  return users.find(
    (user) => user.email.toLowerCase() === email.trim().toLowerCase()
  );
}

export function createUser(userData) {
  const users = getUsers();

  const exists = users.some(
    (user) => user.email.toLowerCase() === userData.email.trim().toLowerCase()
  );

  if (exists) {
    return { success: false, message: "Email already registered." };
  }

  const newUser = {
    id: Date.now(),
    fullName: userData.fullName.trim(),
    email: userData.email.trim(),
    password: userData.password,
  };

  users.push(newUser);
  saveUsers(users);

  return { success: true, user: newUser };
}

export function loginUser(email, password) {
  const user = findUserByEmail(email);

  if (!user) {
    return { success: false, message: "Account not found." };
  }

  if (user.password !== password) {
    return { success: false, message: "Incorrect password." };
  }

  return { success: true, user };
}

export function updatePassword(email, newPassword) {
  const users = getUsers();

  const userIndex = users.findIndex(
    (user) => user.email.toLowerCase() === email.trim().toLowerCase()
  );

  if (userIndex === -1) {
    return { success: false, message: "User not found." };
  }

  users[userIndex].password = newPassword;
  saveUsers(users);

  return { success: true };
}