import { useEffect, useMemo } from "react";
import { useDropzone } from "react-dropzone";

type Props = {
  setImage: React.Dispatch<React.SetStateAction<any>>;
};
const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};
const DragUpload = ({ setImage }: Props) => {
  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
    acceptedFiles,
  } = useDropzone({ accept: { "image/*": [".png", ".jpeg", ".jpg"] } });

  const style = useMemo<any>(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  useEffect(() => {
    setImage(acceptedFiles);
  }, [acceptedFiles, setImage]);

  return (
    <div className="container">
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop your photo here, or click to select </p>
      </div>
    </div>
  );
};

export default DragUpload;
