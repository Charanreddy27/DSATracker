import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import Badge from "react-bootstrap/Badge";
import Spinner from "react-bootstrap/Spinner";
import Fade from "react-reveal/Fade";
import { Box, Typography, Container, Button, Link, Grid } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn, GitHub } from '@mui/icons-material';
import FileDownloadRoundedIcon from '@mui/icons-material/FileDownloadRounded';
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';
import RestartAltRoundedIcon from '@mui/icons-material/RestartAltRounded';

export default function About({ resetData, exportData, importData }) {
	const inputFile = useRef(null);
	let history = useNavigate();
	const [importSpinnerState, setImportSpinnerState] = useState(false);
	const [exportSpinnerState, setExportSpinnerState] = useState(false);
	// About component takes resetData() from App <Component> to trigger DB data reset
	function handleChange(e) {
		const fileReader = new FileReader();
		fileReader.readAsText(e.target.files[0], "UTF-8");
		fileReader.onload = (e) => {
			const JSONData = JSON.parse(e.target.result);
			importData(JSONData, () => {
				setImportSpinnerState(false);
				history.push("/");
			});
		};
	}
	return (
		<>
			<div className="container">
				<Fade duration={500}>
					<div className="about-us">
						<Box sx={{ bgcolor: '#999', pt: 8, pb: 6 }}>
						<Container maxWidth="md">
							<Typography variant="h4" align="center" gutterBottom>
							About Us
							</Typography>
							<Typography variant="subtitle1" align="center" gutterBottom>
							This DSA Tracker is made for people who want to practice DSA from A to Z for free in a well-organized and structured manner. 
							</Typography>
							<Box sx={{ borderRadius:'2rem',display: 'flex', justifyContent: 'center', my: 4 }}>
							<img
								src="https://static1.smartbear.co/smartbearbrand/media/images/blog/what%E2%80%99s-the-best-programming-language-to-learn-first.png?ext=.png"
								alt="Company Logo"
								style={{ width:'300px',maxWidth: '100%', height: 'auto' }}
							/>
							</Box>
							<Typography variant="body1" align="center" paragraph>
							
							This DSA Tracker is your personal web-based progress tracker based on <br></br>
							<i>
								<a
									href="https://drive.google.com/file/d/1FMdN_OCfOI0iAeDlqswCiC2DZzD4nPsb/view"
									target="_blank"
									rel="noopener noreferrer"
								>
									DSA Cracker Sheet
								</a>
							</i>
							</Typography>
							<Grid container justifyContent="center" spacing={2}>
							<Grid item>
								<Button
								variant="outlined"
								startIcon={<GitHub />}
								component={Link}
								href="https://github.com/Charanreddy27"
								target="_blank"
								rel="noopener"
								>
								Github
								</Button>
							</Grid>
							<Grid item>
								<Button
								variant="outlined"
								startIcon={<LinkedIn />}
								component={Link}
								href="https://www.linkedin.com/in/charan-reddy-b46241219/"
								target="_blank"
								rel="noopener"
								>
								Linkedin
								</Button>
							</Grid>
							<Grid item>
								<Button
								variant="outlined"
								startIcon={<Instagram />}
								component={Link}
								href="https://www.instagram.com/charan._.reddy27/"
								target="_blank"
								rel="noopener"
								>
								Instagram
								</Button>
							</Grid>
							</Grid>
						</Container>
						</Box>
					</div>
					<div className="container my-5">
						
						<h5 className="text-center my-5">
							Project by{" "}
							<a href="https://www.linkedin.com/in/charan-reddy-b46241219/" target="_blank" rel="noopener noreferrer">
								Charan
							</a>{" "}
							<span role="img" aria-label="code-men">
								👨🏻‍💻
							</span>
						</h5>
						<h5 className="text-center">
							
							<Button variant="contained" endIcon={< RestartAltRoundedIcon/> } style={{ cursor: "pointer",width:"250px",marginTop:"10px" }}
								onClick={() => {
									if (window.confirm("Are you sure you want to reset the progress !")) {
										setExportSpinnerState(true);
										resetData();
									}
								}}>
									<Spinner animation="border" variant="light" size="sm" style={exportSpinnerState ? {} : { display: "none" }} />
  								Reset Progress
							</Button>
							&nbsp;
							<Button variant="contained" endIcon={< FileDownloadRoundedIcon/> } style={{ cursor: "pointer" ,width:"250px",marginTop:"10px"}}
								onClick={() => {
									setImportSpinnerState(true);
									inputFile.current.click();
								}}>
									<Spinner animation="border" variant="light" size="sm" style={importSpinnerState ? {} : { display: "none" }} />
  								Import Progress
							</Button>
								&nbsp;
							<Button variant="contained" endIcon={< FileUploadRoundedIcon/> } style={{ cursor: "pointer" ,width:"250px",marginTop:"10px"}}
								onClick={() => {
									setExportSpinnerState(true);
									exportData(() => {
										setExportSpinnerState(false);
									});
								}}>
									<Spinner animation="border" variant="light" size="sm" style={importSpinnerState ? {} : { display: "none" }} />
  								Export Progress
							</Button>
						</h5>
								
						<input type="file" id="file" ref={inputFile} style={{ display: "none" }} accept=".json" onChange={handleChange} />
					</div>
				</Fade>
			</div>
		</>
	);
}
