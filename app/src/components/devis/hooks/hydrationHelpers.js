export const loadState = () => {
  const savedState = localStorage.getItem("orderState");
  if (savedState) {
    return JSON.parse(savedState);
  }
  return initialState;
};

export const saveState = (state) => {
  localStorage.setItem("orderState", JSON.stringify(state));
};

export const clearState = () => {
  localStorage.removeItem("orderState");
};
