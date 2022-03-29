import {
  Card,
  CardContent,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { ClientError } from "graphql-request";
import React from "react";
import { GetAddressesQuery } from "../api/gen/sdk";
import Loading from "./Loading";

type Props = {
  data: GetAddressesQuery | undefined;
  error: ClientError | undefined;
};

const CardAddressOutput: React.FC<Props> = ({ data, error }) => {
  console.log(data);
  console.log(error);
  return (
    <Card>
      <CardHeader title="抽出された住所"></CardHeader>
      <CardContent>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableBody>
              {error ? (
                <TableRow>
                  <TableCell align="left">抽出エラー！ {error.stack}</TableCell>
                </TableRow>
              ) : !data ? (
                <TableRow>
                  <TableCell align="left">
                    <Loading></Loading>
                  </TableCell>
                </TableRow>
              ) : data.allAddresses.length !== 0 ? (
                data.allAddresses.map((value, index) => {
                  return (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="left">
                        {value.properties.fullname}
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell align="left">抽出された住所はありません</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};
export default CardAddressOutput;
