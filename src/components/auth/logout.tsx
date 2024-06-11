export const HandleLogout = () => {
  document.cookie = "auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  window.location.href = "/auth/login";
  localStorage.setItem("path", window.location.pathname);
};
