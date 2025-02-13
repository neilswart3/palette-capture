import { ColorPicker, ColorTabs } from "@/components";
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
      <ColorPicker value={color} />
      <ColorTabs colors={colorCombinations} />
    </>
  );
};

export default SingleColor;
