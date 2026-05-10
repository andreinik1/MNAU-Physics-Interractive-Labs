import { Link } from "react-router-dom";
import styles from "./PageStyles.module.scss";
import { RiLayoutGrid2Fill } from "react-icons/ri";
import RozmelLab from "../rozmel-lab-elems/src/RozmelLab";

const RozmelPage: React.FC = () => {
    return (
        <div >
            <Link to="/" className={styles.linkStyles} style={{height: "24px"}}><RiLayoutGrid2Fill size={24}/></Link>
            <RozmelLab />
        </div>
    );
};

export default RozmelPage;
