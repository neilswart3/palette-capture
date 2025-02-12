import { ColorTabs } from "@/components";
import { Stack, Text } from "@chakra-ui/react";
import Case from "case";
import { useMemo } from "react";
import { useParams } from "react-router";
import tinycolor from "tinycolor2";

const convertToReadable = (color: tinycolor.Instance) => color.toHexString();

const SingleColor: React.FC = () => {
  const params = useParams();

  const color = useMemo(
    () => tinycolor(params.color).toHexString(),
    [params.color]
  );

  const colorCombinations = useMemo(
    () => ({
      monochromatic: tinycolor(params.color)
        .monochromatic()
        .map(convertToReadable),
      analogous: tinycolor(params.color).analogous().map(convertToReadable),
      complement: [tinycolor(params.color).complement()].map(convertToReadable),
      splitcomplement: tinycolor(params.color)
        .splitcomplement()
        .map(convertToReadable),
      triad: tinycolor(params.color).triad().map(convertToReadable),
      tetrad: tinycolor(params.color).tetrad().map(convertToReadable),
    }),
    [params.color]
  );

  return (
    <>
      <Stack
        alignItems="center"
        justifyContent="center"
        borderRadius={6}
        background={color}
        padding={8}
      >
        {tinycolor(color).toName() && (
          <Text
            textStyle="xl"
            fontWeight="bold"
            color={tinycolor
              .mostReadable(color, ["#fff", "#000"])
              .toHexString()}
          >
            {Case.title(tinycolor(color).toName() as string)}
          </Text>
        )}
        <Text
          textStyle="xl"
          fontWeight="bold"
          color={tinycolor.mostReadable(color, ["#fff", "#000"]).toHexString()}
        >
          {color}
        </Text>
      </Stack>
      <ColorTabs colors={colorCombinations} />
    </>
  );
};

export default SingleColor;
