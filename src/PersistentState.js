const PersistentState = {
  loadToken: function() {
    return localStorage.getItem("silviaToken");
  },

  saveToken: function(token) {
    localStorage.setItem("silviaToken", token);
  }
};

export default PersistentState;
