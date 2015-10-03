// Action types
export const LOGIN = "login";
export const NAVIGATE = "navigate";

// Action creators

export function loginToParticle(email, password) {
  return {
    type: LOGIN,
    email,
    password
  };
}

export function navigateTo(page) {
  return {
    type: NAVIGATE,
    page
  };
}
