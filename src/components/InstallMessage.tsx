import { Box, Button, Icon, Stack } from "@chakra-ui/react";
import React, {  useState } from "react";
import { MdClose, MdDownload } from "react-icons/md";

interface Props {
  onInstall: () => void;
}

const InstallMessage: React.FC<Props> = ({ onInstall }) => {
  const [show, setShow] = useState<boolean>(true);

  return (
    <>
      {show && (
        <Stack
          alignItems="center"
          backgroundColor={"gray.600"}
          borderRadius={6}
          p={4}
          gap={4}
        >
          <Box>Install the App?</Box>
          <Stack flexDir="row" gap={4}>
            <Button onClick={onInstall}>
              <Icon>
                <MdDownload />
              </Icon>
              Install App
            </Button>
            <Button
              variant="outline"
              borderColor="white"
              onClick={() => setShow(false)}
            >
              <Icon>
                <MdClose />
              </Icon>
              Dismiss
            </Button>
          </Stack>
        </Stack>
      )}
    </>
  );
};

export default InstallMessage;
