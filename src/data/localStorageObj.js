const localStorageObj = (function () {
  function _setTokens(access, refresh) {
    localStorage.setItem("access", access);
    localStorage.setItem("refresh", refresh);
  }
  function _updateAccessToken(accessToken) {
    localStorage.setItem("access", accessToken);
  }
  function _getAccessToken() {
    const accessToken = localStorage.getItem("access");
    return accessToken;
  }
  function _getRefreshToken() {
    const refreshToken = localStorage.getItem("refresh");
    return refreshToken;
  }
  function _clearTokens() {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
  }
  return {
    _setTokens,
    _updateAccessToken,
    _getAccessToken,
    _getRefreshToken,
    _clearTokens,
  };
})();

export default localStorageObj;
