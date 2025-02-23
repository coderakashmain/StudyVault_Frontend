import React, { useState } from "react";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import axios from "axios";



const PDFViewer = ({ pdfUrl, papertitle, onClose }) => {
        const [shortenedUrl, setShortenedUrl] = useState(null);

    // Function to transform Google Drive view link to direct-download link
    const getDirectPdfUrl = (url) => {
        if (url.includes("drive.google.com/file/d/")) {
            const fileId = url.split("/d/")[1]?.split("/")[0];
            return `https://drive.google.com/file/d/${fileId}/preview`;
        }
        return url; // Return the original URL if it's not a Google Drive link
    };

    const getDownloadUrl = (url) => {
        if (url.includes("drive.google.com/file/d/")) {
            const fileId = url.split("/d/")[1]?.split("/")[0];
            return `https://drive.google.com/uc?export=download&id=${fileId}`;
        }
        return url; // Return the original URL if it's not a Google Drive link
    };

    const directPdfUrl = getDirectPdfUrl(pdfUrl);
    const downloadUrl = getDownloadUrl(pdfUrl);



    // Function to create a download link
    const handleDownload = async () => {
        const pendingPdf = sessionStorage.getItem("pendingPdf");
        if (pendingPdf) {
            sessionStorage.removeItem("pendingPdf"); 
            if (downloadUrl) {

                const link = document.createElement('a');
                link.href = downloadUrl;
                link.download = papertitle || "DownloadedFile.pdf"; // Set the default file name for download
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } else {
                alert('Invalid Google Drive URL');
            }

        } else {
            try {
                // 1. Generate a short link via ShrinkEarn API

                const response = await axios.get(`/api/shorten`, {
                    params: { url: pdfUrl }
                });

                if (response.data.shortenedUrl) {
                    const shortUrl = response.data.shortenedUrl;
                    setShortenedUrl(shortUrl);

                    // 2. Redirect to short link
                    window.open(shortUrl, "_blank");
                    // window.location.href=shortUrl;

                    // 3. Store the original PDF URL in session storage (for redirection later)
                    sessionStorage.setItem("pendingPdf", pdfUrl);

                } else {
                    console.error("Shortening failed, opening PDF directly.");
                    if (downloadUrl) {

                        const link = document.createElement('a');
                        link.href = downloadUrl;
                        link.download = papertitle || "DownloadedFile.pdf"; // Set the default file name for download
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                    } else {
                        alert('Invalid Google Drive URL');
                    }
                }
            } catch (error) {
                console.error("Error shortening URL:", error);
                if (downloadUrl) {

                    const link = document.createElement('a');
                    link.href = downloadUrl;
                    link.download = papertitle || "DownloadedFile.pdf"; // Set the default file name for download
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                } else {
                    alert('Invalid Google Drive URL');
                }
            }
        }



    };
    // const handleDownload = () => {

    //     if (downloadUrl) {

    //         const link = document.createElement('a');
    //         link.href = downloadUrl;
    //         link.download = papertitle || "DownloadedFile.pdf"; // Set the default file name for download
    //         document.body.appendChild(link);
    //         link.click();
    //         document.body.removeChild(link);
    //     } else {
    //         alert('Invalid Google Drive URL');
    //     }


    // };



    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                zIndex: 10000,
            }}
        >
            {/* Close Button */}
            <div style={{ height: '5rem ', width: '100%', padding: '1rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
                <div>
                    <div style={{ display: 'inline-block', padding: '0.5rem 1rem', backgroundColor: 'red', color: '#fff', borderRadius: '0.2rem', fontWeight: '600', fontSize: '1rem' }}>
                        PDF
                    </div>
                    <span style={{ color: '#fff', margin: '0rem 0.5rem', fontSize: '1rem', fontWeight: '600' }}>
                        STUDYVAULT
                    </span>
                </div>
                <div style={{}}>

                    <button
                        onClick={handleDownload}
                        style={{
                            backgroundColor: "rgba(0, 0, 0, 0)",
                            border: "none",
                            padding: "10px 20px",
                            color: "#fff",
                            fontSize: "1rem",
                            borderRadius: "0.1rem",
                            cursor: "pointer",
                            zIndex: 1001,
                            margin: '0rem 1rem'
                        }}
                        className="active"
                    >
                        <i className="fa-solid fa-download" style={{ color: '#fff', fontSize: '1.3rem' }}></i>
                    </button>
                    <button
                        onClick={onClose}
                        style={{
                            backgroundColor: "red",
                            border: "none",
                            padding: '0.5rem 1rem',
                            color: "#fff",
                            fontSize: "1rem",
                            borderRadius: "0.1rem",
                            cursor: "pointer",
                            zIndex: 1001,
                            fontWeight: '600',


                        }}
                    >
                        Close
                    </button>
                </div>
            </div>
            {/* PDF Viewer using iframe */}
            <iframe
                src={directPdfUrl}
                title="PDF Viewer"
                style={{
                    width: "100%",
                    height: "100%",
                    border: "none",
                }}
            ></iframe>
        </div>
    );
};

export default PDFViewer;
