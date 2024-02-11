
import Stack from "@mui/joy/Stack";
import Button from "@mui/joy/Button";

export default function SavingBtn() {
  return (
    <Stack sx={{ width: "50%" }} spacing={2} direction="row">
      <Button sx={{ width: "50%" }} loading>
        Default
      </Button>
    </Stack>
  );
}
