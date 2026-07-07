import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function registration() {
  const navigate = useNavigate();
  const [step, setstep] = useState(1);
  const [coverImage, setcoverImage] = useState(null);
  const [errormsg, seterrormsg] = useState("");
  const [colleges, setCollege] = useState([
    "Maharaja Agrasen Institute of Technology (MAIT)",
    "Maharaja Surajmal Institute of Technology (MSIT)",
    "Bharati Vidyapeeth College of Engineering (BVCOE)",
    "University School of Information, Communication and Technology (USICT)",
    "University School of Automation and Robotics (USAR)",
    "Guru Tegh Bahadur Institute of Technology (GTBIT)",
    "HMR Institute of Technology and Management",
    "Delhi Technical Campus (DTC)",
    "JIMS Engineering Management Technical Campus",
    "Vivekananda Institute of Professional Studies (VIPS)",
    "Dr. Akhilesh Das Gupta Institute of Technology (ADGITM)",
    "Northern India Engineering College (NIEC)",
    "Chandigarh School of Business",
    "Ambedkar Institute of Advanced Communication Technologies and Research",
    "BM Institute of Engineering and Technology",
    "Gitarattan International Business School",
    "Trinity Institute of Innovations in Professional Studies",
    "KCC Institute of Technology and Management",
    "Lingaya’s Lalita Devi Institute of Management and Sciences",
    "Institute of Information Technology and Management (IITM)",
    "Rukmini Devi Institute of Advanced Studies",
    "Fairfield Institute of Management and Technology",
    "Tecnia Institute of Advanced Studies",
    "Jagannath International Management School",
    "Kasturi Ram College of Higher Education",
    "Delhi Institute of Advanced Studies",
    "Institute of Innovation in Technology and Management",
    "Army Institute of Management and Technology",
    "Banarsidas Chandiwala Institute of Information Technology",
    "Ideal Institute of Management and Technology",
  ]);
  const [formdata, setformdata] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    college: "",
    course: "",
    year: "",
    contactNumber: "",
  });
  const [avatar, setavatar] = useState(null);
  const handleChange = (e) => {
    setformdata({ ...formdata, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    console.log(avatar);

    e.preventDefault();
    try {
      const data = new FormData();
      data.append("fullname", formdata.fullname);
      data.append("username", formdata.username);
      data.append("email", formdata.email);
      data.append("password", formdata.password);
      data.append("college", formdata.college);
      data.append("course", formdata.course);
      data.append("year", formdata.year);
      data.append("contactNumber", formdata.contactNumber);
      data.append("avatar", avatar);

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/users/register`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      

      if (res.data.success) {
        await seterrormsg(res.data.message);

        navigate("/");
      }
      
    } catch (error) {
      console.log(error.response);

      seterrormsg(error.response.data.message);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-black relative overflow-hidden">
        <div
          className="absolute inset-0 
      bg-gradient-to-br from-[#0a0a0f] via-[#1a0b2e] to-black"
        ></div>

        <div
          className="absolute inset-0 
      bg-[radial-gradient(circle_at_30%_30%,rgba(96,23,197,0.4),transparent_60%)]"
        ></div>

        {/* main code above for bg color only */}
        <div className="relative flex gap-34 justify-center h-screen items-center z-1">
          <div
            className=" border-[2px] border-blue-500 rounded-md m-5 bg-[var(--bg-card)] w-[380px] h-auto hover:scale-107 transition-all duration-700 
    

hover:bg-zinc-800/90
hover:border-violet-500
hover:shadow-[0_0_35px_rgba(168,85,247,0.45)]
hover:-translate-y-2
hover:scale-[1.02]"
          >
            <div className="mb-4 ml-3">
              <p className=" text-[rgb(139,92,246)] text-4xl font-extrabold tracking-[-0.5px] font-['Outfit'] mb-0.3 mt-1.5">
                Get Started
              </p>
              <p className="text-[var(--text-muted)] font-[14px]">
                Register yourself to the platform
              </p>
            </div>

            {step === 1 && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setstep(2);
                }}
                className="flex flex-col gap-5 mt-15 pb-6"
                action="post"
              >
                <input
                  className=" hover:scale-110 transition duration-300   border border-blue-300  h-11 ml-3  bg-black text-amber-50 w-[350px] h-10 rounded-md p-4"
                  type="text"
                  required={true}
                  name="fullname"
                  value={formdata.fullname}
                  onChange={handleChange}
                  placeholder="fullname"
                />

                <input
                  className="hover:scale-110 transition duration-300 ml-3 border border-blue-300   mb-0 h-11 bg-black text-amber-50 w-[350px] h-10  rounded-md p-4"
                  type="email"
                  name="email"
                  required={true}
                  value={formdata.email}
                  onChange={handleChange}
                  placeholder="email"
                />
                <input
                  className="hover:scale-110 transition duration-300 ml-3 border border-blue-300  mb-0 h-11 bg-black text-amber-50 w-[350px] h-10  rounded-md p-4"
                  type="text"
                  name="username"
                  required={true}
                  value={formdata.username}
                  onChange={handleChange}
                  placeholder="username"
                />
                <input
                  className="hover:scale-110 transition duration-300 ml-3 border border-blue-300  mb-0 h-11 bg-black text-amber-50 w-[350px] h-10  rounded-md p-4"
                  type="password"
                  name="password"
                  required={true}
                  value={formdata.password}
                  onChange={handleChange}
                  placeholder="Password"
                />
                <input
                  className="hover:scale-110 transition duration-300 ml-3 border border-blue-300 mb-0 h-11 bg-black text-amber-50 w-[350px] h-10  rounded-md p-4"
                  type="text"
                  name="contactNumber"
                  required={true}
                  value={formdata.contactNumber}
                  onChange={handleChange}
                  placeholder="contact number"
                />

                <button
                  type="submit"
                  className="ml-3  shadow-[0_0_15px_rgba(186,158,255,0.3)] rounded-[4px] bg-[#8455EF] text-[#390061] w-300px mt-1 mb-0  h-13  w-[350px]  border-2  border-amber-50 cursor-pointer text-[rgb(57,0,140)] font-bold cursor-pointer hover:bg-[#9B6FF5] hover:shadow-[0_0_28px_rgba(186,158,255,0.55)] hover:-translate-y-0.5
    active:bg-[#7040D9] active:translate-y-0 transition-all duration-200 ease-in-out "
                >
                  Next
                </button>
               
              </form>
            )}
            {step === 2 && (
              <div className="flex flex-col gap-6 p-4 justify-center">
                {/* Avatar Upload */}
                <div className="flex flex-col items-center gap-3 p-4 border border-gray-600 rounded-lg bg-[#111] hover:border-purple-500 transition">
                  <label className="text-white font-semibold">
                    Upload Avatar *
                  </label>

                  <div className="w-20 h-20 rounded-full bg-gray-800 flex items-center justify-center overflow-hidden border border-gray-500">
                    {avatar ? (
                      <img
                        src={URL.createObjectURL(avatar)}
                        alt="avatar"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-gray-400 text-sm">No Image</span>
                    )}
                  </div>

                  <input
                    type="file"
                    required={true}
                    accept="image/*"
                    onChange={(e) => setavatar(e.target.files[0])}
                    className="text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 
                 file:rounded-md file:border-0 
                 file:bg-purple-500 file:text-white 
                 hover:file:bg-purple-600 cursor-pointer"
                  />
                </div>

                {/* Cover Image Upload */}
                <select
                  onChange={handleChange}
                  name="college"
                  className="bg-zinc-950
text-zinc-200
border border-white/10
rounded-md
px-4 py-3

shadow-[0_0_15px_rgba(168,85,247,0.15)]

hover:border-violet-500
focus:border-violet-400
focus:shadow-[0_0_25px_rgba(168,85,247,0.35)]

transition-all duration-300
"
                  
                >

                  <option value="" disabled>
                    Select Your College
                  </option>
                  {colleges.map((college, index) => (
                    <option value={college} key={index}>
                      {college}
                    </option>
                  ))}
                </select>

                <input
                  className="hover:scale-110 transition duration-300  mb-0 h-11 bg-black text-amber-50 w-[350px] h-10  rounded-md p-4"
                  type="text"
                  name="course"
                  required={true}
                  value={formdata.course}
                  onChange={handleChange}
                  placeholder="course"
                />
                <input
                  className="hover:scale-110 transition duration-300   mb-0 h-11 bg-black text-amber-50 w-[350px] h-10  rounded-md p-4"
                  type="text"
                  name="year"
                  required={true}
                  value={formdata.year}
                  onChange={handleChange}
                  placeholder="year"
                />

                {errormsg && (
                  <p
                    onClick={() => {
                      navigate("/login");
                    }}
                    className=" cursor-pointer text-red-600 text-center"
                  >
                    {errormsg}
                  </p>
                )}

                <button
                  onClick={handleSubmit}
                  className="ml-1 shadow-[0_0_15px_rgba(186,158,255,0.3)] rounded-[4px] bg-[#8455EF] text-[#390061] w-300px  mb-0  h-13  w-[350px]  border-2  border-amber-50 cursor-pointer text-[rgb(57,0,140)] font-bold cursor-pointer hover:bg-[#9B6FF5] hover:shadow-[0_0_28px_rgba(186,158,255,0.55)] hover:-translate-y-0.5
    active:bg-[#7040D9] active:translate-y-0 transition-all duration-200 ease-in-out "
                >
                  Register
                </button>
                <button
                  onClick={(e) => {
                    setstep(1);
                  }}
                  className="ml-1  shadow-[0_0_15px_rgba(186,158,255,0.3)] rounded-[4px] bg-[#8455EF] text-[#390061] w-300px  mb-0  h-13  w-[350px]  border-2  border-amber-50 cursor-pointer text-[rgb(57,0,140)] font-bold cursor-pointer hover:bg-[#9B6FF5] hover:shadow-[0_0_28px_rgba(186,158,255,0.55)] hover:-translate-y-0.5
    active:bg-[#7040D9] active:translate-y-0 transition-all duration-200 ease-in-out"
                >
                  Back
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default registration;
