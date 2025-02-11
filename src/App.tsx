import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
import { Button, Input, Stack, Image, Box } from "@chakra-ui/react";
import { prominent } from "color.js";

function App() {
  const [palette, setPalette] = useState<string[]>([]);
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

  const handleGetPalette = useCallback(async () => {
    try {
      const colors = await prominent(imgObj?.imagePreview as string, {
        amount: 5,
        format: "hex",
      });

      setPalette(colors as string[]);
    } catch (error) {
      console.log("error:", error);
    }
  }, [imgObj?.imagePreview]);

  useEffect(() => {
    if (imgObj?.imageFile) {
      handleGetPalette();
    }
  }, [handleGetPalette, imgObj?.imageFile]);

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

      {palette.length > 0 && (
        <Stack p={2} gap={2} backgroundColor="gray.100" borderRadius={8}>
          {palette.map((color, index) => (
            <Box backgroundColor={color} key={index} p={4} borderRadius={8}>
              {color}
            </Box>
          ))}
        </Stack>
      )}
    </Stack>
  );
}

export default App;
