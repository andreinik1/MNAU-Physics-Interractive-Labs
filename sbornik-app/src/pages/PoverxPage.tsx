import { Link } from "react-router-dom";
import styles from "./PageStyles.module.scss";
import { RiLayoutGrid2Fill } from "react-icons/ri";
import PoverxLab from "../poverx-lab-elems/PoverxLab";

const PoverxPage: React.FC = () => {
    return (
        <div >
            <Link to="/" className={styles.linkStyles} style={{height: "24px"}}><RiLayoutGrid2Fill size={24}/></Link>
            <PoverxLab />
        </div>
    );
};

export default PoverxPage;
