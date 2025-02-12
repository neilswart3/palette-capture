import {
  Text,
  Grid,
  GridItem,
  Icon,
  IconButton,
  Stack,
  Avatar,
} from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import { MdArrowBack, MdHome } from "react-icons/md";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router";

const AppLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <Stack padding={4} gap={4} w="full">
      <Grid templateColumns="1fr auto 1fr" alignItems="center">
        <GridItem
          as={Stack}
          flexDir="row"
          alignItems="center"
          justifyContent="flex-start"
        >
          {!!window?.history?.state?.idx && (
            <IconButton
              aria-label="back"
              variant="ghost"
              onClick={() => navigate(-1)}
            >
              <Icon>
                <MdArrowBack />
              </Icon>
            </IconButton>
          )}
        </GridItem>

        <GridItem
          as={Stack}
          flexDir="row"
          alignItems="center"
          justifyContent="center"
          gap={4}
        >
          <Stack flexDir="row" alignItems="center" gap={4}>
            <Avatar.Root shape="full">
              <Avatar.Image src="/android-chrome-192x192.png" alt="logo" />
            </Avatar.Root>
            <Text>Palette Capture</Text>
          </Stack>
        </GridItem>

        {pathname !== "/" && (
          <GridItem
            as={Stack}
            flexDir="row"
            alignItems="center"
            justifyContent="flex-end"
          >
            <IconButton
              {...{ to: "/" }}
              as={NavLink}
              aria-label="home"
              variant="ghost"
            >
              <Icon>
                <MdHome />
              </Icon>
            </IconButton>
          </GridItem>
        )}
      </Grid>

      {children ? children : <Outlet />}
    </Stack>
  );
};

export default AppLayout;
