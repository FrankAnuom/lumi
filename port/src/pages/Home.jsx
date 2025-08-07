import React, { useEffect, useState } from "react";
import { supabase } from "../Supabase";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Home() {
  const [images, setImages] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  useEffect(() => {
    async function fetchImages() {
      const { data, error } = await supabase
        .from("images")
        .select("*")
        .order("id", { ascending: false });

      if (error) {
        console.error("Error fetching images:", error.message);
      } else {
        console.log("Fetched images:", data);
        setImages(data);
      }
    }

    fetchImages();
  }, []);

  
    return (
      <div className="min-h-screen flex flex-col"> {/* Full screen height and flex column */}
        <Navbar onSearchChange={handleSearchChange} />
    
        <main className="flex-grow w-full max-w-6xl mx-auto mt-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 m-2">
            {images
              .filter((img) =>
                img.image_name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((img) => (
                <div
                  key={img.id}
                  className="shadow rounded overflow-hidden bg-white"
                >
                  <img
                    src={img.image_url}
                    alt={img.image_name}
                    className="w-full h-50 object-cover"
                  />
                  <p className="p-2 text-center font-semibold text-sm truncate text-black">
                    {img.image_name}
                  </p>
                </div>
              ))}
          </div>
        </main>
    
        <Footer /> {/* This will stay at the bottom when page is short */}
      </div>
    
    
  );
}

export default Home;
