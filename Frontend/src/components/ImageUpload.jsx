import React, { useState } from "react";
import { EditProfile } from "../Slice/EditProfileSlice";

const UploadToCloudinary = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");

  // 🔧 CHANGE THESE VALUES
  const CLOUD_NAME = "dkif9eopq"; // e.g. "demo"
  const UPLOAD_PRESET = "devtinder"; // e.g. "my_preset"

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsUploading(true);
    setError("");
    setImageUrl("");

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", UPLOAD_PRESET);

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
        method: "POST",
        body: data,
      });

      const result = await res.json();

      if (result.secure_url) {
        setImageUrl(result.secure_url);
        // console.log("Uploaded Image URL:", result.secure_url);
      } else {
        setError("Upload failed. Check Cloudinary config or file.");
      }
    } catch (err) {
      console.error("Upload error:", err);
      setError("Upload failed. Try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h2>Upload Image to Cloudinary</h2>
      <input type="file" onChange={handleImageUpload} accept="image/*" />

      {isUploading && <p>Uploading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {imageUrl && (
        <div style={{ marginTop: "1rem" }}>
          <p><strong>Image uploaded successfully!</strong></p>
          <img src={imageUrl} alt="Uploaded" style={{ maxWidth: "300px", borderRadius: "8px" }} />
          <p>
            URL:{" "}
            <a href={imageUrl} target="_blank" rel="noreferrer">
              {imageUrl}
            </a>
          </p>
        </div>
      )}
    </div>
  );
};

export default UploadToCloudinary;
