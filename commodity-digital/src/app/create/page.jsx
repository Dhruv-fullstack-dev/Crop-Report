"use client";

import styles from "../page.module.css";
import { FaCamera } from "react-icons/fa";
import { Camera } from "react-camera-pro";

import uploadImage from "@/components/uploadImage";
import MyDocument from "@/components/pdf";

import axios from "axios";
import Loader from "@/components/loader";
import { useState, useRef, useEffect } from "react";

export default function CreateNew() {
  const camera = useRef(null);
  const [image, setImage] = useState(null);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [report, setReport] = useState(false);

  const [pdfUrl, setPdfUrl] = useState(null);

  const categories = [
    "category 1",
    "category 2",
    "category 3",
    "category 4",
    "category 5",
  ];

  const [dropdownState, setDropdownState] = useState(false);
  const [category, setCategory] = useState("");

  const handleDropdownClick = () => {
    setDropdownState(!dropdownState);
  };
  const handleSetDropdownValue = (value) => {
    setCategory(value);
    setDropdownState(!dropdownState);
  };

  const handleImageUpload = async () => {
    if (image) {
      try {
        const imagePath = await uploadImage({ image, category });
        console.log("Image uploaded successfully. Path:", imagePath);

        setSubmit(!submit);
        setPdfUrl(imagePath);
        // Do something with the imagePath, e.g., display the uploaded image
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    } else {
      console.error("No image selected");
    }
  };

  return (
    <main className={styles.create_main}>
      {!report ? (
        <>
          <h2>Create New Report</h2>
          <div className={styles.create_cropCat}>
            <div className={styles.dropdown}>
              <button
                onClick={handleDropdownClick}
                className={styles.dropdown_btn}
              >
                {category === "" ? "Select Category" : category}
              </button>
              <div
                className={`styles.dropdown_items ${
                  dropdownState ? styles.isVisible : styles.isHidden
                }`}
              >
                {categories.map((category, i) => {
                  return (
                    <div className={styles.dropdown_item} key={i}>
                      <div
                        className={styles.dropdown_link}
                        onClick={() => handleSetDropdownValue(category)}
                      >
                        {category}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          {image ? (
            <div className={styles.create_imgCont}>
              {!submit ? (
                <>
                  <img src={image} alt="Taken photo" />

                  <div
                    className={styles.create_camerabtn}
                    onClick={() => {
                      handleImageUpload();
                      setSubmit(!submit);
                    }}
                  >
                    Submit
                  </div>
                </>
              ) : (
                <Loader />
              )}
            </div>
          ) : (
            <div className={styles.create_container}>
              {!cameraOpen ? (
                <>
                  <div>
                    <FaCamera
                      size={40}
                      onClick={() => setCameraOpen(!cameraOpen)}
                    />
                  </div>
                </>
              ) : (
                <div className={styles.create_cameraCont}>
                  <div className={styles.create_camera}>
                    <Camera ref={camera} aspectRatio={4 / 3} />
                  </div>

                  <div
                    className={styles.create_camerabtn}
                    onClick={() => setImage(camera.current.takePhoto())}
                  >
                    Click Me!
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      ) : (
        <div className={styles.report}>
          {/* <Document file={{ data: pdfData }}>
            <Page />
          </Document> */}

          <MyDocument pdfUrl={pdfUrl} />
          <div
            className={styles.create_camerabtn}
            onClick={() => {
              setReport(!report);
            }}
          >
            Upload Another
          </div>
        </div>
      )}
    </main>
  );
}
