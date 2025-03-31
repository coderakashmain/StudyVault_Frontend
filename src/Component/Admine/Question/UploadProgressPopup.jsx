import { X } from "lucide-react";
import "./UploadProgressPopup.css"; // Import external CSS file

const UploadProgressPopup = ({ uploads, onClose }) => {
    return (
        <div className="upload-overlay">
            <div className="upload-modal">
                <X size={24} onClick={onClose} className="close-icon" />
                <h3 className="upload-title">Upload History</h3>

                {uploads.length === 0 ? (
                    <p className="no-uploads">No uploads yet.</p>
                ) : (
                    uploads
                        .slice() // Avoid modifying state directly
                        .sort((a, b) => b.id - a.id) // Newest first
                        .map(upload => (
                            <div key={upload.id} className="upload-item">
                                <span className={`upload-name ${upload.status.startsWith('Failed') ? "upload-failed" : "upload-success"}`}>
                                    {upload.name} - {upload.status}
                                </span>
                                <meter value={upload.progress} min="0" max="100" className="upload-meter"></meter>
                                <span className="upload-percentage" style={{color : upload.status.startsWith('Failed') ? "red" : "green"}}>
                                    {upload.progress}%
                                </span>
                            </div>
                        ))
                )}
            </div>
        </div>
    );
};

export default UploadProgressPopup;
