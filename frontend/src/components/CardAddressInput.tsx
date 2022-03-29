import {
  Box,
  Card,
  CardContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

type Props = {
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
};

const CardAddressInput: React.FC<Props> = ({ setSearchText }) => {
  const [text, setText] = useState("");

  const onChange = (text: string) => {
    setText(text);
    setSearchText(text);
  };
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div"></Typography>

        <Box sx={{ m: 2 }}>
          <Stack spacing={1}>
            <TextField
              id="outlined-multiline-static"
              label="ここに住所を含むテキストをコピペしてください"
              placeholder="私は東京都千代田区永田町１－７－１に住んでいます。"
              multiline
              fullWidth
              value={text}
              onChange={(e) => onChange(e.target.value)}
            />
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CardAddressInput;
