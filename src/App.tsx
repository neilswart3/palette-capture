import { useCallback, useEffect, useRef, useState } from "react";
import tinycolor from "tinycolor2";
import "./App.css";
import { Button, Input, Stack, Image, Tabs, Icon, Box } from "@chakra-ui/react";
import { average, prominent } from "color.js";
import Case from "case";
import { MdClose, MdDownload } from "react-icons/md";

interface Palette {
  prominent: string[];
  average: string[];
}

function App() {
//   const [hasApp, setHasApp] = useState(false);
  const [showInstall, setShowInstall] = useState(true);
  const [palette, setPalette] = useState<Partial<Palette>>({});
  const [imgObj, setImgObj] = useState<{
    imagePreview: string;
    imageFile: unknown;
  } | null>(null);

  const handleFileInput = useRef<HTMLInputElement>(null);
  const installPrompt = useRef<Event | null>(null);

  const handleClick = () => {
    handleFileInput.current?.click();
  };

  const handleClear = () => {
    setImgObj(null);
    setPalette({});
    handleFileInput.current!.value = undefined as unknown as string;
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImgObj({
      imagePreview: URL.createObjectURL(event.target.files![0]),
      imageFile: event.target.files![0],
    });
  };

  const handleGetPalette = useCallback(async () => {
    try {
      const options = {
        amount: 5,
        group: 20,
        format: "hex",
      };

      const prominentColors = (await prominent(
        imgObj?.imagePreview as string,
        options
      )) as string[];
      const avgColors = (await average(
        imgObj?.imagePreview as string,
        options
      )) as string;

      setPalette({
        ...(prominentColors ? { prominent: prominentColors } : {}),
        ...(avgColors ? { average: [avgColors] } : {}),
      });
    } catch (error) {
      console.log("error:", error);
    }
  }, [imgObj?.imagePreview]);

  const handleInstallApp = useCallback(async () => {
    try {
      if (!installPrompt.current) return;

      const result = await (
        installPrompt.current as Event & { prompt: () => Promise<unknown> }
      ).prompt();

      if (result) {
        installPrompt.current = null;
        // setHasApp(true);
        setShowInstall(false);
      }
    } catch (error) {
        console.log('error:', error)
    }
  }, []);

  useEffect(() => {
    if (imgObj?.imageFile) {
      handleGetPalette();
    }
  }, [handleGetPalette, imgObj?.imageFile]);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      installPrompt.current = event;
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  return (
    <Stack padding={4} gap={4} w="full">
      {showInstall && (
        <Stack
          alignItems="center"
          backgroundColor={"gray.600"}
          borderRadius={6}
          p={4}
          gap={4}
        >
          <Box>Install the App?</Box>
          <Stack flexDir="row" gap={4}>
            <Button onClick={handleInstallApp}>
              <Icon>
                <MdDownload />
              </Icon>
              Install App
            </Button>
            <Button
              variant="outline"
              borderColor="white"
              onClick={() => setShowInstall(false)}
            >
              <Icon>
                <MdClose />
              </Icon>
              Dismiss
            </Button>
          </Stack>
        </Stack>
      )}

      <Input
        display="none"
        ref={handleFileInput}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleImageChange}
      />

      <Button
        as={Stack}
        onClick={!imgObj?.imagePreview ? handleClick : undefined}
        cursor={!imgObj?.imagePreview ? "pointer" : "default"}
        alignItems="center"
        justifyContent="center"
        padding={2}
        borderStyle="dashed"
        borderColor="orange"
        borderRadius={6}
        h="30vh"
        variant={!imgObj?.imagePreview ? "surface" : "outline"}
      >
        <Stack objectFit="contain" h="full">
          {imgObj ? (
            <Image src={imgObj?.imagePreview} alt="img" h="100%" w="full" />
          ) : (
            <Stack alignItems="center" justifyContent="center" h="full">
              Click to Add Photo
            </Stack>
          )}
        </Stack>
      </Button>

      {imgObj?.imagePreview && (
        <Button w="full" onClick={handleClear} borderRadius={6}>
          Clear
        </Button>
      )}

      {!!Object.keys(palette).length && (
        <Tabs.Root
          variant="enclosed"
          fitted
          defaultValue={Object.keys(palette)[0]}
        >
          <Tabs.List>
            {Object.keys(palette).map(key => (
              <Tabs.Trigger borderRadius={6} key={`trigger-${key}`} value={key}>
                {Case.title(key)}
              </Tabs.Trigger>
            ))}
          </Tabs.List>
          {Object.entries(palette).map(([key, palette]) => (
            <Tabs.Content key={`content-${key}`} value={key}>
              <Stack p={2} gap={2} backgroundColor="gray.100" borderRadius={6}>
                {palette.map((color, index) => (
                  <Stack
                    backgroundColor={color}
                    key={index}
                    p={4}
                    borderRadius={6}
                    color={tinycolor
                      .mostReadable(color, ["#fff", "#000"])
                      .toHexString()}
                    alignItems="center"
                  >
                    {color}
                  </Stack>
                ))}
              </Stack>
            </Tabs.Content>
          ))}
        </Tabs.Root>
      )}
    </Stack>
  );
}

export default App;
