import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useRef } from "react";
import styles from "../styles/Home.module.css";
// import { init } from "ityped";
console.log(styles);

const Home: NextPage = () => {
	const textRef = useRef<HTMLHeadingElement>(null);
	// useEffect(() => {
	// 	init(textRef.current, {
	// 		showCursor: true,
	// 		backDelay: 1500,
	// 		strings: ["Web_Developer"],
	// 	});
	// });
	return (
		<div className={styles.container}>
			<Head>
				<title>Create Next App</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<Box
					sx={{
						flex: 1,
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						flexDirection: "column",
						padding: "20px",
					}}
				>
					<h1 className={styles.greeting}>Hi There</h1>
					<h1 className={styles?.nameh1}>I'm Aman Kumar</h1>
					<h1 className={styles?.jbProfile}>Full Stack Web Developer</h1>
					<Typography
						variant="h6"
						component="p"
						sx={{ textAlign: "center", fontWeight: "400" }}
					>
						A computer enthusiast who loves creating websites and exploring
						emerging web technologies.
					</Typography>
					{/* <h1 ref={textRef}></h1> */}
				</Box>
				<img
					style={{zIndex: 5, flex: 1, width: "100%", height: "auto" }}
					src="https://c.tenor.com/NOYF3f82b_gAAAAC/programmer.gif"
					alt="coding gif"
				/>
			</main>
		</div>
	);
};

export default Home;
