import { Box, Button, Typography } from "@mui/material";
import styles from "../styles/About.module.css";

function About() {
	return (
		<Box
			sx={{
				marginTop: "100px",
				height: "80vh",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				gap: "20px",
			}}
		>
			<img
				style={{ flex: 1, zIndex: 5 }}
				className={styles.profileImage}
				src="https://content.fortune.com/wp-content/uploads/2022/04/Anonymous-Hacker-Group-Mask-GettyImages-1229478612.jpg"
				alt="My Image"
			/>
			<Box sx={{ flex: 1, zIndex: 5, background: "white" }}>
				<Typography variant="h1" component="h1" style={{ textAlign: "center" }}>
					About Me
				</Typography>
				<p className={styles.innerPTag}>
					Hey, I am Aman Kumar. I'm an aspiring Web Developer. I have a serious
					passion for building amazing web applications.
				</p>
				<p className={styles.innerPTag}>
					I am skilled in developing web apps using the MERN stack and I've
					built many amazing projects which you can see below.
				</p>
				<p className={styles.innerPTag}>Apart from coding, I love:</p>
				<ul className={styles.innerPTag}>
					<li>🎧 Listening to music</li>
					<li>📚 Reading books</li>
					<li>📝 Solving DS Algo</li>
				</ul>
			</Box>
		</Box>
	);
}

export default About;
