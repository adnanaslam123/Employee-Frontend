import React, { useEffect, useState } from "react";
import axios from "axios";

function TestConnection() {
  const [status, setStatus] = useState("Testing connection...");

  useEffect(() => {
    async function testApi() {
      try {
        // Step 1: Login to get JWT token
        const loginResponse = await axios.post("http://localhost:8080/login", {
          email: "admin@email.com",    // use your test user email here
          password: "admin123"          // use your test user password here
        });

        const token = loginResponse.data.token;
        console.log("✅ Login successful. Token:", token);

        // Step 2: Use token to call protected endpoint
        const profileResponse = await axios.get("http://localhost:8080/employee/me", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        console.log("✅ Protected API call successful:", profileResponse.data);
        setStatus("✅ Connection test successful! Check console for data.");
      } catch (error) {
        console.error("❌ Connection test failed:", error);
        setStatus("❌ Connection test failed! Check console for error.");
      }
    }

    testApi();
  }, []);

  return <div>{status}</div>;
}

export default TestConnection;
