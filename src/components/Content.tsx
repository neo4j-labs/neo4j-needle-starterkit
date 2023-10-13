import { Box } from "@mui/material";
import {useState} from "react";
import ConnectionModal from './ConnectionModal';
import { Button } from "@neo4j-ndl/react";

export default function Content() {
    const [openConnection, setOpenConnection] = useState<boolean>(false);

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
      <ConnectionModal open={openConnection} />
      <div>
        Your content goes here.
      </div>
      <div>
        Happy coding!
      </div>
      <Button onClick={() => setOpenConnection(true)}>
        Connect to Neo4j
      </Button>
    </Box>
  );
}
