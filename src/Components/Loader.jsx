
import Stack from "@mui/joy/Stack";
import Button from "@mui/joy/Button";

export default function Loader() {
  return (
    <Stack sx={{ width: "100%" }} spacing={2} direction="row">
      <Button sx={{ width: "100%" }} loading>
        Default
      </Button>
    </Stack>
  );
}
