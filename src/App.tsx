import { useState } from "react";
import reactLogo from "./assets/react.svg";
import appLogo from "/favicon.svg";
import PWABadge from "./PWABadge.tsx";
import "./App.css";
import { Button, Stack } from "@chakra-ui/react";

function App() {
  const handleOpenCamera = () => {
    navigator.mediaDevices.getUserMedia({ video: true });
  };

  return (
    <Stack padding={4} gap={8}>
      <Button as={Stack} onClick={handleOpenCamera}>
        Add photo
      </Button>

      <input type="file" accept="image/*" capture="environment" />
    </Stack>
  );
}

export default App;
