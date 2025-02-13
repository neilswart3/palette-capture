import {
  HStack,
  parseColor,
  Stack,
  Text,
  IconButton,
  Button,
  ColorPickerValueChangeDetails,
} from "@chakra-ui/react";
import {
  ColorPickerArea,
  ColorPickerInlineContent,
  ColorPickerInput,
  ColorPickerRoot,
  ColorPickerSliders,
  ColorPickerValueSwatch,
} from "./ui/color-picker";
import { useMemo, useState } from "react";
import tinycolor from "tinycolor2";
import Case from "case";
import { MdEdit, MdSave } from "react-icons/md";
import { useNavigate } from "react-router";

interface Props {
  value: string;
}

const ColorPicker: React.FC<Props> = ({ value }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [colorValue, setColorValue] = useState<string>(value);
  const navigate = useNavigate();

  const textColor = useMemo(
    () => tinycolor.mostReadable(colorValue, ["#fff", "#000"]).toHexString(),
    [colorValue]
  );

  const handleEdit = () => {
    setEdit(true);
  };

  const handleSave = () => {
    setEdit(false);
  };

  const handleUpdate = ({ valueAsString }: ColorPickerValueChangeDetails) => {
    navigate(`/${tinycolor(valueAsString).toHexString().replace("#", "")}`, {
      replace: true,
    });
  };

  const handleChange = ({ valueAsString }: ColorPickerValueChangeDetails) => {
    setColorValue(tinycolor(valueAsString).toHexString());
  };

  if (!edit) {
    return (
      <Stack
        alignItems="center"
        justifyContent="center"
        borderRadius={6}
        background={value}
        padding={8}
        h="300px"
        position="relative"
      >
        {tinycolor(value).toName() && (
          <Text textStyle="xl" fontWeight="bold" color={textColor}>
            {Case.title(tinycolor(value).toName() as string)}
          </Text>
        )}
        <Text textStyle="xl" fontWeight="bold" color={textColor}>
          {value}
        </Text>
        <IconButton
          position="absolute"
          right="1rem"
          bottom="1rem"
          onClick={handleEdit}
        >
          <MdEdit />
        </IconButton>
      </Stack>
    );
  }

  return (
    <ColorPickerRoot
      open
      defaultValue={parseColor(colorValue)}
      onValueChange={handleChange}
      onValueChangeEnd={handleUpdate}
      h="300px"
    >
      <ColorPickerInlineContent w="full" h="full" bg="transparent">
        <ColorPickerArea flexGrow={1} />
        <ColorPickerInput />

        <HStack>
          <ColorPickerSliders />
          <Button
            color={textColor}
            w="auto"
            as={ColorPickerValueSwatch}
            onClick={handleSave}
          >
            <MdSave />
            Save
          </Button>
        </HStack>
      </ColorPickerInlineContent>
    </ColorPickerRoot>
  );
};

export default ColorPicker;
