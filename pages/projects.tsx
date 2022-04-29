import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Typography,
} from "@mui/material";
import React from "react";

const Projects = () => {
	return (
		<Box
			sx={{
				height: "85vh",
				border: "1px solid black",
				width: "80%",
				margin: "auto",
				marginTop: "100px",
				display: "grid",
				placeContent: "center",
				gridTemplateColumns: "repeat(2, 1fr)",
			}}
		>
			<Card sx={{ maxWidth: 345 }}>
				<CardMedia
					component="img"
					height="auto"
					image="https://static.vecteezy.com/system/resources/previews/005/162/476/original/cartoon-iguana-isolated-on-white-background-free-vector.jpg"
					alt="green iguana"
				/>
				<CardContent>
					<Typography gutterBottom variant="h5" component="div">
						Lizard
					</Typography>
					<Typography variant="body2" color="text.secondary">
						Lizards are a widespread group of squamate reptiles, with over 6,000
						species, ranging across all continents except Antarctica
					</Typography>
				</CardContent>
				<CardActions>
					<Button size="small">Share</Button>
					<Button size="small">Learn More</Button>
				</CardActions>
			</Card>
		</Box>
	);
};

export default Projects;
