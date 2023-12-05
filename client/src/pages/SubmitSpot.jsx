import "../css/SubmitSpot.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

const abbreviations = [
  "AL",
  "AK",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "FL",
  "GA",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "OH",
  "OK",
  "OR",
  "PA",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY",
];

function SubmitSpot() {
  const [auth, setAuth] = useState(false);
  const [message, setErrorMessage] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const response = axios
      .get("http://localhost:3000/users/", { withCredentials: true })
      .then((res) => {
        if (res.data.Status === "Success") {
          setAuth(true);
          setName(res.data.name);
        } else {
          setAuth(false);
          setErrorMessage(res.data.error);
          navigate("/login");
        }
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setErrorMessage("Error fetching data");
        navigate("/login");
      });
    // Include navigate in the dependency array to ensure useEffect is aware of it
  }, [navigate]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [inputs, setInputs] = useState({
    title: '',
    address: '',
    city: '',
    state: '', // Initialize to empty string
    description: ''
  });
  const handleChange = (event) => {
    const { name, value, type, files } = event.target;
    if (type === "file") {
      setSelectedFiles(files); // Set an array of files
    } else {
      setInputs((values) => ({ ...values, [name]: value }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(inputs); // Log to check the state
    console.log(selectedFiles); // Log to check selected files
    const formData = new FormData();
    formData.append('title', inputs.title);
    formData.append('address', inputs.address);
    formData.append('city', inputs.city);
    formData.append('state', inputs.state);
    formData.append('description', inputs.description);
    for (let i = 0; i < selectedFiles.length; i++) {
        formData.append(`images`, selectedFiles[i]);
      }
    for (let pair of formData.entries()) {
    console.log(`${pair[0]}: ${pair[1]}`);
    }
    // Append each file to the form data
    try {
        const response = await axios.post(
          "http://localhost:3000/listings/submitspot",
          formData
        );
        navigate("/profile");
      } catch (error) {
        console.error(
          "Error during submission:",
          error.response ? error.response.data : error.message
        );
      }
  };

  return (
    <>
      <div className="submitContainer">
        <form onSubmit={handleSubmit}>
          <input
            className="fieldInput"
            placeholder="Location Title"
            type="text"
            name="title"
            value={inputs.title || ""}
            onChange={handleChange}
          />
          <input
            className="fieldInput"
            placeholder="Street Address"
            type="text"
            name="address"
            value={inputs.address || ""}
            onChange={handleChange}
          />
          <div className="cityState">
            <input
              className="fieldInput"
              placeholder="City"
              type="text"
              name="city"
              value={inputs.city || ""}
              onChange={handleChange}
            />
            <label>___</label>
            <select className="fieldInput" name="state" value={inputs.state} onChange={handleChange}>
              <option value="" disabled>Select a State</option>
              {abbreviations.map((item) => (
                <option value={item} key={item}>{item}</option>
              ))}
            </select>
          </div>
          <textarea
            rows={7}
            className="fieldInput"
            placeholder="Description"
            type="text"
            name="description"
            value={inputs.description || ""}
            onChange={handleChange}
          />
          <input
            className="submitButton"
            name="images"
            type="file"
            onChange={handleChange}
            multiple // Allow multiple file selection
          />
          <button className="submitButton" type="submit" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default SubmitSpot;
