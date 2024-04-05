import { ColorRing } from "react-loader-spinner";
import styles from "../app/page.module.css";

function Loader() {
  return (
    <div className={styles.create_loader}>
      <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="color-ring-loading"
        wrapperStyle={{}}
        wrapperClass="color-ring-wrapper"
        colors={["#e15b64", "#e15b64", "#e15b64", "#e15b64", "#e15b64"]}
      />
    </div>
  );
}

export default Loader;
