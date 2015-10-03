const PersistentState = {
  load: function() {
    return JSON.parse(localStorage.getItem("silviaState")) || {};
  },

  save: function(state) {
    localStorage.setItem("silviaState", JSON.stringify({
      token: state.token
    }));
  }
};

export default PersistentState;
