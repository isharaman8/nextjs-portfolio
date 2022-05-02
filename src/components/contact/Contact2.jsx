import React from "react";
import "./Contact.css";
import githubimg from "../../assets/Home/icons8-github (2).svg";
import linkedinimg from "../../assets/Home/icons8-linkedin (2).svg";

export default function Contact2() {
	return (
		<div className="contact" id="contact">
			<div className="contact-heading">
				<h1> Contact Me</h1>

				<h5>Let's keep in touch</h5>

				<div className="dash">
					<div className="hr-line"></div>
					<div className="hr-line-orange"></div>
					<div className="hr-line"></div>
				</div>
			</div>

			<div className="contact-container">
				<div className="contact-images">
					<div className="contact-social">
						<h1 className="contact-images-heading">Get In Touch</h1>
						<div className="contact-icons">
							<div className="contact-icon">
								<a
									href="https://www.linkedin.com/in/ramana-bandapu/"
									target="_blank"
								>
									<img src={linkedinimg} alt="ok" />
								</a>
								<a href="https://github.com/ramanabandapu" target="_blank">
									<img src={githubimg} alt="ok" />
								</a>
							</div>
						</div>
						<div className="phoneno">
							<h4>Connect me via phone:</h4> <p>+91 8374068503</p>
							<h4>or Email:</h4>
							<p>bandapu.ramana@gmail.com</p>
						</div>
					</div>
				</div>
			</div>
			<div className="site-manufacturer">
				<h4 style={{ color: "hwb(2 5% 81%);" }}>
					<strong>Design inspired from:</strong>&nbsp;&nbsp;
					<span style={{ color: "hwb(2 5% 81%);" }}>
						Pankaj Kumar<strong></strong>
					</span>
				</h4>
			</div>
			<div className="handup-div">
				<button
					onClick={() => window.scrollTo(0, 0)}
					style={{
						borderRadius: "10px",
						border: "none",
						boxShadow: "box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px",
						background: "white",
					}}
				>
					<img
						className="handup-img"
						src={
							"https://cdn2.iconfinder.com/data/icons/arrows-part-3-3/32/arrow-top-1-512.png"
						}
						alt=""
					/>
				</button>
			</div>
		</div>
	);
}
