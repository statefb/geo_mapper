import { Button } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import React from "react";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";

type Props = {
  onClick: () => void;
  loading: boolean;
};

const BtnMapping: React.FC<Props> = ({ onClick, loading }) => {
  return (
    <LoadingButton
      variant="contained"
      color="success"
      startIcon={<AddLocationAltIcon></AddLocationAltIcon>}
      loading={loading}
      loadingIndicator="抽出中…"
      onClick={() => onClick()}
    >
      抽出
    </LoadingButton>
  );
};
export default BtnMapping;
