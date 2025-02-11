import { useRef, useState } from "react";
import "./App.css";
import { Button, Stack } from "@chakra-ui/react";

function App() {
  const [imgObj, setImgObj] = useState<{imagePreview: string; imageFile: unknown} | null>(null);

  const handleFileInput = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    handleFileInput.current?.click();
  };

//   const handleOpenCamera = () => {
//     navigator.mediaDevices.getUserMedia({ video: true });
//   };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImgObj({
      imagePreview: URL.createObjectURL(event.target.files![0]),
      imageFile: event.target.files![0],
    });
  };

  return (
    <Stack padding={4} gap={8}>
      <div>
        <Button as={Stack} onClick={handleClick}>
          Add photo
        </Button>
        <label>
          <input
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleImageChange}
          />
        </label>
      </div>

      {imgObj && <img src={imgObj?.imagePreview} alt="img" />}
    </Stack>
  );
}

export default App;
