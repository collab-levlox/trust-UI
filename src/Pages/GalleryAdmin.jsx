import { useState, useEffect } from "react";

export default function GalleryAdmin() {
  const [images, setImages] = useState([]);
  const [newImages, setNewImages] = useState([]);

  // Load initial data or from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("gallery");
    if (stored) setImages(JSON.parse(stored));
    else setImages(initialData);
  }, []);

  // Handle file selection
  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    if (!files.length) return;

    const previews = files.map((file) => ({
      id: Date.now() + Math.random(),
      src: URL.createObjectURL(file),
      title: file.name,
      category: "category1", // optional
      file,
    }));

    setNewImages((prev) => [...prev, ...previews]);
  };

  // Confirm upload → save to gallery + localStorage
  const handleUpload = () => {
    const updatedGallery = [...images, ...newImages];
    setImages(updatedGallery);
    localStorage.setItem("gallery", JSON.stringify(updatedGallery));
    setNewImages([]);
  };

  const removeStagedImage = (id) => {
    setNewImages((prev) => prev.filter((img) => img.id !== id));
  };

  const removeImage = (id) => {
    const updatedGallery = images.filter((img) => img.id !== id);
    setImages(updatedGallery);
    localStorage.setItem("gallery", JSON.stringify(updatedGallery));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Gallery Admin</h2>

      <input
        type="file"
        id="filePicker"
        accept="image/*"
        multiple
        style={{ display: "none" }}
        onChange={handleFileSelect}
      />

      <button
        onClick={() => document.getElementById("filePicker").click()}
        style={{
          padding: "10px 18px",
          background: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Select Images
      </button>

      {newImages.length > 0 && (
        <button
          onClick={handleUpload}
          style={{
            padding: "10px 18px",
            background: "green",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            marginLeft: "10px",
          }}
        >
          Upload / OK
        </button>
      )}

      {/* Staging Preview */}
      {newImages.length > 0 && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "15px",
            marginTop: "20px",
          }}
        >
          {newImages.map((img) => (
            <div key={img.id} style={{ position: "relative" }}>
              <img
                src={img.src}
                alt={img.title}
                style={{ width: "120px", borderRadius: "6px" }}
              />
              <button
                onClick={() => removeStagedImage(img.id)}
                style={{
                  position: "absolute",
                  top: "5px",
                  right: "5px",
                  background: "red",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  padding: "2px 5px",
                  cursor: "pointer",
                }}
              >
                X
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Current Gallery */}
      <h3 style={{ marginTop: "30px" }}>Gallery Images</h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
        {images.map((img) => (
          <div key={img.id} style={{ position: "relative" }}>
            <img
              src={img.src}
              alt={img.title}
              style={{ width: "180px", borderRadius: "8px" }}
            />
            <button
              onClick={() => removeImage(img.id)}
              style={{
                position: "absolute",
                top: "5px",
                right: "5px",
                background: "red",
                color: "white",
                border: "none",
                borderRadius: "4px",
                padding: "3px 7px",
                cursor: "pointer",
              }}
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
