import logo from "./logo.svg";
import "./App.css";

import { useState, useEffect } from "react";
import axios from "axios";

export default function App() {
  const [url, setUrl] = useState("");
  const [method, setMethod] = useState("GET");
  const [body, setBody] = useState("");
  const [response, setResponse] = useState(null);
  const [history, setHistory] = useState([]);
  const [page, setPage] = useState(1);

  const sendRequest = async () => {
    try {
      const options = {
        method,
        url,
        data: body ? JSON.parse(body) : undefined,
      };

      const res = await axios(options);
      const contentType = res.headers["content-type"];

      const responseData =
        contentType && contentType.includes("application/json")
          ? res.data
          : res.data.toString(); // fallback to raw string

      setResponse(responseData);

      await axios.post("https://rest-client-task-2.onrender.com/api/request-history", {
        url,
        method,
        requestBody: body,
        responseBody:
          typeof responseData === "string"
            ? responseData.slice(0, 1000)
            : JSON.stringify(responseData),
        status: res.status,
      });

      fetchHistory();
    } catch (error) {
      setResponse(error.message);
    }
  };

  const fetchHistory = async () => {
    const res = await axios.get(
      `https://rest-client-task-2.onrender.com/api/request-history?page=${page}`
    );
    setHistory(res.data.data);
  };

  useEffect(() => {
    fetchHistory();
  }, [page]);

  return (
    <>
      <div style={{ padding: "20px" }}>
        <h1>REST Client</h1>
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL"
        />
        <select value={method} onChange={(e) => setMethod(e.target.value)}>
          <option>GET</option>
          <option>POST</option>
          <option>PUT</option>
          <option>DELETE</option>
        </select>
        {(method === "POST" || method === "PUT") && (
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Request Body"
          />
        )}
        <button onClick={sendRequest}>Send</button>
        <h2>Response:</h2>
        <pre>{JSON.stringify(response, null, 2)}</pre>

        <h2>Request History (Page {page})</h2>
        {history.map((req) => (
          <div
            key={req.id}
            style={{
              marginBottom: "10px",
              border: "1px solid #ccc",
              padding: "10px",
            }}
          >
            <div>
              <strong>{req.method}</strong> {req.url}
            </div>
            <div>Status: {req.status}</div>
            <div>
              <small>{req.createdAt}</small>
            </div>
          </div>
        ))}
        <button onClick={() => setPage((p) => Math.max(p - 1, 1))}>
          Previous
        </button>
        <button onClick={() => setPage((p) => p + 1)}>Next</button>
      </div>
    </>
  );
}
