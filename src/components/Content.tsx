import { Box } from "@mui/material";
import {useState} from "react";
import ConnectionModal from './ConnectionModal';
import { Button } from "@neo4j-ndl/react";


export default function Content() {
    const [openConnection, setOpenConnection] = useState<boolean>(false);
    const [connectionStatus, setConnectionStatus] = useState<string>('Not connected');

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
      <ConnectionModal open={openConnection} setOpenConnection={setOpenConnection} setConnectionStatus={setConnectionStatus} />
      <div>
        Your content goes here.
      </div>
      <div>
        Happy coding!
      </div>
      <div>Neo4j connection Status: {connectionStatus}</div>
      {connectionStatus == 'Not connected' || connectionStatus == 'Connection failed' ? 
        <Button onClick={() => setOpenConnection(true)}>
          Connect to Neo4j
        </Button>
        : <></>
      }
    </Box>
  );
}
