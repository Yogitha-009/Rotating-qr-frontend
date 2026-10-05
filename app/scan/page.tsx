"use client"
import { Html5Qrcode, type Html5QrcodeResult } from "html5-qrcode";
import { useEffect } from "react";

export default function ScanPage() {
    useEffect(()=>{
        // This method will trigger user permissions
        Html5Qrcode.getCameras().then(devices => {
        /**
         * devices would be an array of objects of type:
         * { id: "id", label: "label" }
         */
        if (devices && devices.length) {
            const cameraId = devices[0].id;
            // .. use this to start scanning.
            const html5QrCode = new Html5Qrcode("reader");
            const qrCodeSuccessCallback = (decodedText: string, decodedResult: Html5QrcodeResult) => {
                /* handle success */
                console.log(decodedText)
                console.log(decodedResult)
            };
            const qrCodeErrorCallback=()=>{
                console.log("error")
            }
            const config = { fps: 10, qrbox: { width: 250, height: 250 } };

            
            // If you want to prefer back camera
            html5QrCode.start({ facingMode: "environment" }, config, qrCodeSuccessCallback,qrCodeErrorCallback);

        }
        }).catch(err => {
        // handle err
        console.log("camera error")
        });
    },[])
  return (
    <div>
      <div id="reader" style={{width:600}}>
        
      </div>
    </div>
  );
}