import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { BiSolidStar } from "react-icons/bi";
import { RiDashboardFill } from "react-icons/ri";

import styles from "./header.module.css";

const Header = () => {
    return (
        <Box sx={{ flexGrow: 1 }} >
            <AppBar position="static" sx={{ backgroundColor: '#29366c' }}>
                <Toolbar component={'div'} sx={{ display:'flex', alignItems: 'center', justifyContent: 'space-between',  }}>
                    <Typography variant="h6" component="div" className={styles.textWithIcon}>
                        <span><RiDashboardFill /></span>
                        <span>Dashboard Langfuse</span>
                    </Typography>
                    <Typography variant="h6" component="div" className={styles.textWithIcon}>
                        <span>
                            <BiSolidStar className={styles.subscriptionColor} />
                        </span>

                        <span className={`${styles.subscriptionText} ${styles.subscriptionColor}`}>Premium</span>
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export {Header};
