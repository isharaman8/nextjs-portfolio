import React from "react";
import "./About.css";
export default function About() {
	return (
		<div className="about" id="about">
			<div className="about-container">
				<div className="aboutme-text">
					<h1>About Me</h1>
					<div className="dash">
						<div className="hr-line"></div>
						<div className="hr-line-orange"></div>
						<div className="hr-line"></div>
					</div>
				</div>

				<div className="aboutme-container">
					<div className="aboutme-img">
						<img
							src={
								"https://media0.giphy.com/media/qgQUggAC3Pfv687qPC/giphy.gif"
							}
							alt=""
						/>
					</div>
					<div className="aboutme-text-section">
						<div className="about-me-summary">
							<p>
								An aspiring full-stack web developer with background knowledge
								of MERN stack with redux, passionate about building applications
								with utmost efficiency molded and shaped by Masai school’s
								intensive and immersive learning. Looking forward to joining a
								company where I will be able to contribute to the individual as
								well as the company's growth.
							</p>
						</div>
						<div className="about-me-highlight">
							<h3>Here are a Few Highlights:</h3>
							<ul>
								<li className="aboutme-highlighted-text">
									Full Stack web development
								</li>
								<li className="aboutme-highlighted-text">
									Interactive Front End as per the design
								</li>
								<li className="aboutme-highlighted-text">
									React for building user interfaces{" "}
								</li>
								<li className="aboutme-highlighted-text">
									Redux for State Mnanagement
								</li>
								<li className="aboutme-highlighted-text">Building REST API</li>
								<li className="aboutme-highlighted-text">Managing database</li>
							</ul>
						</div>
						<div className="profile-options">
							<a href="#contact">
								<button className="btn primary-btn">
									{""}
									Hire Me{" "}
								</button>
							</a>
							<a href="Ramana_Bandapu_Resume_01-05-2022-13-05-39.pdf">
								<button className="btn highlighted-btn">Get Resume</button>
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
