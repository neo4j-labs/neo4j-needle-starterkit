import { Box } from "@mui/material";
export default function Content() {
  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "background.default",
        color: "text.primary",
        p: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 1,
      }}
    >
      <div>
        Your content goes here.
      </div>
      <div>
        Happy coding!
      </div>
    </Box>
  );
}
