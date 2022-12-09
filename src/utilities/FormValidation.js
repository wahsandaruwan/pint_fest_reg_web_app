// Function for validate full name
const validateName = (name) => {
  let error = false;

  if (!name) {
    error = "Enter your name!";
  } else if (!/^[a-zA-Z ]*$/i.test(name)) {
    error = "Enter proper name only using characters!";
  }

  return error;
};

// Function for validate phone number
const validateNIC = (nic) => {
  let error = false;

  if (!nic) {
    error = "Enter your NIC number!";
  } else if (!/^\d{9}[v|V]$/i.test(nic) && !/^\d{12}$/i.test(nic)) {
    error = "Enter a proper NIC!";
  }

  return error;
};

// Function for validate email
const validateEmail = (email) => {
  let error = false;

  if (!email) {
    error = "Enter your email!";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    error = "Enter proper email!";
  }

  return error;
};

// Function for validate vehicle year
const validateVehicleYear = (vehicleYear) => {
  console.log(vehicleYear);
  vehicleYear = vehicleYear.toLocaleString().slice(4, 8);
  let error = false;

  if (!vehicleYear) {
    error = "Enter your vehicle year!";
  }

  return error;
};

module.exports = {
  validateEmail,
  validateName,
  validateNIC,
  validateVehicleYear,
};
