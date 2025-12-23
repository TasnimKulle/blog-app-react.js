import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import { FiInfo, FiSave, FiTag, FiX } from "react-icons/fi";

// Available tags - In a real app, fetch from Supabase
const AVAILABLE_TAGS = [
  "React",
  "JavaScript",
  "CSS",
  "Tailwind",
  "Web Development",
  "Backend",
  "Frontend",
  "UI Design",
  "Performance",
  "Supabase",
  "Real-time",
  "API",
  "Testing",
  "TypeScript",
  "Future Tech",
];

export const ArticleEditorPage = () => {
  const isEditMode = false; // change this based on route or props
  //state for article data
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isTagsMenuOpen, setIsTagsMenuOpen] = useState(false);
  const [featuredImageUrl, setFeaturedImageUrl] = useState(null);
  const [isPublished, setIsPublished] = useState(false);
  const [error, setError] = useState(null);
  // state for image upload
  const [selectedImage, setSelectedImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [imagePath, setImagePath] = useState(null);

  const fileInputRef = useRef();
  const editorRef = useRef();

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag)); 
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Heardr buttons */}
      <div className="mb-6 flex flex-col md:flex-row  md:justify-between md:items-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">
          {isEditMode ? "Edit Article" : "Create New Article"}
        </h1>
        {/* buttons  */}
        <div className="flex space-x-4">
          <button className="px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-md shadow-md  hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
            <FiX className="inline mr-2 " />
            Cancel
          </button>
          <button className="px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-md shadow-md  hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
            <FiSave className="inline mr-2 " />
            Save as Draft
          </button>
          <button className="px-4 py-2 bg-orange-600 text-white rounded-md shadow-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
            <FiSave className="inline mr-2 " />
            save & Publish
          </button>
        </div>
      </div>
      {/* Article Form */}
      <div className="mb-6">
        {/* Title input */}

        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
          placeholder="Enter article title"
        />
      </div>
      {/* Featured Image upload */}
      <div className="mb-6">
        <label
          htmlFor="featuredImage"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Featured Image
          <button
            className="ml-2 text-xs text-gray-500 hover:text-gray-700"
            onClick={() => toast("maximum image size is 2MB")}
          >
            <FiInfo className="inline-block" />
          </button>
        </label>
        {/* Image upload area UI  */}
        <div className="mb-4">
          <div className="flex flex-col space-y-2">
            <div className="flex items-center sopace-x-2">
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                className="text-gray-700 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-sm file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
              />
              {selectedImage && (
                <button
                  type="button"
                  disabled={isUploading}
                  className="bg-orange-500 text-white px-3 py-2 text-sm rounded-md hover:bg-orange-600 disabled:opacity-50"
                >
                  {isUploading ? "Uploading..." : "Upload Image"}
                </button>
              )}
            </div>
          </div>
        </div>
        {/* display uploaded image */}
        {featuredImageUrl && (
          <div className="mt-2 mb-4">
            <img
              src={featuredImageUrl}
              alt="Featured"
              className="w-full max-h-64 rounded-md object-cover"
            />
            <div className="flex justify-between mt-1 items-center">
              <span className="text-xs text-gray-500 truncate max-w-[80%]">
                {featuredImageUrl}
              </span>
              <button
                type="button"
                className="text-red-500 hove:text-red-700 text-xs"
              >
                Remove
              </button>
            </div>
          </div>
        )}
      </div>
      {/* Add Tag selection */}
      <div className="mb-6 relative">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tags
        </label>
        <div className="flex flex-wrap mb-2 gap-2">
          {selectedTags.map((tag) => (
            <span
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800"
              key={tag}
              onClick={()=>toggleTag(tag)}
            >
              {tag}
              <button className="ml-2 inline-flex text-orange-500 hover:text-orange-700 focus:outline-none">
                <span className="sr-only">Remove tag {tag}</span>
                <svg
                  className="h-2 w-2"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 8 8"
                >
                  <path
                    strokeLinecap="round"
                    strokeWidth="1.5"
                    d="M1 1l6 6m0-6L1 7"
                  />
                </svg>
              </button>
            </span>
          ))}
        </div>
        {/* Add Tags button */}
        <button
          type="button"
          className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          onClick={() => setIsTagsMenuOpen(!isTagsMenuOpen)}
        >
          <FiTag className="mr-1.5 h-4 w-4" />
          Add Tags
        </button>

        {isTagsMenuOpen && (
          <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
            <div className="grid grid-cols-2 gap-2 p-2">
              {AVAILABLE_TAGS.map((tag) => (
                <div
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`cursor-pointer px-3 py-2 rounded hover:bg-gray-100 ${
                    selectedTags.includes(tag)
                      ? "bg-orange-50 text-orange-700"
                      : ""
                  }`}
                >
                  {tag}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
