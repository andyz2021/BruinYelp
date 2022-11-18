import React, { useState } from "react";
// import "./StarRating.css";
export default function StarRating(prop)  {
    const [rating, setRating] = useState(prop.stars);
    const [hover, setHover] = useState(0);

    const update = (num) => {
        setRating(num);
        prop.handleStar(num);
    }

    return (
      <div className="star-rating">
        {[...Array(5)].map((star, index) => {
          index += 1;
          return (
            <button
              type="button"
              key={index}
              className={index <= (hover || rating) ? "on" : "off"}
              onClick={() => update(index)}
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(rating)}
            >
              <span className="star">&#9733;</span>
            </button>
          );
        })}
      </div>
    );
  };  
  
//export default StarRating;