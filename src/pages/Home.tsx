import {
  SyntheticEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import tinycolor from "tinycolor2";
import { Button, Input, Stack, Image } from "@chakra-ui/react";
import ColorThief from "colorthief";
import { prominent } from "color.js";
import { Colors } from "@/types";
import { ColorTabs, InstallMessage } from "@/components";

function Home() {
  const [showInstall, setShowInstall] = useState(true);
  const [colors, setColors] = useState<Partial<Colors>>({});
  const [imgObj, setImgObj] = useState<{
    imagePreview: string;
    imageFile: unknown;
  } | null>(null);

  const handleFileInput = useRef<HTMLInputElement>(null);
  const installPrompt = useRef<Event | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const colorThief = useMemo(() => new ColorThief(), []);

  const handleClick = () => {
    handleFileInput.current?.click();
  };

  const handleClear = () => {
    setImgObj(null);
    setColors({});
    imgRef.current = null;
    handleFileInput.current!.value = undefined as unknown as string;
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImgObj({
      imagePreview: URL.createObjectURL(event.target.files![0]),
      imageFile: event.target.files![0],
    });
  };

  const handleGetPalette = useCallback(
    async (e: SyntheticEvent<HTMLImageElement>) => {
      try {
        const palette =
          colorThief
            .getPalette(e.target, 5)
            .map((color: number[]) =>
              tinycolor(`rgb(${color.join(",")})`).toHexString()
            ) || [];

        const prominentColors = (await prominent(
          imgObj?.imagePreview as string,
          { amount: 5, format: "hex", group: 20 }
        )) as string[];

        setColors({
          ...(palette ? { palette } : {}),
          ...(prominentColors ? { prominent: prominentColors } : {}),
        });
      } catch (error) {
        console.log("error:", error);
      }
    },
    [colorThief, imgObj?.imagePreview]
  );

  const handleInstallApp = useCallback(async () => {
    try {
      if (!installPrompt.current) return;

      const result = await (
        installPrompt.current as Event & { prompt: () => Promise<unknown> }
      ).prompt();

      if (result) {
        installPrompt.current = null;
        setShowInstall(false);
      }
    } catch (error) {
      console.log("error:", error);
    }
  }, []);

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

  useEffect(() => {
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setShowInstall(false);
    }

    if ("getInstalledRelatedApps" in window.navigator) {
      const handleRelatedApps = async () => {
        try {
          const relatedApps = await (
            navigator as Navigator & {
              getInstalledRelatedApps: () => Promise<
                Record<"platform" | "url", string>[]
              >;
            }
          ).getInstalledRelatedApps();

          if (relatedApps.find(({ url }) => url.includes("palette-capture"))) {
            setShowInstall(false);
          }
        } catch (error) {
          console.log("error:", error);
        }
      };

      handleRelatedApps();
    }
  }, []);

  return (
    <>
      <InstallMessage
        show={showInstall}
        setShow={setShowInstall}
        onInstall={handleInstallApp}
      />

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
            <Image
              src={imgObj?.imagePreview}
              alt="img"
              h="100%"
              w="full"
              onLoad={handleGetPalette}
            />
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

      <ColorTabs colors={colors} />
    </>
  );
}

export default Home;
