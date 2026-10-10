"use client"
import { Html5Qrcode, type Html5QrcodeResult } from "html5-qrcode";
import { useEffect } from "react";

export default function ScanPage() {
    useEffect(()=>{
    // This method will trigger user permissions
    let html5QrCode: Html5Qrcode | null = null;
    let onResize: (() => void) | null = null;

    const getQrboxSize = () => {
      const minEdge = Math.min(window.innerWidth, window.innerHeight);
      const size = Math.floor(minEdge * 0.7); // 70% of smaller screen edge
      return { width: size, height: size };
    };

    const startScanner = (cameraConfig: any, successCb: (decodedText: string, decodedResult: Html5QrcodeResult) => void, errorCb: (error?: any) => void) => {
      if (!html5QrCode) return;
      const config = { fps: 10, qrbox: getQrboxSize() };
      html5QrCode.start(cameraConfig, config, successCb, errorCb).catch(e => {
        console.error('start error', e);
      });
    };

    Html5Qrcode.getCameras().then(devices => {
        /**
         * devices would be an array of objects of type:
         * { id: "id", label: "label" }
         */
        if (devices && devices.length) {
            const cameraId = devices[0].id;
            // .. use this to start scanning.
            html5QrCode = new Html5Qrcode("reader");
            const qrCodeSuccessCallback = (decodedText: string, decodedResult: Html5QrcodeResult) => {
              console.log(decodedText);
              console.log(decodedResult);
            };
            const qrCodeErrorCallback = (error?: any) => {
              // non-fatal decode errors are reported here
            };

            // prefer back camera; fall back to default if constraint fails
            startScanner({ facingMode: { exact: "environment" } }, qrCodeSuccessCallback, qrCodeErrorCallback);

            // restart scanner on resize to adjust qrbox size
            onResize = () => {
              if (!html5QrCode) return;
              html5QrCode.stop().then(() => startScanner({ facingMode: "environment" }, qrCodeSuccessCallback, qrCodeErrorCallback)).catch(() => startScanner({ facingMode: "environment" }, qrCodeSuccessCallback, qrCodeErrorCallback));
            };
            window.addEventListener('resize', onResize);

            // cleanup registered below

        }
        }).catch(err => {
        console.log("camera error", err)
        });

        return () => {
            window.removeEventListener('resize', () => {});
            if (html5QrCode) {
                html5QrCode.stop().catch(() => {});
            }
        };
    },[])
  return (
    <div>
      <div id="reader" style={{width:'100%', maxWidth:600}}>
        
      </div>
    </div>
  );
}