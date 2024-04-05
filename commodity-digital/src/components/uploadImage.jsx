import axios from "axios";
import backendUrl from "./urls";

function converttofile(image) {
  const fileMetadata = {
    originalname: "20230511_111804.jpg",
    encoding: "7bit",
    mimetype: "image/jpeg",
    destination: "uploads/",
    filename: "1709670716454-20230511_111804.jpg",
    path: "uploads/1709670716454-20230511_111804.jpg",
    size: 8075414,
  };

  // Create a Blob from the file content (assuming blobData contains the file content)
  const blob = new Blob([image], { type: fileMetadata.mimetype });

  // Create a File object with metadata
  const file = new File([blob], fileMetadata.filename, {
    type: fileMetadata.mimetype,
    lastModified: Date.now(),
  });

  return file;
}

// Function to upload image using Axios
const uploadImage = async ({ image, category }) => {
  const file = converttofile(image);
  console.log("upload image ?>>>>", file, typeof file);
  const date = new Date();
  const formData = new FormData();
  formData.append("category", category);
  formData.append("date", new Date());
  formData.append("image", file);
  const payload = {
    image: file,
    category,
    date,
  };
  try {
    const response = await axios.post(`${backendUrl}/api/upload`, formData);
    console.log("Image uploaded successfully:", response.data);
    const url = response.data;
    return url;
  } catch (error) {
    console.error("Error uploading image:", error);
  }
};

export default uploadImage;
