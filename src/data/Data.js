import axios from 'axios'
// import dotenv from 'dotenv'
// dotenv.config()
// let teamsDataStore = [
//   {
//     team_name: "Code Warriors",
//     team_code: "CW12345",
//     is_present: true,
//     member: ["Alice Johnson", "Bob Smith"],
//     competition_name: "Hackathon 2025"
//   },
//   {
//     team_name: "Bug Smashers",
//     team_code: "BS54321",
//     is_present: false,
//     member: ["Charlie Brown", "Dave Lee"],
//     competition_name: "Hackathon 2025"
//   },
//   {
//     team_name: "Neural Ninjas",
//     team_code: "NN67890",
//     is_present: true,
//     member: ["Eve Carter", "Franklin Harris"],
//     competition_name: "AI Challenge 2025"
//   },
//   {
//     team_name: "Deep Thinkers",
//     team_code: "DT98765",
//     is_present: true,
//     member: ["Grace Miller", "Henry Adams"],
//     competition_name: "AI Challenge 2025"
//   },
//   {
//     team_name: "Algorithm Avengers",
//     team_code: "AA45678",
//     is_present: false,
//     member: ["Isla Roberts", "Jack Thompson"],
//     competition_name: "AI Challenge 2025"
//   }
// ];
let teamsDataStore = [];

// export const getTeamsData = () => teamsDataStore;

export const updateTeamData = (teamCode, isPresent) => {
  teamsDataStore = teamsDataStore.map(team => 
    team.team_code === teamCode ? { ...team, is_present: isPresent } : team
  );
  return teamsDataStore;
};
export const searchTeams = (searchTerm) => {
  const term = searchTerm.toLowerCase();
  return teamsDataStore.filter(team =>
    team.team_name.toLowerCase().includes(term) ||
    team.team_code.toLowerCase().includes(term) ||
    team.member.some(m => m.toLowerCase().includes(term)) ||
    team.competition_name.toLowerCase().includes(term)
  );
};
export const getCompetitions = () => {
  const competitions = new Set(teamsDataStore.map(team => team.competition_name));
  return Array.from(competitions);
};
export const getTeamsData = async () => {
  try {
    const response = await axios.get("http://localhost:5000/admin");
    teamsDataStore = response.data; 
    return teamsDataStore;
  } catch (error) {
    console.error("Error fetching teams:", error);
    alert(error.message);
    return [];
  }
};
export const updateCompetitionData = (newData) => {
  teamsDataStore = newData;
  return teamsDataStore;
}; 