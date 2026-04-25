import { Link } from "react-router-dom";
import styles from "./PageStyles.module.scss";
import { RiLayoutGrid2Fill } from "react-icons/ri";
import StocksLab from "../stocks-lab-elems/src/StocksLab";

const StocksPage: React.FC = () => {
    return (
        <div >
            <Link to="/" className={styles.linkStyles} style={{height: "24px"}}><RiLayoutGrid2Fill size={24}/></Link>
            <StocksLab />
        </div>
    );
};

export default StocksPage;
