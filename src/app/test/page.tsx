// import React from "react";

// const TestPage = () => {
//   return <div>TestPage</div>;
// };

// export default TestPage;
// "use client";
// import TestNavBar from "@/components/Test";
// import TestNavBar from "@/components/Test";
// import { Box } from "@mui/material";
// import React, { useEffect, useState } from "react";
// // import TestNavBar from "./TestNavBar";

// const Test = () => {
//   const [emailCount, setEmailCount] = useState<number>(0);

//   const increaseEmailCount = () => {
//     const newCount = emailCount + 1;
//     setEmailCount(newCount);
//     localStorage.setItem("emailCount", newCount.toString());
//   };

//   useEffect(() => {
//     window.addEventListener("storage", increaseEmailCount);
//   });
//   return (
//     <Box sx={{ display: "flex", flexDirection: "column" }}>
//       <TestNavBar />
//       <Box>
//         <div style={{ marginTop: "20px" }}>
//           <button onClick={increaseEmailCount}>Increase Email Count</button>
//         </div>
//       </Box>
//     </Box>
//   );
// };

// export default Test;

// import React, { useState, useEffect } from "react";
// // import TestNavBar from "./TestNavBar";

// const Test = () => {
//   const [emailCount, setEmailCount] = useState<number>(0);

//   useEffect(() => {
//     const savedEmailCount = localStorage.getItem("emailCount");
//     if (savedEmailCount) {
//       setEmailCount(Number(savedEmailCount));
//     }
//   }, []);

//   const increaseEmailCount = () => {
//     const newCount = emailCount + 1;
//     setEmailCount(newCount);
//     localStorage.setItem("emailCount", newCount.toString());
//   };

//   return (
//     <div>
//       <TestNavBar emailCount={emailCount} />
//       <div style={{ marginTop: "20px" }}>
//         <button onClick={increaseEmailCount}>Increase Email Count</button>
//       </div>
//     </div>
//   );
// };

// export default Test;

"use client";

import React, { useState, useEffect } from "react";
import TestNavBar from "@/components/Test";
import { Box } from "@mui/material";

const Test = () => {
  const [emailCount, setEmailCount] = useState<number>(0);

  // Update the count state when the component mounts
  useEffect(() => {
    const savedEmailCount = localStorage.getItem("emailCount");
    if (savedEmailCount) {
      setEmailCount(Number(savedEmailCount));
    }
  }, []);

  // Function to increase email count and update both state and localStorage
  const increaseEmailCount = () => {
    const newCount = emailCount + 1;
    setEmailCount(newCount);
    localStorage.setItem("emailCount", newCount.toString());

    // Notify other components that the localStorage has changed
    window.dispatchEvent(new Event("emailCountUpdated"));
  };

  // Listen for updates to localStorage across other tabs or components
  useEffect(() => {
    const handleStorageChange = () => {
      const savedEmailCount = localStorage.getItem("emailCount");
      if (savedEmailCount) {
        setEmailCount(Number(savedEmailCount));
      }
    };

    // Add event listener for changes in localStorage
    window.addEventListener("storage", handleStorageChange);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <TestNavBar emailCount={emailCount} />
      <Box>
        <div style={{ marginTop: "20px" }}>
          <button onClick={increaseEmailCount}>Increase Email Count</button>
        </div>
      </Box>
    </Box>
  );
};

export default Test;

// "use client";

// import React, { useState, useEffect } from "react";
// import TestNavBar from "@/components/Test";
// import { Box } from "@mui/material";

// const Test = () => {
//   const [emailCount, setEmailCount] = useState<number>(0);

//   useEffect(() => {
//     const savedEmailCount = localStorage.getItem("emailCount");
//     if (savedEmailCount) {
//       setEmailCount(Number(savedEmailCount));
//     }
//   }, []);

//   const increaseEmailCount = () => {
//     const newCount = emailCount + 1;
//     setEmailCount(newCount);
//     localStorage.setItem("emailCount", newCount.toString());

//     window.dispatchEvent(new Event("emailCountUpdated"));
//   };

//   useEffect(() => {
//     const handleStorageChange = () => {
//       const savedEmailCount = localStorage.getItem("emailCount");
//       if (savedEmailCount) {
//         setEmailCount(Number(savedEmailCount));
//       }
//     };

//     window.addEventListener("storage", handleStorageChange);

//     return () => {
//       window.removeEventListener("storage", handleStorageChange);
//     };
//   }, []);

//   return (
//     <Box sx={{ display: "flex", flexDirection: "column" }}>
//       <TestNavBar />
//       <Box>
//         <div style={{ marginTop: "20px" }}>
//           <button onClick={increaseEmailCount}>Increase Email Count</button>
//         </div>
//       </Box>
//     </Box>
//   );
// };

// export default Test;
