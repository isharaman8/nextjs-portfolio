import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import styles from "../styles/Contact.module.css";

const imagesArr = [
   "icons8-github-128.png",
   "icons8-linkedin-144.png",
   "icons8-mail-96.png",
   "icons8-twitter-48.png"
]

function Contact() {
   return (
      <>
         <Box style={{ marginTop: "200px", background: "white", zIndex: "5" }}>
            <Typography variant="h1" component="h1" textAlign={"center"}>
               Let's Talk
            </Typography>
            <Typography
               paragraph={true}
               textAlign={"center"}
               sx={{ fontSize: "30px", marginTop: "50px" }}
            >
               Get in touch with me through the below links
            </Typography>
         </Box>
         <Stack direction="row" sx={{marginTop: '100px', display: 'flex', justifyContent: 'center', alignItems: "center", gap: "20px"}}>
            {
               imagesArr.map(c => {
                  return <img key={c} className={styles.contactImage} src={`/static/ICONS/${c}`} alt="image"/>
                  }) 
            }
         </Stack>
      </>
   );
}

export default Contact;
