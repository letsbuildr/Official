"use client";

import { useState } from "react";

export default function NewServicePage() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [features, setFeatures] = useState([""]);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const addFeature = () => setFeatures([...features, ""]);
  const removeFeature = (index) =>
    setFeatures(features.filter((_, i) => i !== index));

  const updateFeature = (value, index) => {
    const updated = [...features];
    updated[index] = value;
    setFeatures(updated);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      // --- Build FormData (for file upload support) ---
      const formData = new FormData();
      formData.append("title", title);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("features", JSON.stringify(features));

      if (imageFile) {
        formData.append("image", imageFile);
      }

      const res = await fetch("https://your-backend-api.com/services", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to create service");

      alert("Service created successfully!");
      setTitle("");
      setPrice("");
      setDescription("");
      setFeatures([""]);
      setImageFile(null);
    } catch (err) {
      console.error(err);
      alert("Error submitting service.");
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 pt-[100px] pb-[50px]">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-semibold text-[#0B1E36] mb-6">
          Add New Service
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6 text-black">
          {/* Upload Image */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Service Image (optional)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
              className="w-full border rounded-lg p-2"
            />
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Service Title
            </label>
            <input
              type="text"
              placeholder="e.g., Web Automation Setup"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full border rounded-lg p-3"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium mb-2">Price</label>
            <input
              type="number"
              placeholder="e.g., 200"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="w-full border rounded-lg p-3"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief explanation of the service..."
              required
              className="w-full border rounded-lg p-3 h-32"
            />
          </div>

          {/* Features */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Service Features
            </label>

            {features.map((feature, index) => (
              <div key={index} className="flex gap-3 mb-3">
                <input
                  type="text"
                  value={feature}
                  onChange={(e) => updateFeature(e.target.value, index)}
                  placeholder={`Feature ${index + 1}`}
                  className="flex-1 border rounded-lg p-3"
                />
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => removeFeature(index)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}

            <button
              type="button"
              onClick={addFeature}
              className="mt-2 px-4 py-2 bg-[#0077B6] text-white rounded-lg"
            >
              + Add Feature
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0B1E36] text-white py-3 rounded-lg font-medium hover:bg-[#093156] transition"
          >
            {loading ? "Saving..." : "Save Service"}
          </button>
        </form>
      </div>
    </div>
  );
}
