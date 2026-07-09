import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../api/categoryApi";
const BASE_URL = import.meta.env.VITE_BASE_URL;
function Category() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const scrollRef = useRef();

  const categories =
    useSelector((state) => state.categories.categories) || [];
   
    const parentCategories = categories.filter(
      (item)=> item.parent_id === null)
      
    
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({
      left: -300,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({
      left: 300,
      behavior: "smooth",
    });
  };

  return (
    <div className="container py-4">

      {/* HEADER */}
      <div className=" mb-4">
       
        <p className="text-muted">
          Discover products across all categories
        </p>
      </div>

      {/* SLIDER WRAPPER */}
      <div className="position-relative">

        {/* LEFT BUTTON */}
        <button
          onClick={scrollLeft}
          className="btn btn-light shadow-sm rounded-circle position-absolute"
          style={{
            left: "-10px",
            top: "40%",
            zIndex: 10,
            width: "40px",
            height: "40px"
          }}
        >
          ‹
        </button>

        
        <div
          ref={scrollRef}
          className="d-flex gap-3 overflow-auto hide-scrollbar py-2"
          style={{
            scrollBehavior: "smooth",
            whiteSpace: "nowrap"
          }}
        >

          {parentCategories.map((category) => (
            <div
              key={category.id}
              className="card border-0 shadow-sm"
              style={{
                minWidth: "160px",
                cursor: "pointer",
                flexShrink: 0,
                borderRadius: "12px"
              }}
              onClick={() =>
                navigate(`/product/${category.id}`)
              }
            >
     <img
  src={
    category.image?.startsWith("http")
      ? category.image
      : `${BASE_URL}/Allimages/${category.image}`
  }
  alt={category.title}
  width="60"
  height="60"
/>
      

              <div className="card-body text-center p-2">
                <small className="fw-bold">
                  {category.name}
                </small>
              </div>
            </div>
          ))}

        </div>

        {/* RIGHT BUTTON */}
        <button
          onClick={scrollRight}
          className="btn btn-light shadow-sm rounded-circle position-absolute"
          style={{
            right: "-10px",
            top: "40%",
            zIndex: 10,
            width: "40px",
            height: "40px"
          }}
        >
          ›
        </button>

      </div>
    </div>
  );
}

export default Category;