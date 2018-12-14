const jobRoles = [
    { key:"UI Developer", value:"UI Developer" },
    { key:"Backend Developer", value: "Backend Developer"},
    { key: "HR", value: "HR"},
    { key: "Business Analyst", value: "Business Analyst"},
    { key: "QA Tester", value: "QA Tester"},
    { key: "UI/UX Designer", value: "UI/UX Designer"}
]
const skills = [
    { key: 'C', value: 'C' },
    { key: 'Java', value: 'Java' },
    { key: 'C++', value: 'C++' },
    { key: 'Python', value: 'Python' },
    { key: 'Angular Js', value: 'Angular Js'},
    { key: 'C#', value: 'C#'},
    { key: 'Web Development', value: 'Web Development'},
    { key: 'Angular 2', value: 'Angular 2'},
    {key: 'Javascript', value: 'Javascript'},
    {key: 'Angular 4',value:'Angular 4'},
    {key: 'Angular 5',value: 'Angular 5'},
    {key: 'Angular 6',value:'Angular 6'},
    {key: 'NodeJs',value: 'NodeJs'},
    {key: 'Ruby', value: 'Ruby'},
    {key: 'MySQL', value:'MySQL'},
    {key: 'MongoDB', value:'MongoDB'}
]
const districts = {
    "Andhra Pradesh": [
        { key: "Srikakulam", value: "Srikakulam" },
        { key: "Vizag", value: "Vizag" },
        { key: "Vizianagaram", value: "Vizianagaram" },
        { key: "East Godavari", value: "East Godavari" },
        { key: "West Godavari", value: "West Godavari" },
        { key: "Krishna", value: "Krishna" },
        { key: "Guntur", value: "Guntur" },
        { key: "Prakasam", value: "Prakasam" },
        { key: "Nellore", value: "Nellore" },
        { key: "Chittor", value: "Chittor" },
        { key: "Kadapa", value: "Kadapa" },
        { key: "Anantapur", value: "Anantapur" },
        { key: "Kurnool", value: "Kurnool" }
    ]
}
const jobLocations = [
    {key:"Hyderabad", value: "Hyderabad"},
    {key:"Vizag", value: "Vizag"},
    {key:"Vijayawada", value: "Vijayawada"},
    {key:"Bengaluru", value: "Bengaluru"},
    {key: "Chennai", value: "Chennai"} 
];
const experience = [
    { key: "No Experience", value: "No Experience"},
    { key:"Less Than 1", value: "Less Than 1" },
    { key:"1-2", value: "1-2" },
    { key:"2-3", value: "2-3" },
    { key:"3-4", value: "3-4" },
    { key:"4-5", value: "4-5" },
    { key:"Greater Than 5", value: "Greater Than 5"}   
];
const pucBranch = [
    { key:"MPC", value: "MPC" },
    { key:"CEC", value: "CEC" },
    { key:"HEC", value: "HEC" },
    { key:"BiPC", value: "BiPC" }      
];
const educationQualification = [
    {key: "B.Tech", value: "B.Tech"},
    {key: "M.Tech", value: "M.Tech"},
    {key: "PUC", value: "PUC"},
    {key: "Degree", value: "Degree"}    
]

var constants = {
    jobRoles: jobRoles,
    skills: skills,
    experience: experience,
    districts: districts,
    jobLocations: jobLocations,
    educationQualification: educationQualification
}

module.exports = constants;