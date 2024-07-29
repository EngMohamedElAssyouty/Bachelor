import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import NET from "vanta/dist/vanta.net.min.js";
import "../index.css";



const HeaderPic = (props) => {
  const [vantaEffect, setVantaEffect] = useState(0);

  const myRef = useRef(null);
  const handleSubmit=()=>{
      window.location="/login";
  }
  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        NET({
          el: myRef.current,
          THREE: THREE,
          color: 0xff3f81,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 600.0,
          minWidth: 600.0,
          skyColor: 0x191b3a, // 0x2a386e,
          sunColor: 0xfffffff,
          sunGlareColor: 0x383e89,
          sunlightColor: 0x0,
          speed: 0.4,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <div ref={myRef}>

      <section className="showcase">
        <div className="showcase-overlay">
          <h1 style={{ color: "white" }}>Online Exams Tool</h1>
          <p>Take the next step toward your personal and professional goals!</p>

        </div>
      </section>
    
      <div
          style={{
            width: "80%",
            color: "gray",
            display: "inline-block",
            // textAlign: "left",
            padding: 20,
          }}
          
        >
        The internet nowadays plays a big role in modern life, and using online systems through the internet became 
        the go to of every institution, employee's can communicate and interact and work with each other from home 
        and meetings can be easily done online using video and audio group calls. Lately, the world witnessed a huge 
        pandemic that forced everyone around the world to stay at home. Therefore working online became the only tool 
        available for all institutions to engage with workers/students/etc. Schools and Universities had to ensure a safe 
        learning environment for students, hence they switched the learning program to online learning. One of the most
        important basis in the learning program is assessing. The aim of the project is to create an online assessment tool
        to assess students and ensure a simple and sufficient way to test them online.
        </div>
        <button onClick={handleSubmit}>GET STARTED </button>
    </div>
  );
};

export default HeaderPic;