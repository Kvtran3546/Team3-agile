import { listingData } from "../constants/index.js";
import "../css/SpotPage.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";

function starString(num, maxNum = 5) {
  var filled = new Array(num + 1).join("★");
  var unfilled = new Array(maxNum - num + 1).join("☆");
  return filled.concat(unfilled);
}

function SpotPage() {
  const [auth, setAuth] = useState(false);
  const [message, setErrorMessage] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [review, setReview] = useState("");
  const data = useLocation().state;
  useEffect(() => {
    console.log("Component mounted or updated");
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
      axios
      .get(`http://localhost:3000/listings/${data.postId}/reviews`, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        setReviews(res.data);
      })
      .catch((error) => {
        console.error("Error fetching reviews: ", error);
        setErrorMessage("Error fetching reviews");
      });
  }, [navigate, data.postId]);
  const submitReview = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/listings/submitreview",
        {
          postId: data.postId,
          reviewerName: name, // Use the 'name' state variable for the reviewer's name
          review: review,
        },
        { withCredentials: true }
      );
      setReviews([...reviews, { reviewerName: name, review: review }]); // Update reviews list with the new review
      setReview(""); // Reset review input
    } catch (error) {
      console.error("Error submitting review: ", error);
      setErrorMessage("Error submitting review");
    }
  };
  return (
    <div className="flex flex-col w-full bg-[#E2E2E2] items-center">
      <div className="container">
        <h1 className="title_header">{data.title}</h1>
        <hr />
        <div className="image_info">
          <div className="img-container">
            <img src={data.image} alt={data.title} />
          </div>
          <p className="ml-10">
            <b>Address:</b> {data.address}, {data.city}, {data.state}
            <br className="" />
            <b>Description:</b> {data.description}
          </p>
        </div>
        <hr />
        <div className="review_container flex flex-col">
          <h1 className="title_header">Reviews</h1>
          <div className="px-10 flex flex-col border-2 border-gray-300 rounded-md">
            {reviews.map((r, index) => (
                <div key={index}>
                    <p>{r.reviewerName} : {r.review}</p>
                </div>
            ))}
          </div>
          {/* Review Submission Form */}
          <form onSubmit={submitReview}>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Write your review here"
              className="flex w-full px-10 mt-1 border-2 border-gray-300 rounded-md"
            />
            <button type="submit">Submit Review</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SpotPage;
