"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function EditServicePage() {
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [features, setFeatures] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  // Fetch service by ID
  useEffect(() => {
    async function loadService() {
      try {
        const res = await fetch(`https://your-backend-api.com/services/${id}`);
        const data = await res.json();

        setTitle(data.title);
        setPrice(data.price);
        setDescription(data.description);
        setFeatures(data.features || [""]);
      } catch (err) {
        console.error("Failed to load service", err);
      }

      setLoadingData(false);
    }

    loadService();
  }, [id]);

  // Dynamic Features Handlers
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
      const formData = new FormData();
      formData.append("title", title);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("features", JSON.stringify(features));

      if (imageFile) {
        formData.append("image", imageFile); // optional new image
      }

      const res = await fetch(`https://your-backend-api.com/services/${id}`, {
        method: "PUT",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to update service");

      alert("Service updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Error updating service.");
    }

    setLoading(false);
  }

  if (loadingData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading service...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 pt-[100px] pb-[50px]">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-semibold text-[#0B1E36] mb-6">
          Edit Service
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6 text-black">
          {/* Upload Image */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Replace Service Image (optional)
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
              placeholder="Service title"
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
              placeholder="Service price"
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
              placeholder="Describe the service..."
              required
              className="w-full border rounded-lg p-3 h-32"
            />
          </div>

          {/* Features */}
          <div>
            <label className="block text-sm font-medium mb-2">Features</label>

            {features.map((feature, index) => (
              <div key={index} className="flex gap-3 mb-3">
                <input
                  type="text"
                  value={feature}
                  onChange={(e) => updateFeature(e.target.value, index)}
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

          {/* Save Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0B1E36] text-white py-3 rounded-lg font-medium hover:bg-[#093156] transition"
          >
            {loading ? "Saving..." : "Update Service"}
          </button>
        </form>
      </div>
    </div>
  );
}
