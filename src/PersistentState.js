const PersistentState = {
  load: function() {
    return {
      login: JSON.parse(localStorage.getItem("silviaState")) || {}
    };
  },

  save: function(state) {
    localStorage.setItem("silviaState", JSON.stringify({
      token: state.login.token
    }));
  }
};

export default PersistentState;
