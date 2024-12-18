import React from "react";
import { styled } from "@mui/material/styles";
import LoadingButton from "@mui/lab/LoadingButton";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

// Styled input untuk file upload
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function UploadButton({
  onChange,
  loading = false,
}: {
  onChange: (file: File) => void;
  loading?: boolean; // Prop untuk status loading
}) {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onChange(file);
    }
  };

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click(); // Trigger input file saat tombol ditekan
    }
  };

  return (
    <>
      <LoadingButton
        loading={loading}
        loadingPosition="start"
        startIcon={<CloudUploadIcon />}
        variant="outlined"
        onClick={handleClick} // Panggil fungsi klik
      >
        {loading ? "Uploading..." : "Upload"}
      </LoadingButton>
      <VisuallyHiddenInput
        ref={inputRef}
        type="file"
        onChange={handleUpload}
        multiple={false}
      />
    </>
  );
}
