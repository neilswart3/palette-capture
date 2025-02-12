import { Colors } from "@/types";
import { Button, Stack, Tabs } from "@chakra-ui/react";
import Case from "case";
import React, { useMemo } from "react";
import { NavLink } from "react-router";
import tinycolor from "tinycolor2";

interface Props {
  colors: Partial<Colors>;
}

const ColorTabs: React.FC<Props> = ({ colors }) => {
  const tabList = useMemo(
    () => [Object.keys(colors).slice(0, 3), Object.keys(colors).slice(3, 6)],
    [colors]
  );

  return (
    <>
      {!!Object.keys(colors).length && (
        <Tabs.Root
          variant="enclosed"
          fitted
          defaultValue={Object.keys(colors)[0]}
        >
          {tabList.map((tabs, index) =>
            !tabs.length ? null : (
              <Tabs.List key={`tab-${index}`} flexWrap="wrap">
                {tabs.map(key => (
                  <Tabs.Trigger
                    minW="unset"
                    borderRadius={6}
                    key={`trigger-${key}`}
                    value={key}
                  >
                    {Case.title(key)}
                  </Tabs.Trigger>
                ))}
              </Tabs.List>
            )
          )}

          {Object.entries(colors).map(([key, colors]) => (
            <Tabs.Content key={`content-${key}`} value={key}>
              <Stack p={2} gap={2} borderRadius={6}>
                {colors?.map((color, i) => (
                  <Button
                    {...{ to: `/${color.replace("#", "")}` }}
                    as={NavLink}
                    backgroundColor={color}
                    key={`color-${key}-${color}-${i}`}
                    p={6}
                    borderRadius={6}
                    color={tinycolor
                      .mostReadable(color, ["#fff", "#000"])
                      .toHexString()}
                    alignItems="center"
                  >
                    {color}
                  </Button>
                ))}
              </Stack>
            </Tabs.Content>
          ))}
        </Tabs.Root>
      )}
    </>
  );
};

export default ColorTabs;
