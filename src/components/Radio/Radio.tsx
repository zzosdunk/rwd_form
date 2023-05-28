import { useState } from "react";
import "./Radio.css";

type RadioProps = {
  defineLevel: (level: string) => void;
};

function Radio({ defineLevel }: RadioProps) {
  const [englishLevel, setEnglishLevel] = useState("");

  const handleEnglishLevelChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEnglishLevel(event.target.value);
    defineLevel(event.target.value);
  };
  return (
    <div className="options">
      <div className="option">
        <input
          type="radio"
          value="Beginner"
          checked={englishLevel === "Beginner"}
          onChange={handleEnglishLevelChange}
        />
        <span>Beginner</span>
      </div>
      <div className="option">
        <input
          type="radio"
          value="Intermediate"
          checked={englishLevel === "Intermediate"}
          onChange={handleEnglishLevelChange}
        />
        <span>Intermediate</span>
      </div>
      <div className="option">
        <input
          type="radio"
          value="Advanced"
          checked={englishLevel === "Advanced"}
          onChange={handleEnglishLevelChange}
        />
        <span>Advanced</span>
      </div>
    </div>
  );
}

export default Radio;
