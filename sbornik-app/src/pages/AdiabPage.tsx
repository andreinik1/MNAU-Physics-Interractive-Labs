import { Link } from "react-router-dom";
import styles from "./PageStyles.module.scss";
import { RiLayoutGrid2Fill } from "react-icons/ri";
import AdiabLab from "../adiab-lab-elems/src/AdiabLab";

const AdiabPage: React.FC = () => {
    return (
        <div >
            <Link to="/" className={styles.linkStyles} style={{height: "24px"}}><RiLayoutGrid2Fill size={24}/></Link>
            <AdiabLab />
        </div>
    );
};

export default AdiabPage;
