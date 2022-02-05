export const getAccessToken = () => {
  const accessToken = localStorage.getItem('ACCESS');
  return `Bearer ${accessToken}`;
};
