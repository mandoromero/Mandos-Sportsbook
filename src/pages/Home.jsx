import MLBSchedule from "../components/MLBSchedule/MLBSchedule.jsx";
import NFLSchedule from "../components/NFLSchedule/NFLSchedule.jsx";
import NBASchedule from "../components/NBASchedule/NBASchedule.jsx";
import NHLSchedule from "../components/NHLSchedule/NHLSchedule.jsx";

export const Home = () => {
	
  	return (
		<div className="home">
			<div className="title-container">
			 	<h1 className="home-title">Welcome to Mando’s Sportsbook</h1>
			</div>
			<div className="sports">
				<MLBSchedule />
				<NFLSchedule />
				<NBASchedule />
				<NHLSchedule />
			</div>
    	</div>
  	);
};
