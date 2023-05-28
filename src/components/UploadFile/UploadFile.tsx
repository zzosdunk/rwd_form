import { useState } from "react";
import "./UploadFile.css";

type UploadProps = {
  handleFile: (file: File) => void;
};

function UploadFile({ handleFile }: UploadProps) {
  const [photo, setPhoto] = useState<File | null>(null);

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      handleFile(event.target.files[0]);
    }
  };

  const handlePhotoLinkClick = () => {
    const inputElement = document.getElementById(
      "photoInput"
    ) as HTMLInputElement;
    inputElement.click();
  };

  const handlePhotoDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    setPhoto(file);
  };

  const handlePhotoDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const deleteFile = () => {
    setPhoto(null);
  };

  return (
    <div
      className="uploadBox"
      onDrop={handlePhotoDrop}
      onDragOver={handlePhotoDragOver}
    >
      {photo ? (
        <div className="uploadedFile">
          <p>{photo.name}</p>
          <div className="dynamicImg" onClick={deleteFile} />
        </div>
      ) : (
        <div>
          <input
            type="file"
            id="photoInput"
            style={{ display: "none" }}
            onChange={handlePhotoChange}
          />
          <a href="#" onClick={handlePhotoLinkClick}>
            Upload a file
          </a>
          <p className="hint">or drag and drop here</p>
        </div>
      )}
    </div>
  );
}

export default UploadFile;
