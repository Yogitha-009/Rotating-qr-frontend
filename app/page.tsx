"use client";

import axios from "axios";
import { useState } from "react";
import QRCode from "qrcode"

export default function Home() {
  const [token,setToken]=useState('')
  const [qr,setQr]=useState('')
  async function handleOnStart() {
      const eventSource = new EventSource(`${process.env.API_URL}/admin/createdynamicqr`);
      console.log(eventSource)
    
      eventSource.onmessage = async(event) => {
      console.log("New message:", event.data);
      setToken(event.data);
      const url = `${process.env.API_URL}/verify/${token}`;

      console.log("QR URL:", url);
      const qrImage = await QRCode.toDataURL(url);

      setQr(qrImage);
    
      eventSource.onerror = (err) => {
    console.error('EventSource error:', err);
  };
    }
  }

  async function handleOnStop() {
    try {
      const response = await axios.post(`${process.env.API_URL}/admin/stopqr`);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #111827 0%, #1f2937 100%)",
      fontFamily: "Arial, sans-serif"
    }}>
      <div style={{
        background: "#ffffff",
        borderRadius: "18px",
        boxShadow: "0 10px 30px rgba(79, 70, 229, 0.2)",
        padding: "32px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        minWidth: "320px"
      }}>
        <h2 style={{ margin: 0, textAlign: "center", color: "#1f2937" }}>
          QR Sharing
        </h2>

        <button
          onClick={handleOnStart}
          style={{
            padding: "12px 18px",
            border: "none",
            borderRadius: "10px",
            background: "#4f46e5",
            color: "#fff",
            fontWeight: 600,
            cursor: "pointer"
          }}
        >
          Start sharing QR
        </button>

          {qr && (
          <div className="mt-6 flex flex-col items-center">
            <img src={qr} alt="QR Code" />
          </div>
        )}

        <button
          onClick={handleOnStop}
          style={{
            padding: "12px 18px",
            border: "1px solid #e5e7eb",
            borderRadius: "10px",
            background: "#fff",
            color: "#111827",
            fontWeight: 600,
            cursor: "pointer"
          }}
        >
          Stop sharing QR
        </button>
      </div>
    </div>
  );
}
