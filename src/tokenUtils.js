export function setPlayerToken(token) {
  console.log(`SETTING PLAYER TOKEN: ${token}`);
  localStorage.setItem("CurrentPlayerToken", token);
}

export function getPlayerToken() {
  return localStorage.getItem("CurrentPlayerToken");
}

export function removePlayerToken() {
  console.log("CLEARING TOKEN");
  localStorage.removeItem("CurrentPlayerToken");
}
