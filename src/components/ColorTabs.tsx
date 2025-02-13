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
  const tabList = useMemo(() => {
    const chunk = 2;
    const length = Object.keys(colors).length;

    return Array.from({ length: length / chunk }, (_, index) => {
      const start = index * chunk;
      return Object.keys(colors).slice(start, start + chunk);
    });
  }, [colors]);

  return (
    <>
      {!!Object.keys(colors).length && (
        <Tabs.Root
          variant="enclosed"
          fitted
          defaultValue={Object.keys(colors)[0]}
        >
          {tabList.map((tabs, index, { length }) =>
            !tabs.length ? null : (
              <Tabs.List
                key={`tab-${index}`}
                flexWrap="wrap"
                {...{
                  ...(index === 0 ? { borderBottomRadius: 0 } : {}),
                  ...(index + 1 === length ? { borderTopRadius: 0 } : {}),
                  ...(index !== 0 && index + 1 !== length
                    ? { borderTopRadius: 0, borderBottomRadius: 0 }
                    : {}),
                }}
              >
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
              <Stack gap={2} borderRadius={6}>
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
