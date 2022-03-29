import { Card, CardContent, Typography } from "@mui/material";

import React from "react";
import { GetAddressesQuery } from "../api/gen/sdk";
import MapElement from "./MapElement";

type Props = {
  data: GetAddressesQuery | undefined;
};

const CardMap: React.FC<Props> = ({ data }) => {
  const positions = !data
    ? []
    : data.allAddresses.length === 0
    ? []
    : data.allAddresses.map((value) => {
        return value.properties;
      });

  return (
    <Card>
      <CardContent>
        <MapElement positions={positions}></MapElement>
      </CardContent>
    </Card>
  );
};

export default CardMap;
