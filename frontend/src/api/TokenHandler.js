export const getAccessToken = () => {
  const accessToken = localStorage.getItem("ACCESS");
  return `Bearer ${accessToken}`;
};

export const setAccessToken = (token) => {
  localStorage.setItem("ACCESS", token);
};
