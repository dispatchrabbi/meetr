const throwResultIfNot2XX = function _throwResultIfNot2XX(result) {
  if (!result.ok) {
    throw result;
  } else {
    return result.json();
  }
};

const throwGenericError = function _throwGenericError(result) {
  const errorMessage = `Request error: ${result.status} ${JSON.stringify(result.json())}`;
  throw new Error(errorMessage);
};

export default {
  throwResultIfNot2XX,
  throwGenericError,
};
