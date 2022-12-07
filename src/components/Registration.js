// Inbuilt components and modules
import { useState, useEffect } from "react";

// Third-party components and modules
import {
  FaDirections,
  FaPhoneSquare,
  FaEnvelopeOpenText,
  FaInternetExplorer,
} from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { collection, getDocs, addDoc } from "firebase/firestore";

// Custom components and modules
import {
  validateEmail,
  validateName,
  validateNIC,
  validateVehicleYear,
} from "../utilities/FormValidation";
import { vehicleModels } from "../data/VehicleModels";
import { db } from "../utilities/FirebaseConfig";

const Registration = () => {
  // Initial registration state
  const initialRegState = {
    name: "",
    nic: "",
    email: "",
    category: "",
    vehicleNumber: "",
    vehicleModel: "",
    vehicleYear: "",
  };

  // Registered members state
  const [registeredMembers, setRegisteredMembers] = useState([]);

  // Registration state
  const [register, setRegister] = useState(initialRegState);

  console.log(register);
  console.log(register.vehicleYear.toLocaleString().slice(4, 8));

  // Success and error states
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Registered members collection
  const registeredMembersRef = collection(db, "registrations");

  useEffect(() => {
    getRegisteredMembers();
  }, []);

  // Clear form fields
  const clearForm = () => {
    setRegister(initialRegState);
  };

  // Get registered members
  const getRegisteredMembers = async () => {
    await getDocs(registeredMembersRef)
      .then((querySnapshot) => {
        const newData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        console.log(newData);
        setRegisteredMembers(newData);
      })
      .catch((err) => console.log(err));
  };

  // Get timeslots resevations
  const getTimeSlotReservations = async (slot) => {
    console.log(registeredMembers);
    const result = await registeredMembers.filter((member) => {
      return member.time_slot.match(slot);
    });
    console.log(result);
    return result.length;
  };

  // Submit email
  const submitEmail = (toMail, timeSlot, category) => {
    const config = {
      Host: "smtp.elasticemail.com",
      Username: "pinkfest@thepinkautoshop.com",
      Password: "187411CB4AE48AF7B4A68CC5023C44AC1166",
      Port: 2525,
      To: toMail,
      From: "pinkfest@thepinkautoshop.com",
      Subject: "This Pink Fest",
      Body: `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Ali Express Christmas Promotion</title>
        </head>
        <body bgcolor="#bdc3c7" style="font-family: sans-serif">
          <table
            border="0"
            cellpadding="0"
            cellspacing="0"
            style="max-width: 650px; width: 100%"
            align="center"
          >
            <!-- Header -->
            <tr>
              <td style="background-color: #ffffff; padding: 15px" align="center">
                <h2 style="margin: 0; font-size: 25px; color: #d63c91">
                  Pink Fest 2022
                </h2>
              </td>
            </tr>
            <!-- Hero -->
            <tr>
              <td
                style="
                  padding: 100px 0px;
                  background-image: url(https://i.ibb.co/P5ZCFz3/pinkfest.png);
                  background-size: cover;
                  background-position: left center;
                "
                align="center"
              ></td>
            </tr>
            <!-- Trending Gifts Section -->
            <tr>
              <!-- Section Titile -->
              <td style="background-color: #fff; padding: 0px 20px" align="center">
                <h3 style="font-size: 25px; margin: 20px 0px 30px 0px; color: #000">
                  Welcome to PinkFest, This is your Invitation!
                </h3>
                <h3 style="font-size: 20px; margin: 20px 0px; color: #000">
                  Your Time Slot
                </h3>
                <h4
                  style="
                    width: 90px;
                    padding: 10px;
                    font-size: 16px;
                    margin: 20px 0px 30px 0px;
                    color: #fff;
                    background-color: #d63c91;
                  "
                >
                  ${timeSlot}
                </h4>
                <h3 style="font-size: 20px; margin: 20px 0px; color: #000">
                  Your Category
                </h3>
                <h4
                  style="
                    font-size: 16px;
                    margin: 20px 0px;
                    color: #000;
                    text-align: center;
                  "
                >
                ${category}
                </h4>
              </td>
            </tr>
            <!-- Footer Section -->
            <tr>
              <td>
                <table
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  style="width: 100%; background-color: #fff; text-align: center"
                >
                  <tr style="width: 100%; padding: 5px; background-color: #d63c91">
                    <td>
                      <p style="color: #fff; font-size: 15px">
                        www.thepinkautoshop.com
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>`,
    };

    if (window.Email) {
      window.Email.send(config).then(() =>
        console.log("Email sent successfully!")
      );
    }
  };

  // Assign time slots
  const assignTimeSlots = (category) => {
    let timeSlot = "";
    if (["Classic", "Vintage"].includes(category)) {
      timeSlot = "08.30 am";
    } else if (["Euro Legends"].includes(category)) {
      timeSlot = "11.00 am";
    } else if (
      ["Mighty Mini Club", "Starlet Club", "RunX", "Pocket Rockets"].includes(
        category
      )
    ) {
      timeSlot = "01.00 pm";
    } else if (["Ultra Exclusive"].includes(category)) {
      timeSlot = "02.00 pm";
    } else if (["Evo", "Subaru", "Honda"].includes(category)) {
      timeSlot = "04.00 pm";
    } else if (["Race / Competition"].includes(category)) {
      timeSlot = "04.30 pm";
    } else {
      timeSlot = "06.00 pm";
    }

    return timeSlot;
  };

  // Handle user registration
  const registrationHandler = async () => {
    const {
      name,
      nic,
      email,
      category,
      vehicleNumber,
      vehicleModel,
      vehicleYear,
    } = register;

    if (validateName(name)) {
      setError(validateName(name));
      setTimeout(() => setError(""), 5000);
    } else if (validateNIC(nic)) {
      setError(validateNIC(nic));
      setTimeout(() => setError(""), 5000);
    } else if (validateEmail(email)) {
      setError(validateEmail(email));
      setTimeout(() => setError(""), 5000);
    } else if (category === "" || category === "None") {
      setError("Select your car category!");
      setTimeout(() => setError(""), 5000);
    } else if (vehicleModel === "" || vehicleModel === "None") {
      setError("Select your vehicle model!");
      setTimeout(() => setError(""), 5000);
    } else if (vehicleNumber === "") {
      setError("Enter your vehicle number!");
      setTimeout(() => setError(""), 5000);
    } else if (validateVehicleYear(vehicleYear)) {
      setError(validateVehicleYear(vehicleYear));
      setTimeout(() => setError(""), 5000);
    } else {
      // Load registered members
      getRegisteredMembers();

      // Check reservation number exceeds
      if ((await getTimeSlotReservations(assignTimeSlots(category))) < 250) {
        // Add documents
        await addDoc(registeredMembersRef, {
          registration_number: Math.floor(new Date().valueOf() * Math.random())
            .toString()
            .slice(5, 11),
          name,
          nic,
          email,
          category,
          vehicle_model: vehicleModel,
          vehicle_number: vehicleNumber,
          vehicle_year: vehicleYear.toLocaleString().slice(4, 8),
          time_slot: assignTimeSlots(category),
          date_time: new Date().toLocaleString(),
        })
          .then((data) => {
            setError("");
            setSuccess("Successfully Registerd, Check your email!");
            console.log(register);
            // Send an email
            submitEmail(email, assignTimeSlots(category), category);
            setTimeout(() => {
              setSuccess("");
              alert(
                "Invitation has been sent to your email, Check the spam folder if you unable find it in the inbox folder!"
              );
              window.location.href = "http://thepinkautoshop.com/";
            }, 3000);
          })
          .catch((err) => {
            console.log(err);
          });
        clearForm();
      } else {
        setSuccess("");
        setError("Maximum number of registrations for this category exceeded!");
        setTimeout(() => setError(""), 5000);
      }
    }
  };

  return (
    <>
      <div className="reg-container">
        <div className="overlay"></div>

        <div className="info">
          <div className="logo">
            <img src="./assets/logo.jpg" alt="" />
          </div>
          <div className="contact">
            <label htmlFor="">
              <FaDirections />
              Kotte Road, Pita Kotte, Sri Lanka
            </label>
            <label htmlFor="">
              <FaPhoneSquare />
              0112863200
            </label>
            <label htmlFor="">
              <FaEnvelopeOpenText />
              thepinkautoshop@gmail.com
            </label>
            <label htmlFor="">
              <FaInternetExplorer />
              www.thepinkautoshop.com
            </label>
          </div>
        </div>
        <div className="reg-form">
          <p>
            <span>PinkFest</span> Registration
          </p>
          {success ? <div className="msg success">{success}</div> : null}
          {error ? <div className="msg error">{error}</div> : null}
          <input
            type="text"
            placeholder="Name"
            autocomplete="off"
            onChange={(e) => setRegister({ ...register, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="NIC Number"
            autocomplete="off"
            onChange={(e) => setRegister({ ...register, nic: e.target.value })}
          />
          <input
            type="text"
            placeholder="Email Address"
            autocomplete="off"
            onChange={(e) =>
              setRegister({ ...register, email: e.target.value })
            }
          />
          <select
            onChange={(e) =>
              setRegister({ ...register, category: e.target.value })
            }
            autocomplete="off"
          >
            <option value="None" disabled selected hidden>
              Select your Car Category
            </option>
            <option value="Classic">Classic</option>
            <option value="Vintage">Vintage</option>
            <option value="Euro Legends">Euro Legends</option>
            <option value="Mighty Mini Club">Mighty Mini Club</option>
            <option value="Starlet Club">Starlet Club</option>
            <option value="RunX">RunX</option>
            <option value="Pocket Rockets">Pocket Rockets</option>
            <option value="Ultra Exclusive">Ultra Exclusive</option>
            <option value="Evo">Evo</option>
            <option value="Subaru">Subaru</option>
            <option value="Honda">Honda</option>
            <option value="Race / Competition">Race / Competition</option>
          </select>
          {register.category ? (
            <>
              <select
                onChange={(e) =>
                  setRegister({ ...register, vehicleModel: e.target.value })
                }
                autocomplete="off"
              >
                <option value="None" disabled selected hidden>
                  Select your vehicle model
                </option>
                {vehicleModels?.map((model) => (
                  <option value={model}>{model}</option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Vehicle Number"
                onChange={(e) =>
                  setRegister({ ...register, vehicleNumber: e.target.value })
                }
                autocomplete="off"
              />
              <DatePicker
                selected={register.vehicleYear}
                dateFormat="yyyy"
                showYearPicker
                onChange={(date) =>
                  setRegister({
                    ...register,
                    vehicleYear: new Date(date),
                  })
                }
                minDate={new Date("1950")}
                maxDate={new Date("2022")}
                placeholderText="Vehicle Year"
              />
            </>
          ) : null}
          <button className="reg-btn" onClick={registrationHandler}>
            Register
          </button>
        </div>
      </div>
    </>
  );
};
export default Registration;
