// import { Mail } from "@mui/icons-material";
// import { Badge, Box } from "@mui/material";
// import React, { useEffect, useState } from "react";

// const TestNavBar = () => {
//   const [total, setTotal] = useState(0);

//   useEffect(() => {
//     const count = localStorage.parse(localStorage.getItem("textcount") || "0");
//     setTotal(count);
//   }, []);

//   return (
//     <Box>
//       <Box>Products</Box>
//       <Box>
//         <Badge badgeContent={total} color="primary">
//           <Mail />
//         </Badge>
//       </Box>
//     </Box>
//   );
// };

// export default TestNavBar;

// "use client";

// import React, { useEffect, useState } from "react";
// import { Badge, IconButton } from "@mui/material";
// import { Email } from "@mui/icons-material";

// const TestNavBar = () => {
//   const [emailCount, setEmailCount] = useState<number>(0);

//   useEffect(() => {
//     const savedEmailCount = localStorage.getItem("emailCount");
//     if (savedEmailCount) {
//       setEmailCount(Number(savedEmailCount));
//     }
//   }, []);

//   return (
//     <div
//       style={{
//         display: "flex",
//         justifyContent: "space-between",
//         padding: "10px",
//       }}
//     >
//       <div>
//         <h3>Test Navbar</h3>
//       </div>
//       <div>
//         <IconButton>
//           <Badge badgeContent={emailCount} color="error">
//             <Email />
//           </Badge>
//         </IconButton>
//       </div>
//     </div>
//   );
// };

// export default TestNavBar;

import React from "react";
import { Badge, IconButton } from "@mui/material";
import { Email } from "@mui/icons-material";

interface TestNavBarProps {
  emailCount: number;
}

const TestNavBar: React.FC<TestNavBarProps> = ({ emailCount }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "10px",
      }}
    >
      <div>
        <h3>Test Navbar</h3>
      </div>
      <div>
        <IconButton>
          <Badge badgeContent={emailCount} color="error">
            <Email />
          </Badge>
        </IconButton>
      </div>
    </div>
  );
};

export default TestNavBar;

// "use client";

// import React, { useEffect, useState } from "react";
// import { Badge, Box, IconButton } from "@mui/material";
// import { Email } from "@mui/icons-material";

// const TestNavBar = () => {
//   const [emailCount, setEmailCount] = useState<number>(0);

//   useEffect(() => {
//     const savedEmailCount = localStorage.getItem("emailCount");
//     if (savedEmailCount) {
//       setEmailCount(Number(savedEmailCount));
//     }

//     const handleStorageChange = () => {
//       const updatedEmailCount = localStorage.getItem("emailCount");
//       if (updatedEmailCount) {
//         setEmailCount(Number(updatedEmailCount));
//       }
//     };

//     window.addEventListener("storage", handleStorageChange);

//     return () => {
//       window.removeEventListener("storage", handleStorageChange);
//     };
//   }, []);

//   return (
//     <Box sx={{ display: "flex", alignItems: "center" }}>
//       <IconButton>
//         <Badge badgeContent={emailCount} color="error">
//           <Email />
//         </Badge>
//       </IconButton>
//     </Box>
//   );
// };

// export default TestNavBar;
