import CardAddressInput from "../components/CardAddressInput";
import { Box, Stack } from "@mui/material";
import React, { useState } from "react";

import CardMap from "../components/CardMap";

import CardAddressOutput from "../components/CardAddressOutput";
import { sdk } from "../api/api";
import { GetAddressesQuery } from "../api/gen/sdk";

const Main: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const { data, error } = sdk.useGetAddresses(`getAddresses/${searchText}`, {
    text: searchText,
  });

  return (
    <>
      <Box sx={{ p: 3 }}>
        <Stack spacing={3}>
          <CardAddressInput setSearchText={setSearchText}></CardAddressInput>
          <CardAddressOutput data={data} error={error}></CardAddressOutput>
          <CardMap data={data}></CardMap>
        </Stack>
      </Box>
    </>
  );
};

export default Main;
