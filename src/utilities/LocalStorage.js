// Function for set user to local storage
const setUserToLocal = (data) => {
  try {
    localStorage.setItem("userLogin", JSON.stringify(data));
  } catch (err) {
    return err;
  }
};

// Function for get user from local storage
const getUserFromLocal = () => {
  try {
    const loginUser = localStorage.getItem("userLogin");
    const {
      authentication,
      token,
      data: { id, fullName, userType },
    } = JSON.parse(loginUser);

    return {
      authentication,
      token,
      id,
      fullName,
      userType,
    };
  } catch (err) {
    return err;
  }
};

module.exports = {
  setUserToLocal,
  getUserFromLocal,
};
