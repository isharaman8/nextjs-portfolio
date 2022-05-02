import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { BiLinkExternal } from "react-icons/bi";
//import Particle from "./Particle";

function ProjectCards(props) {
	return (
		<Card className="project-card-view">
			<Card.Img
				variant="top"
				style={{ width: "100%", height: "350px" }}
				src={props.imgPath}
				alt="card-img"
			/>
			<Card.Body>
				<Card.Title>{props.title}</Card.Title>
				<Card.Text style={{}}>{props.description}</Card.Text>
				<div
					className="project-button"
					style={{ position: "absolute", bottom: 20, zIndex: 1000 }}
				>
					<Button variant="btn primary-btn" href={props.link2} target="_blank">
						<BiLinkExternal /> &nbsp;
						{props.isBlog ? "View Blog" : "View Project"}
					</Button>
					<Button
						style={{ marginLeft: "30px" }}
						variant="btn primary-btn"
						href={props.link}
						target="_blank"
					>
						<BiLinkExternal /> &nbsp;
						{props.isBlog ? "View Blog" : "Source Code"}
					</Button>
				</div>
			</Card.Body>
		</Card>
	);
}
export default ProjectCards;
