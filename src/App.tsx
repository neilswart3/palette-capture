import { useRef, useState } from "react";
import "./App.css";
import { Button, Input, Stack, Image } from "@chakra-ui/react";

function App() {
  const [imgObj, setImgObj] = useState<{
    imagePreview: string;
    imageFile: unknown;
  } | null>(null);

  const handleFileInput = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    handleFileInput.current?.click();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImgObj({
      imagePreview: URL.createObjectURL(event.target.files![0]),
      imageFile: event.target.files![0],
    });
  };

  return (
    <Stack padding={4} gap={4} w="full">
      <div>
        <Button as={Stack} onClick={handleClick} w="full">
          Add photo
        </Button>
        <Input
          display="none"
          ref={handleFileInput}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleImageChange}
        />
      </div>

      <Stack
        alignItems="center"
        justifyContent="center"
        padding={4}
        border="1px dashed orange"
        borderRadius={8}
        h="30vh"
      >
        <Stack objectFit="contain" h="full">
          {imgObj ? (
            <Image src={imgObj?.imagePreview} alt="img" h="100%" w="full" />
          ) : (
            <Stack alignItems="center" justifyContent="center" h="full">

            <p>photo goes here</p>
            </Stack>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
}

export default App;
