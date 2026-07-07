import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar2 from "./navbar2.jsx";
import Footer from "./footer.jsx"
import Navbar from './navbar.jsx';
import { useContext } from 'react';
import { userContext } from './context.jsx';


function product() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(0);
  const [images, setimages] = useState([]);
  const [state, setstate] = useState(false);
  const [formdata, setformdata] = useState({
    category: "",
    productName: "",
    productDescription: "",
    productPrice: "",
  });
  const {isLoggedIn}=useContext(userContext);

  const handleChange = (e) => {
    setformdata({ ...formdata, [e.target.name]: e.target.value });
  };
  const handleReset = () => {
    setformdata({
      category: "",
      productName: "",
      productDescription: "",
      productPrice: "",
    });
    setimages([]);
    setstate(false)

    setSelected(0);
  };
  const handleSubmit = async (e) => {
    console.log(formdata);

    e.preventDefault();
    try {
      const data = new FormData();
      data.append("category", formdata.category);
      data.append("productName", formdata.productName);
      data.append("productPrice", formdata.productPrice);
      data.append("productDescription", formdata.productDescription);

      console.log("heyyyy");
      images.forEach((img) => {
        data.append("productImage", img);
      });

      const res = await axios.post(
        `${import.meta.env.RENDER_BACKEND_URL}/product/register`,
        data,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      console.log(res);
      if (res.data.success) {
        setstate(true);
      }
    } catch (error) {
      console.log(error.response);
    }
  };
  const removeImage = (index) => {
    setimages((prev) => {
      const updated = [...prev];
      updated.splice(index, 1);
      return updated;
    });
  };

  return (
    <>
    {isLoggedIn?(<Navbar2/>):(<Navbar/>)}
      <div className="flex flex-col justify-center items-center m-7">
        <div className="flex flex-col w-[100%] max-w-[620px]">
          <div className="mb-[55px] flex justify-between">
            <h2 className="font-['Space_Grotesk',sans-serif] text-2xl font-semibold text-[var(--text)]">
              Register a new listing
            </h2>
            <p
              onClick={() => navigate("/home")}
              className="font-['Space_Grotesk',sans-serif] text-[16px] font-semibold text-[var(--text)] cursor-pointer"
            >
              Home
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <h2 className="text-[var(--text-muted)] text-[14px] mb-4">
                Listing Category
              </h2>
              <div className="grid grid-cols-2 gap-7">
                <label
                  className={`p-5 border-[2px] rounded-2xl transition-colors duration-200 ${selected === 1 ? "border-[var(--services)] bg-[var(--services-dim)]" : "border-[var(--border)]  bg-[var(--surface)]"}`}
                >
                  <input
                    onChange={(e) => {
                      setSelected(1);
                      setformdata({ ...formdata, category: e.target.value });
                    }}
                    className="w-0 h-0 opacity-0"
                    type="radio"
                    value="services"
                    name="category"
                  />
                  <div className="flex flex-col ">
                    <div>Services</div>
                    <div className="text-[var(--text-muted)] text-[14px]">
                      Consulting, design ,developement or any expertise based
                      work.
                    </div>
                  </div>
                </label>
                <label
                  className={`p-5 border-[2px] rounded-2xl transition-colors duration-200 ${selected === 2 ? "border-[var(--products)] bg-[var(--products-dim)]" : "border-[var(--border)]  bg-[var(--surface)]"}`}
                >
                  <input
                    onChange={(e) => {
                      setSelected(2);
                      setformdata({ ...formdata, category: e.target.value });
                    }}
                    className="w-0 h-0 opacity-0"
                    type="radio"
                    value="products"
                    name="category"
                  />
                  <div>Products</div>
                  <div className="text-[var(--text-muted)] text-[14px]">
                    Consulting, design ,developement or any expertise based work
                  </div>
                </label>
              </div>
            </div>
            <div className="flex flex-col">
              <label className="my-3">Listing Name</label>
              <input
                required={true}
                className="border-[2px] border-[var(--border)] bg-[var(--bg-input)] rounded-[10px] py-[12px] px-[16px]"
                onChange={handleChange}
                type="text"
                value={formdata.productName}
                name="productName"
                placeholder="Enter the product name"
              />
              <label className="my-3">Price</label>
              <input
                required={true}
                className="border-[2px] border-[var(--border)] bg-[var(--bg-input)] rounded-[10px] py-[12px] px-[16px]"
                onChange={handleChange}
                type="text"
                value={formdata.productPrice}
                name="productPrice"
                placeholder="Enter the price"
              />
              <label className="my-3">Description</label>
              <textarea
                className=" min-h-[110px] border-[2px] border-[var(--border)] bg-[var(--bg-input)] rounded-[10px] py-[12px] px-[16px]"
                onChange={handleChange}
                value={formdata.productDescription}
                name="productDescription"
                placeholder="Enter some details of the product"
              />
              <label className="my-3">Images</label>
              <div
                className=" relative flex flex-col border-[1.5px] border-[var(--border)] bg-[var(--bg-input)] rounded-[14px] py-[36px] px-[24px] justify-center items-center gap-[10px]
            cursor-pointer bg-[var(--bg-card)]"
              >
                <input
                  onChange={(e) => {
                    const files = Array.from(e.target.files);

                    setimages((prev) => [...prev, ...files]);
                  }}
                  required={true}
                  className="absolute z-0 cursor-pointer opacity-0 w-[100 %] h-[100 %] inset-0"
                  type="file"
                  multiple
                  placeholder="Upload the images"
                />
                {images.length > 0 && (
                  <div className="grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] mt-1 gap-3 z-10">
                    {images.map((img, index) => (
                      <div key={index}>
                        <img
                          className="rounded-md object-fill"
                          src={URL.createObjectURL(img)}
                          alt=""
                        />
                        <button type="button" className=" cursor-pointer z-20 mb-1.5 hover:scale-120 transition-all duration-150 ease-in-out " onClick={()=>removeImage(index)}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                            color="currentColor"
                            fill="none"
                          >
                            <defs />
                            <path
                              fill="currentColor"
                              d="M13.103,1.25 C13.474,1.251 13.797,1.256 14.075,1.281 C14.444,1.314 14.788,1.386 15.122,1.559 C15.255,1.628 15.381,1.707 15.5,1.796 C15.802,2.021 16.016,2.299 16.207,2.617 C16.387,2.916 16.569,3.293 16.784,3.736 L17.276,4.75 L21.75,4.75 C22.164,4.75 22.5,5.086 22.5,5.5 C22.5,5.914 22.164,6.25 21.75,6.25 L20.955,6.25 L20.376,15.61 C20.299,16.858 20.238,17.848 20.113,18.639 C19.984,19.45 19.778,20.126 19.366,20.717 C18.989,21.257 18.504,21.714 17.941,22.056 C17.326,22.431 16.639,22.595 15.821,22.674 C15.024,22.75 14.032,22.75 12.781,22.75 L12.704,22.75 C11.452,22.75 10.459,22.75 9.66,22.674 C8.842,22.595 8.154,22.431 7.539,22.055 C6.975,21.712 6.49,21.255 6.113,20.713 C5.701,20.121 5.496,19.445 5.368,18.632 C5.244,17.84 5.184,16.849 5.108,15.599 L4.544,6.25 L3.75,6.25 C3.336,6.25 3,5.914 3,5.5 C3,5.086 3.336,4.75 3.75,4.75 L8.321,4.75 L8.74,3.831 C8.949,3.371 9.127,2.981 9.304,2.671 C9.492,2.342 9.705,2.052 10.011,1.818 C10.131,1.726 10.259,1.643 10.394,1.572 C10.734,1.391 11.085,1.317 11.463,1.282 C11.818,1.25 12.247,1.25 12.752,1.25 Z M19.452,6.25 L6.047,6.25 L6.603,15.47 C6.682,16.767 6.738,17.687 6.85,18.4 C6.96,19.1 7.114,19.526 7.344,19.857 C7.602,20.227 7.934,20.54 8.32,20.775 C8.663,20.984 9.098,21.113 9.804,21.18 C10.522,21.249 11.443,21.25 12.743,21.25 C14.04,21.25 14.961,21.249 15.678,21.181 C16.383,21.113 16.817,20.985 17.16,20.775 C17.546,20.541 17.878,20.229 18.136,19.859 C18.366,19.529 18.52,19.104 18.631,18.404 C18.744,17.692 18.802,16.774 18.882,15.479 Z M10.25,9.75 C10.664,9.75 11,10.086 11,10.5 L11,16.5 C11,16.914 10.664,17.25 10.25,17.25 C9.836,17.25 9.5,16.914 9.5,16.5 L9.5,10.5 C9.5,10.086 9.836,9.75 10.25,9.75 Z M15.25,9.75 C15.664,9.75 16,10.086 16,10.5 L16,16.5 C16,16.914 15.664,17.25 15.25,17.25 C14.836,17.25 14.5,16.914 14.5,16.5 L14.5,10.5 C14.5,10.086 14.836,9.75 15.25,9.75 Z M13.199,2.751 L12.408,2.751 C12.063,2.752 11.808,2.757 11.599,2.776 C11.333,2.8 11.198,2.843 11.098,2.896 C11.037,2.929 10.979,2.966 10.924,3.008 C10.834,3.077 10.739,3.183 10.607,3.414 C10.468,3.658 10.318,3.985 10.091,4.482 L9.969,4.75 L15.609,4.75 L15.448,4.419 C15.216,3.939 15.062,3.624 14.921,3.389 C14.787,3.166 14.693,3.065 14.603,2.998 C14.549,2.958 14.492,2.922 14.432,2.89 C14.333,2.839 14.2,2.798 13.941,2.775 C13.746,2.758 13.512,2.752 13.199,2.751 Z"
                            />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                {images.length===0 && (
                    
                <div className=" flex w-[44px] h-[44px] rounded-[12px] bg-[var(--bg-input)]">
                  <svg
                    className="w-[22px] h-[22px] stroke-[var(--text-2)]"
                    viewBox="0 0 24 24"
                    fill="none"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2.5"></rect>
                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                    <polyline points="21 15 16 10 5 21"></polyline>
                  </svg>
                  <svg
                    className=" w-[22px] h-[22px] stroke-[var(--text-2)]"
                    viewBox="0 0 24 24"
                    fill="none"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2.5"></rect>
                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                    <polyline points="21 15 16 10 5 21"></polyline>
                  </svg>
                </div>
                )}

                <div className="text-[var(--text-1)] text-[14px] font-semibold">
                  Drop images here or click to browse
                </div>
                <div className="text-[var(--text-3)] text-[12px] ">
                  Supports JPG, PNG, WEBP · Max 5 MB per file
                </div>
                <span className="text-[var(--text-3)] text-[11px] py-[3px] px-[10px] border border-[var(--border)] rounded-[7px]">
                  Up to 8 images
                </span>
              </div>
              <div className="flex flex-wrap items-center justify-between pt-[32px] mt-[8px] border-t-[2px] border-[var(--border)]">
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-[14px] font-medium text-[var(--text-2)] bg-transparent border border-[var(--border)] rounded-[10px] px-[22px] py-[11px] cursor-pointer transition-colors duration-200"
                >
                  Clear all
                </button>
                <button
                  type="submit"
                  className="font-['Sora',sans-serif] text-[14px] font-semibold text-[#0e0f11] bg-[var(--accent)] rounded-[10px] px-[24px] py-[8px] cursor-pointer flex items-center gap-2 tracking-[-0.01em] transition-all duration-200 hover:opacity-90 active:scale-95"
                >
                  Submit
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>
              </div>
            </div>
          </form>
          {state && (
            <p className="text-amber-50">✅ Product registered successfully!</p>
          )}
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default product;
