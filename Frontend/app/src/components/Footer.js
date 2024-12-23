import React from "react";

import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

function Copyright() {
  return (
    <div>
      <Typography variant="body2" color="text.secondary" align="center">
        {"Copyright © "}
        <Link color="inherit" href="/">
          Kite Air
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </div>
  );
}

export default function Footer() {
  return (
    <div>
      <footer className="footer">
        <div style={{ textAlign: "center" }}>
          <br />
          <Copyright />
        </div>
      </footer>
    </div>
  );
}