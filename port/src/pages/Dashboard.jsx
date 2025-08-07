import React, { useState, useEffect } from "react"; // added useEffect
import { supabase } from "../Supabase";

function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [imageName, setImageName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [images, setImages] = useState([]); // added to store images

  const handleFileUpload = async (e) => {
    e.preventDefault();

    if (!selectedFile || !imageName) {
      alert("Please select a file image and enter image name");
      return;
    }

    setLoading(true);
    const data = new FormData();
    data.append("file", selectedFile);
    data.append("upload_preset", "lumiportfolio");
    data.append("cloud_name", "dnpbspl0z");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dnpbspl0z/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    const uploadImageURL = await res.json();
    const imageUrl = uploadImageURL.url;
    console.log(uploadImageURL.url);

    const { error } = await supabase.from("images").insert([
      {
        image_name: imageName, // From your input
        image_url: imageUrl, // From Cloudinary response
      },
    ]);
    if (error) {
      console.error("Supabase insert error:", error);
    } else {
      console.log("Uploaded to Supabase successfully");
      fetchImages(); // fetch updated list after upload — added line
    }

    console.log("imageName:", imageName);

    setLoading(false);
    setSelectedFile(null);
    setImageName("");
  };

  // fetch images from Supabase — added function
  const fetchImages = async () => {
    const { data, error } = await supabase.from("images").select("*");
    if (error) {
      console.error("Error fetching images:", error);
    } else {
      setImages(data.reverse()); // latest first — added
    }
  };

  useEffect(() => {
    fetchImages(); // load images on page mount — added
  }, []);

  // Delete function
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this image?"
    );
    if (!confirmDelete) return;

    const { error } = await supabase.from("images").delete().eq("id", id);

    if (error) {
      console.error("Failed to delete image:", error.message);
      return;
    }

    // Remove deleted image from the UI
    setImages((prevImages) => prevImages.filter((img) => img.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <form
        onSubmit={handleFileUpload}
        className=" flex flex-col items-center gap-4 w-full"
      >
        {loading ? "Uploading..." : ""}
        <input
          onChange={(e) => setSelectedFile(e.target.files[0])}
          type="file"
          className="file-input file-input-bordered  max-w-s"
        />
        <input
          value={imageName}
          onChange={(e) => setImageName(e.target.value)}
          className="file-input text-center"
          type="text"
          placeholder="Enter image name"
        ></input>
        <button type="submit" className="btn font-bold">
          Upload
        </button>
      </form>

      {/* Replaced hardcoded cards with mapped uploaded images — added */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 text-sm sm:text-base md:text-lg mt-4 text-black">
        {images.map((img) => (
          <div
            key={img.id}
            className="bg-white shadow-md rounded-lg overflow-hidden w-full"
          >
            <img
              src={img.image_url}
              alt={img.image_name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 flex flex-row justify-between items-center">
              <h2 className="font-semibold text-inherit">{img.image_name}</h2>
              <button
                onClick={() => handleDelete(img.id)}
                className="bg-secondary text-white px-3 py-1 rounded text-xs sm:text-sm md:text-base cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
