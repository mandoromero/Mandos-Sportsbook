import MLBSchedule from "../components/MLBSchedule/MLBSchedule.jsx";

export const Home = () => {
	
  	return (
		<div className="home">
			<div className="title-container">
			 	<h1 className="home-title">Welcome to Mando’s Sportsbook</h1>
			</div>
			<div className="sports">
				<MLBSchedule />
			</div>
    	</div>
  	);
};
