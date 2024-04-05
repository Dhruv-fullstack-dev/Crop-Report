import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import styles from "../app/page.module.css";

const MyDocument = ({ pdfUrl }) => {
  const docs = [
    {
      uri: pdfUrl,
      fileType: "pdf",
      fileName: "chacha",
    }, // Remote file
  ];

  return (
    <DocViewer
      documents={docs}
      pluginRenderers={DocViewerRenderers}
      className={styles.pdfViewer}
    />
  );
};

export default MyDocument;
