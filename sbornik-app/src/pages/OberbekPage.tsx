import { Link } from "react-router-dom";
import styles from "./PageStyles.module.scss";
import { RiLayoutGrid2Fill } from "react-icons/ri";
import OberbekLab from "../oberbek-lab-elems/OberbekLab";

const OberbekPage: React.FC = () => {
    return (
        <div >
            <Link to="/" className={styles.linkStyles} style={{height: "24px"}}><RiLayoutGrid2Fill size={24}/></Link>
            <OberbekLab />
        </div>
    );
};

export default OberbekPage;
