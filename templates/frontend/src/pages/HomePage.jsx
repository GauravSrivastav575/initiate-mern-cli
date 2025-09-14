import { useEffect, useState } from "react";
import api from "../services/api.js";

function HomePage() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    api.get("/sample")
      .then(res => setMessage(res.data.message))
      .catch(err => console.error("API error:", err));
  }, []);

  return (
    <div>
      <h2>Home Page</h2>
      <p>Backend says: {message || "Loading..."}</p>
    </div>
  );
}

export default HomePage;
