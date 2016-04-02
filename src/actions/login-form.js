export const UPDATE_LOGIN_FORM = 'UPDATE_LOGIN_FORM';
export const updateLoginForm = function updateLoginForm(field, newValue) {
  // validate field name to make sure we're not messing with other stuff
  if (!['name', 'password'].includes(field)) {
    throw new Error('Attempted to update login form with an invalid field: ' + field);
  }

  return {
    type: UPDATE_LOGIN_FORM,
    payload: {
      field,
      newValue: newValue.toString(),
    },
  };
};

export const SHOW_LOGIN_FORM = 'SHOW_LOGIN_FORM';
export const HIDE_LOGIN_FORM = 'HIDE_LOGIN_FORM';
export const setVisibility = function setVisibility(shouldBeVisible) {
  return {
    type: shouldBeVisible ? SHOW_LOGIN_FORM : HIDE_LOGIN_FORM,
  };
};
