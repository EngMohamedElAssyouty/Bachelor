import React from "react";
import Footer from "./Footer";
import HeaderPic from "./HeaderPic";



export default function LandingPage() {
 
  sessionStorage.clear()

  return (
    <>
    <HeaderPic/>
      <div style={{ textAlign: "center" }}>
        <div>
          <br />
        </div>
        <div
          style={{
            width: "80%",
            color: "gray",
            display: "inline-block",
            // textAlign: "left",
            padding: 20,
          }}
        >
        
        </div>
        <Footer/>
      </div>
    </>
  );
}