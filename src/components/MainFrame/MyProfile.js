// import React, { useEffect } from "react";
// import "semantic-ui-css/semantic.min.css";
// import {
//   Grid,
//   Image,
//   Rating,
//   Header,
//   Icon,
//   Loader,
//   Form,
//   Menu,
//   Progress,
//   Modal,
//   Button,
// } from "semantic-ui-react";
// import { TeamServices } from "../../Services/TeamServices";
// import { Paths } from "../routes/routePaths";
// import { Link, useHistory, withRouter } from "react-router-dom";
// import defaultUserImage from "../../assets/img/User_Icon.svg";
// import pieChart from "../../assets/img/Pie-Chart.png";
// import AssignGoalIconIcon from "../../assets/img/goal-profile-icon.png";
// import PraiseIconIcon from "../../assets/img/Praise-profile-icon.png";

// import TotalMeetingIcon from "../../assets/img/Total-Meetings.png";
// import TotalPraiseIcon from "../../assets/img/Total-Praise.png";
// import calViewDetail from "../../assets/img/calendar-view-detail.png";
// import RankIcon from "../../assets/img/Rank.png";
// import GradeIcon from "../../assets/img/Grade.png";
// import EditImgIcon from "../../assets/img/Edit-img-Icon.png";
// import "./MainFrame.scss";
// import PhoneInputField from "../Sys/PhoneInputField";
// import { toast } from "react-toastify";
// import CanvasJSReact from "./canvas/canvasjs.react";
// import Avatar from "react-avatar";
// import { AdminLandServices } from "../../Services/AdminLandServices";
// var CanvasJSChart = CanvasJSReact.CanvasJSChart;
// const adminLandServices = new AdminLandServices();

// const teamServices = new TeamServices();
// const permission = ["Goal", "Praise", "Meeting", "Company"];
// function MyProfile(props) {
//   const [departmentPermission, setDepartmentPermission] = React.useState([]);
//   const [teamId, setTeamId] = React.useState("");
//   const [teamDetail, setTeamDetail] = React.useState("");
//   const [profileImage, setProfileImage] = React.useState("");
//   const [firstName, setFirstName] = React.useState("");
//   const [lastName, setLastName] = React.useState("");
//   const [phoneNumber, setPhoneNumber] = React.useState("");
//   const [profileImagePath, setProfileImagePath] = React.useState("");
//   const [activeItem, setActiveItem] = React.useState("Goal");
//   const [isEditProfile, setIsEditProfile] = React.useState(false);
//   const [profileDetail, setProfileDetail] = React.useState("");
//   const [
//     isAdminLoginShowEditIcon,
//     setIsAdminLoginShowEditIcon,
//   ] = React.useState(false);
//   const [empId, setEmpId] = React.useState("");
//   const [isUpdateDisable, setIsUpdateDisable] = React.useState(false);
//   const history = useHistory();

//   const handleItemClick = (e, { name }) => {
//     setActiveItem(name ? name : activeItem);
//   };
//   const handleTeamClick = () => {
//     props.history.push(Paths.CreateTeam);
//   };

//   for (const [key, value] of Object.entries(teamDetail)) {
//     const keyis = key.toUpperCase().replace(/_/g, " ");
//     console.log(`${keyis}: ${value}`);
//   }

//   useEffect(() => {
//     if (props.location.state && props.location.state.uid) {
//       setIsAdminLoginShowEditIcon(true);
//       setEmpId(props.location.state.uid);
//       getDetailMyProfile(props.location.state.uid);
//     } else {
//       getDetailMyProfile(localStorage.getItem("uid"));
//       setIsAdminLoginShowEditIcon(false);
//     }
//     getAllUserPermission();
//   }, []);

//   const getDetailMyProfile = (id) => {
//     teamServices.getDetailMyProfile(id).then(
//       (data) => {
//         setProfileDetail(data);
//       },
//       (error) => {
//         console.log("error.response.status", error);
//       }
//     );
//   };

//   const updateProfile = () => {
//     setIsUpdateDisable(true);
//     var data = {
//       first_name: firstName,
//       last_name: lastName,
//       mobile: phoneNumber,
//       profile_image: profileImage,
//     };
//     teamServices.updateMyProfile(localStorage.getItem("uid"), data).then(
//       (data) => {
//         toast.success(data.message, {
//           position: toast.POSITION.TOP_RIGHT,
//         });
//         setIsUpdateDisable(false);
//         setIsEditProfile(false);
//         getDetailMyProfile(localStorage.getItem("uid"));
//       },
//       (error) => {
//         setIsUpdateDisable(false);
//         toast.error(
//           error.response.data.message
//             ? error.response.data.message
//             : error.message,
//           {
//             position: toast.POSITION.TOP_RIGHT,
//           }
//         );
//         console.log("error.response.status", error);
//       }
//     );
//   };

//   // This function for the image upload
//   const _handleUploadImage = (e) => {
//     let file = e.target.files[0];
//     if (!file) return;
//     let reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onloadend = () => {
//       setProfileImagePath(URL.createObjectURL(file));
//       setProfileImage(reader.result);
//     };
//   };

//   const handleEditProfile = () => {
//     setIsEditProfile(true);
//     setPhoneNumber(profileDetail.mobile);
//     setFirstName(profileDetail.first_name);
//     setLastName(profileDetail.last_name);
//   };

//   console.log("teamDetail", teamDetail);

//   // canvasJSChart Script Starts Here
//   const options = {
//     theme: "",
//     animationEnabled: false,
//     // title: {
//     //   text: "Performance Rating",
//     //   fontSize: 32,
//     //   fontWeight: "bold"
//     // },
//     subtitles: [
//       {
//         text: "500 Totals",
//         verticalAlign: "center",
//         fontSize: 12,
//         fontWeight: "bold",
//         dockInsidePlotArea: true,
//       },
//     ],
//     data: [
//       {
//         type: "doughnut",
//         showInLegend: false,
//         verticalAlign: "top",
//         dataPoints: [
//           { name: "Completed Goal", y: 150, color: "#49c462" },
//           { name: "Incompleted Goal", y: 220, color: "#000839" },
//           { name: "Assigned Goal", y: 130, color: "#ffa41b" },
//         ],
//       },
//     ],
//   };

//   const getAllUserPermission = () => {
//     adminLandServices.EmployeePermission().then(
//       (data) => {
//         setDepartmentPermission([...data.data.permissions]);
//         console.log("User Permission data =>", data);
//       },
//       (error) => {
//         console.log("error.response.status", error);
//       }
//     );
//   };
//   // cnavasJs Scripts Ends Here
//   return (
//     <div className="main-contant">
//       {/* <div className="team-page"> */}
//       <Grid>
//         <Grid.Row>
//           <Grid.Column>
//             <div style={{ padding: "10px" }}>
//               <Button
//                 className="back-text-style"
//                 onClick={() => window.history.back()}
//               >
//                 <Icon name="arrow left" />
//                 Back
//               </Button>
//             </div>
//           </Grid.Column>
//         </Grid.Row>
//       </Grid>
//       <div className="view-my-profile">
//         {/* <div style={{height: "30px"}}>
//           <Icon name="pencil square" style={{float: "right", color: "#7d849185"}} 
//           onClick={handleEditProfile}  size="large" />
//           </div>
//         {
//           (localStorage.getItem("role") != "Admin")  ?
//           <div style={{height: "30px"}}>
//           <Icon name="pencil square" style={{float: "right", color: "#7d849185"}} 
//           onClick={handleEditProfile}  size="large" />
//           </div>
//           :
//           null
//         } */}
//         {/* {
//           isAdminLoginShowEditIcon ? (
//             <div style={{ height: "30px" }}>
//               {localStorage.getItem("role") === "Admin" ||
//               departmentPermission.find((item) => item === "team") ? (
//                 <Icon
//                   name="pencil square"
//                   style={{ float: "right", color: "#7d849185" }}
//                   onClick={() => history.push(`/team/edit/${empId}`)}
//                   size="large"
//                 />
//               ) : null}
//             </div>
//           ) : (
//             // ( localStorage.getItem('role') === "Admin" || departmentPermission.find(item =>item === "team")) ?
//             <div style={{ height: "30px" }}>
//               <Icon
//                 name="pencil square"
//                 style={{ float: "right", color: "#7d849185" }}
//                 onClick={handleEditProfile}
//                 size="large"
//               />
//             </div>
//           )
//           // : null
//         } */}

//         <Grid>
//           <Grid.Row style={{ padding: 0 }}>
//             <Grid.Column
//               width={5}
//               style={{ padding: 0, borderRight: "2px solid #eef2f3" }}
//             >
//               <div style={{ backgroundColor: "#f7f9f8", padding: 10 }}>
//                 {profileDetail && profileDetail.profile_image ? (
//                   <Avatar
//                     size="50"
//                     src={profileDetail.profile_image}
//                     round="50%"
//                   />
//                 ) : (
//                   <Avatar
//                     name={
//                       profileDetail.first_name + " " + profileDetail.last_name
//                     }
//                     size="50"
//                     round="50%"
//                     className="profilePicName"
//                   />
//                 )}
//               </div>
//               <div style={{ margin: 10, marginLeft: 15 }}>
//                 <Header as="h5" style={{ margin: 0, fontSize: "16px" }}>
//                   {profileDetail && profileDetail.first_name}{" "}
//                   {profileDetail && profileDetail.last_name}
//                 </Header>
//                 <p className="p-text-personal">
//                   {localStorage.getItem("role") === "Admin" ? (
//                     <span>Admin</span>
//                   ) : (
//                     <span>{profileDetail.job_title}</span>
//                   )}
//                 </p>
//               </div>
//               <div
//                 style={{
//                   borderTop: "2px solid #eef2f3",
//                   borderBottom: "2px solid #eef2f3",
//                   marginLeft: 15,
//                 }}
//               >
//                 <div className="profile-detail-grade-content">
//                   <Header as="h5">Grade</Header>
//                   <p>A+</p>
//                 </div>
//                 <div className="profile-detail-grade-content">
//                   <Header as="h5">Point</Header>
//                   <p>20</p>
//                 </div>
//                 <div
//                   className="profile-detail-grade-content"
//                   style={{ border: "none" }}
//                 >
//                   <Header as="h5">Rank</Header>
//                   <p>1</p>
//                 </div>
//               </div>
//               <div style={{ margin: 10, marginLeft: 15 }}>
//                 <p>
//                   56% <span style={{ color: "#a3a7b0" }}>Completed Task</span>
//                 </p>
//                 <Progress percent={32} color="green" size="tiny" />
//               </div>
//             </Grid.Column>
//             <Grid.Column width={11}>
//               <div style={{ marginTop: 27, marginBottom: 27 }}>
//                 <Header as="h3" style={{display: "inline-block"}}>Overview</Header>
//                 <div className="div-inline" style={{float: "right"}}> 
//                   {
//                     isAdminLoginShowEditIcon ? (
//                       <div style={{ height: "30px" }}>
//                         {localStorage.getItem("role") === "Admin" ||
//                         departmentPermission.find((item) => item === "team") ? (
//                           <Icon
//                             name="pencil square"
//                             style={{ float: "right", color: "#7d849185" }}
//                             onClick={() => history.push(`/team/edit/${empId}`)}
//                             size="large"
//                           />
//                         ) : null}
//                       </div>
//                     ) : (
//                       // ( localStorage.getItem('role') === "Admin" || departmentPermission.find(item =>item === "team")) ?
//                       <div style={{ height: "30px" }}>
//                         <Icon
//                           name="pencil square"
//                           style={{ float: "right", color: "#7d849185" }}
//                           onClick={handleEditProfile}
//                           size="large"
//                         />
//                       </div>
//                     )
//                     // : null
//                   }
//                 </div>
//               </div>
//               <Grid columns={3}>
//                 <Grid.Row>
//                   <Grid.Column>
//                     <div className="overview-box">
//                       <div className="overview-detail">
//                         <div
//                           className="div-inline"
//                           style={{
//                             float: "left",
//                             background: "#69e1bd",
//                             borderRadius: 50,
//                             padding: 6,
//                             width: "34px",
//                             height: "34px",
//                             position: "relative",
//                           }}
//                         >
//                           <div
//                             style={{
//                               background: "#fff",
//                               textAlign: "center",
//                               borderRadius: 50,
//                               position: "absolute",
//                               top: "50%",
//                               left: "50%",
//                               transform: "translate(-50%,-50%)",
//                               width: "20px",
//                               height: "20px",
//                             }}
//                           >
//                             <Icon
//                               name="check"
//                               style={{
//                                 margin: 0,
//                                 color: "#69e1bd",
//                                 position: "absolute",
//                                 top: "40%",
//                                 left: "50%",
//                                 transform: "translate(-50%,-50%)",
//                                 fontSize: 12,
//                               }}
//                             />
//                           </div>
//                         </div>
//                         <div className="header-content">
//                           <Header as="h5" style={{ color: "#a3a7b0" }}>
//                             Completed Goal
//                           </Header>
//                           <Header as="h5">100</Header>
//                         </div>
//                       </div>
//                     </div>
//                   </Grid.Column>
//                   <Grid.Column>
//                     <div className="overview-box">
//                       <div className="overview-detail">
//                         <div
//                           className="div-inline"
//                           style={{
//                             float: "left",
//                             background: "#ffb572",
//                             borderRadius: 50,
//                             padding: 6,
//                             width: "34px",
//                             height: "34px",
//                           }}
//                         >
//                           <Image src={AssignGoalIconIcon} width="22" />
//                         </div>
//                         <div className="header-content">
//                           <Header as="h5" style={{ color: "#a3a7b0" }}>
//                             Assigned Gal
//                           </Header>
//                           <Header as="h5">150</Header>
//                         </div>
//                       </div>
//                     </div>
//                   </Grid.Column>
//                   <Grid.Column>
//                     <div className="overview-box">
//                       <div className="overview-detail">
//                         <div
//                           className="div-inline"
//                           style={{
//                             float: "left",
//                             background: "#727588",
//                             borderRadius: 50,
//                             padding: 6,
//                             width: "34px",
//                             height: "34px",
//                             position: "relative",
//                           }}
//                         >
//                           <div
//                             style={{
//                               background: "#fff",
//                               textAlign: "center",
//                               borderRadius: 50,
//                               position: "absolute",
//                               top: "50%",
//                               left: "50%",
//                               transform: "translate(-50%,-50%)",
//                               width: "20px",
//                               height: "20px",
//                             }}
//                           >
//                             <Icon
//                               name="close"
//                               style={{
//                                 margin: 0,
//                                 fontSize: 12,
//                                 color: "#727588",
//                                 position: "absolute",
//                                 top: "40%",
//                                 left: "50%",
//                                 transform: "translate(-50%,-50%)",
//                               }}
//                             />
//                           </div>
//                         </div>
//                         <div className="header-content">
//                           <Header as="h5" style={{ color: "#a3a7b0" }}>
//                             In-complete Goal
//                           </Header>
//                           <Header as="h5">100</Header>
//                         </div>
//                       </div>
//                     </div>
//                   </Grid.Column>
//                   <Grid.Column>
//                     <div className="overview-box" style={{ marginTop: 15 }}>
//                       <div className="overview-detail">
//                         <div
//                           className="div-inline"
//                           style={{
//                             background: "#fe7da3",
//                             borderRadius: 50,
//                             padding: 6,
//                             width: "34px",
//                             height: "34px",
//                             position: "relative",
//                           }}
//                         >
//                           <div
//                             style={{
//                               background: "#fff",
//                               textAlign: "center",
//                               borderRadius: 50,
//                               position: "absolute",
//                               top: "50%",
//                               left: "50%",
//                               transform: "translate(-50%,-50%)",
//                               width: "20px",
//                               height: "20px",
//                             }}
//                           >
//                             <Icon
//                               name="exclamation"
//                               style={{
//                                 margin: 0,
//                                 fontSize: 12,
//                                 color: "#fe7da3",
//                                 position: "absolute",
//                                 top: "40%",
//                                 left: "50%",
//                                 transform: "translate(-50%,-50%)",
//                               }}
//                             />
//                           </div>
//                         </div>
//                         <div className="header-content">
//                           <Header as="h5" style={{ color: "#a3a7b0" }}>
//                             Number of Complaint
//                           </Header>
//                           <Header as="h5">100</Header>
//                         </div>
//                       </div>
//                     </div>
//                   </Grid.Column>

//                   <Grid.Column>
//                     <div className="overview-box" style={{ marginTop: 15 }}>
//                       <div className="overview-detail">
//                         <div
//                           className="div-inline"
//                           style={{
//                             background: "#64d7f4",
//                             borderRadius: 50,
//                             padding: 8,
//                             width: "34px",
//                             height: "34px",
//                           }}
//                         >
//                           <Image src={PraiseIconIcon} width="22" />
//                         </div>
//                         <div className="header-content">
//                           <Header as="h5" style={{ color: "#a3a7b0" }}>
//                             Number of Meeting
//                           </Header>
//                           <Header as="h5">20</Header>
//                         </div>
//                       </div>
//                     </div>
//                   </Grid.Column>
//                   <Grid.Column>
//                     <div className="overview-box" style={{ marginTop: 15 }}>
//                       <div className="overview-detail">
//                         <div
//                           className="div-inline"
//                           style={{
//                             background: "#9694ff",
//                             borderRadius: 50,
//                             padding: 8,
//                             width: "34px",
//                             height: "34px",
//                           }}
//                         >
//                           <Image src={PraiseIconIcon} width="22" />
//                         </div>
//                         <div className="header-content">
//                           <Header as="h5" style={{ color: "#a3a7b0" }}>
//                             Number of Praise
//                           </Header>
//                           <Header as="h5">150</Header>
//                         </div>
//                       </div>
//                     </div>
//                   </Grid.Column>
//                 </Grid.Row>
//               </Grid>
//             </Grid.Column>
//           </Grid.Row>
//         </Grid>

//         <div className="nav-upcoming nav-my-profile">
//           <Menu pointing secondary>
//             <Menu.Item
//               name="Goal"
//               active={activeItem === "Goal"}
//               onClick={handleItemClick}
//             />
//             <Menu.Item
//               name="Domain Proficiency"
//               active={activeItem === "Domain Proficiency"}
//               onClick={handleItemClick}
//             />
//             <Menu.Item
//               name="Adherence to Process & Culture"
//               active={activeItem === "Adherence to Process & Culture"}
//               onClick={handleItemClick}
//             />
//             <Menu.Item
//               name="Reporting Manager Score"
//               active={activeItem === "Reporting Manager Score"}
//               onClick={handleItemClick}
//             />
//             <Menu.Item
//               name="Self learning ad Growth"
//               active={activeItem === "Self learning ad Growth"}
//               onClick={handleItemClick}
//             />
//           </Menu>
//         </div>
//         <div className="my-profile-goal-section">
//           <Grid>
//             <Grid.Row>
//               <Grid.Column width={7}>
//                 <div className="my-profile-goal-select-box">
//                   <Header
//                     as="h5"
//                     style={{
//                       paddingLeft: 15,
//                     }}
//                   >
//                     October, 2020
//                   </Header>
//                   <div className="list-goal-my-profile">
//                     <div className="div-inline">
//                       <span
//                         className="input-number-goal"
//                         style={{ color: "#fff" }}
//                       >
//                         3
//                       </span>
//                       <span>Online Food ordering System</span>
//                       <Icon
//                         name="calendar alternate"
//                         style={{ color: "#9ba6a8", marginLeft: 5 }}
//                       />
//                       <span style={{ fontSize: 12, color: "#7e8491" }}>
//                         Tue, Oct 20
//                       </span>
//                       <Image
//                         src={defaultUserImage}
//                         width="12"
//                         className="img-user"
//                       />
//                       <span style={{ color: "#7e8491", fontSize: 12 }}>
//                         Nikita Bansal
//                       </span>
//                     </div>
//                   </div>
//                   <div className="list-goal-my-profile">
//                     <div className="div-inline">
//                       <span
//                         className="input-number-goal"
//                         style={{ color: "#fff" }}
//                       >
//                         3
//                       </span>
//                       <span>Online Food ordering System</span>
//                       <Icon
//                         name="calendar alternate"
//                         style={{ color: "#9ba6a8", marginLeft: 5 }}
//                       />
//                       <span style={{ fontSize: 12, color: "#7e8491" }}>
//                         Tue, Oct 20
//                       </span>
//                       <Image
//                         src={defaultUserImage}
//                         width="12"
//                         className="img-user"
//                       />
//                       <span style={{ color: "#7e8491", fontSize: 12 }}>
//                         Nikita Bansal
//                       </span>
//                     </div>
//                   </div>
//                   <div className="list-goal-my-profile">
//                     <div className="div-inline">
//                       <span
//                         className="input-number-goal"
//                         style={{ color: "#fff" }}
//                       >
//                         3
//                       </span>
//                       <span>Online Food ordering System</span>
//                       <Icon
//                         name="calendar alternate"
//                         style={{ color: "#9ba6a8", marginLeft: 5 }}
//                       />
//                       <span style={{ fontSize: 12, color: "#7e8491" }}>
//                         Tue, Oct 20
//                       </span>
//                       <Image
//                         src={defaultUserImage}
//                         width="12"
//                         className="img-user"
//                       />
//                       <span style={{ color: "#7e8491", fontSize: 12 }}>
//                         Nikita Bansal
//                       </span>
//                     </div>
//                   </div>
//                   <div className="list-goal-my-profile">
//                     <div className="div-inline">
//                       <span
//                         className="input-number-goal"
//                         style={{ color: "#fff" }}
//                       >
//                         3
//                       </span>
//                       <span>Online Food ordering System</span>
//                       <Icon
//                         name="calendar alternate"
//                         style={{ color: "#9ba6a8", marginLeft: 5 }}
//                       />
//                       <span style={{ fontSize: 12, color: "#7e8491" }}>
//                         Tue, Oct 20
//                       </span>
//                       <Image
//                         src={defaultUserImage}
//                         width="12"
//                         className="img-user"
//                       />
//                       <span style={{ color: "#7e8491", fontSize: 12 }}>
//                         Nikita Bansal
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </Grid.Column>
//               <Grid.Column width={6}>
//                 <div className="my-profile-goal-select-box">
//                   <Header
//                     as="h5"
//                     style={{
//                       paddingLeft: 15,
//                       width: "82%",
//                       display: "inline-block",
//                     }}
//                   >
//                     Goal
//                   </Header>
//                   <Header
//                     as="h5"
//                     style={{
//                       paddingLeft: 15,
//                       width: "18%",
//                       display: "inline-block",
//                       margin: 0,
//                     }}
//                   >
//                     20/25
//                   </Header>
//                   <div style={{ paddingLeft: 15 }}>
//                     <span>Domain Proficiency</span>
//                     <span className="goal-count-number">3/10</span>
//                   </div>
//                   <div style={{ paddingLeft: 15 }}>
//                     <span>Domain Proficiency</span>
//                     <span className="goal-count-number">3/10</span>
//                   </div>
//                   <div style={{ paddingLeft: 15 }}>
//                     <span>Domain Proficiency</span>
//                     <span className="goal-count-number">3/10</span>
//                   </div>
//                   <div style={{ paddingLeft: 15 }}>
//                     <span>Domain Proficiency</span>
//                     <span className="goal-count-number">3/10</span>
//                   </div>
//                 </div>
//               </Grid.Column>
//               <Grid.Column width={3}>
//                 <div
//                   className="my-profile-goal-select-box"
//                   style={{ background: "#f7f9f8" }}
//                 >
//                   <div className="inside-goal-rank">
//                     <div className="image-rank-div">
//                       <Image src={RankIcon} className="rank-score-img" />
//                     </div>
//                     <div className="rank-score-val">
//                       <Header as="h5">2</Header>
//                       <p style={{ color: "#a3a7b0" }}>Rank</p>
//                     </div>
//                   </div>
//                   <div className="inside-goal-rank" style={{ marginTop: 12 }}>
//                     <div
//                       className="image-rank-div"
//                       style={{ backgroundColor: "#6ae0bd" }}
//                     >
//                       <Image src={GradeIcon} className="rank-score-img" />
//                     </div>
//                     <div className="rank-score-val">
//                       <Header as="h5">A</Header>
//                       <p style={{ color: "#a3a7b0" }}>Grade</p>
//                     </div>
//                   </div>
//                 </div>
//               </Grid.Column>
//             </Grid.Row>
//             <Grid.Row>
//               <Grid.Column width={7}>
//                 <div className="my-profile-goal-select-box">
//                   <Header
//                     as="h5"
//                     style={{
//                       paddingLeft: 15,
//                     }}
//                   >
//                     August,2020
//                   </Header>
//                   <div className="list-goal-my-profile">
//                     <div className="div-inline">
//                       <span
//                         className="input-number-goal"
//                         style={{ color: "#fff" }}
//                       >
//                         3
//                       </span>
//                       <span>Online Food ordering System</span>
//                       <Icon
//                         name="calendar alternate"
//                         style={{ color: "#9ba6a8", marginLeft: 5 }}
//                       />
//                       <span style={{ fontSize: 12, color: "#7e8491" }}>
//                         Tue, Oct 20
//                       </span>
//                       <Image
//                         src={defaultUserImage}
//                         width="12"
//                         className="img-user"
//                       />
//                       <span style={{ color: "#7e8491", fontSize: 12 }}>
//                         Nikita Bansal
//                       </span>
//                       <Icon
//                         name="check circle outline"
//                         style={{ color: "#54bd68", marginLeft: 5 }}
//                       />
//                     </div>
//                   </div>
//                   <div className="list-goal-my-profile">
//                     <div className="div-inline">
//                       <span
//                         className="input-number-goal"
//                         style={{ color: "#fff" }}
//                       >
//                         3
//                       </span>
//                       <span>Online Food ordering System</span>
//                       <Icon
//                         name="calendar alternate"
//                         style={{ color: "#9ba6a8", marginLeft: 5 }}
//                       />
//                       <span style={{ fontSize: 12, color: "#7e8491" }}>
//                         Tue, Oct 20
//                       </span>
//                       <Image
//                         src={defaultUserImage}
//                         width="12"
//                         className="img-user"
//                       />
//                       <span style={{ color: "#7e8491", fontSize: 12 }}>
//                         Nikita Bansal
//                       </span>
//                       <Icon
//                         name="check circle outline"
//                         style={{ color: "#54bd68", marginLeft: 5 }}
//                       />
//                     </div>
//                   </div>
//                   <div className="list-goal-my-profile">
//                     <div className="div-inline">
//                       <span
//                         className="input-number-goal"
//                         style={{ color: "#fff" }}
//                       >
//                         3
//                       </span>
//                       <span>Online Food ordering System</span>
//                       <Icon
//                         name="calendar alternate"
//                         style={{ color: "#9ba6a8", marginLeft: 5 }}
//                       />
//                       <span style={{ fontSize: 12, color: "#7e8491" }}>
//                         Tue, Oct 20
//                       </span>
//                       <Image
//                         src={defaultUserImage}
//                         width="12"
//                         className="img-user"
//                       />
//                       <span style={{ color: "#7e8491", fontSize: 12 }}>
//                         Nikita Bansal
//                       </span>
//                       <Icon
//                         name="check circle outline"
//                         style={{ color: "#54bd68", marginLeft: 5 }}
//                       />
//                     </div>
//                   </div>
//                   <div className="list-goal-my-profile">
//                     <div className="div-inline">
//                       <span
//                         className="input-number-goal"
//                         style={{ color: "#fff" }}
//                       >
//                         3
//                       </span>
//                       <span>Online Food ordering System</span>
//                       <Icon
//                         name="calendar alternate"
//                         style={{ color: "#9ba6a8", marginLeft: 5 }}
//                       />
//                       <span style={{ fontSize: 12, color: "#7e8491" }}>
//                         Tue, Oct 20
//                       </span>
//                       <Image
//                         src={defaultUserImage}
//                         width="12"
//                         className="img-user"
//                       />
//                       <span style={{ color: "#7e8491", fontSize: 12 }}>
//                         Nikita Bansal
//                       </span>
//                       <Icon
//                         name="check circle outline"
//                         style={{ color: "#54bd68", marginLeft: 5 }}
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </Grid.Column>
//               <Grid.Column width={6}>
//                 <div className="my-profile-goal-select-box">
//                   <Header
//                     as="h5"
//                     style={{
//                       paddingLeft: 15,
//                       width: "82%",
//                       display: "inline-block",
//                     }}
//                   >
//                     Goal
//                   </Header>
//                   <Header
//                     as="h5"
//                     style={{
//                       paddingLeft: 15,
//                       width: "18%",
//                       display: "inline-block",
//                       margin: 0,
//                     }}
//                   >
//                     20/25
//                   </Header>
//                   <div style={{ paddingLeft: 15 }}>
//                     <span>Domain Proficiency</span>
//                     <span className="goal-count-number">3/10</span>
//                   </div>
//                   <div style={{ paddingLeft: 15 }}>
//                     <span>Domain Proficiency</span>
//                     <span className="goal-count-number">3/10</span>
//                   </div>
//                   <div style={{ paddingLeft: 15 }}>
//                     <span>Domain Proficiency</span>
//                     <span className="goal-count-number">3/10</span>
//                   </div>
//                   <div style={{ paddingLeft: 15 }}>
//                     <span>Domain Proficiency</span>
//                     <span className="goal-count-number">3/10</span>
//                   </div>
//                 </div>
//               </Grid.Column>
//               <Grid.Column width={3}>
//                 <div
//                   className="my-profile-goal-select-box"
//                   style={{ background: "#f7f9f8" }}
//                 >
//                   <div className="inside-goal-rank">
//                     <div className="image-rank-div">
//                       <Image src={RankIcon} className="rank-score-img" />
//                     </div>
//                     <div className="rank-score-val">
//                       <Header as="h5">2</Header>
//                       <p style={{ color: "#a3a7b0" }}>Rank</p>
//                     </div>
//                   </div>
//                   <div className="inside-goal-rank" style={{ marginTop: 12 }}>
//                     <div
//                       className="image-rank-div"
//                       style={{ backgroundColor: "#6ae0bd" }}
//                     >
//                       <Image src={GradeIcon} className="rank-score-img" />
//                     </div>
//                     <div className="rank-score-val">
//                       <Header as="h5">A</Header>
//                       <p style={{ color: "#a3a7b0" }}>Grade</p>
//                     </div>
//                   </div>
//                 </div>
//               </Grid.Column>
//             </Grid.Row>
//           </Grid>
//         </div>
//       </div>

//       <Modal
//         onClose={() => setIsEditProfile(false)}
//         onOpen={() => setIsEditProfile(true)}
//         open={isEditProfile}
//         size="tiny"
//       >
//         <Modal.Content className="content-center">
//           <center>
//             <div className="image-upload">
//               {profileDetail && profileDetail.profile_image ? (
//                 <Avatar
//                   size="100"
//                   src={profileDetail.profile_image}
//                   round="50%"
//                 />
//               ) : (
//                 <Avatar
//                   name={
//                     profileDetail.first_name + " " + profileDetail.last_name
//                   }
//                   size="90"
//                   round="50%"
//                   textSizeRatio={3}
//                 />
//               )}
//               {/* <Image onError={ (e) => {
//                             e.target.onerror = null;
//                             e.target.src = defaultUserImage;
//                         }} 
//                         src = {(profileImage ? profileImage : (profileDetail && profileDetail.profile_image) ? profileDetail.profile_image  : defaultUserImage) }
//                         className="user-img"
//                     /> */}
//               <React.Fragment>
//                 <label for="file-input">
//                   {/* {
//                                 isLoading==='isLoadingImageUpload' ?
//                                 <Loader active inline size='mini' /> : */}
//                   {/* <Icon name='pencil'/> */}
//                   <Image
//                     src={EditImgIcon}
//                     width="35"
//                     height="35"
//                     className="img-edit-icon"
//                   />
//                   {/* } */}
//                 </label>
//                 <Form.Input
//                   id="file-input"
//                   type="file"
//                   name="profile"
//                   accept="image/jpeg,image/jpg,image/png"
//                   onChange={_handleUploadImage}
//                 />
//               </React.Fragment>
//             </div>
//             {/* <Image size="small" src={defaultUserImage} wrapped style={{marginTop: 15}}/> */}
//           </center>
//           <Form>
//             <Form.Input
//               fluid
//               label="First Name"
//               type="text"
//               value={firstName}
//               onChange={(e) => setFirstName(e.target.value)}
//               placeholder="First Name"
//               name="firstName"
//             />
//             <Form.Input
//               fluid
//               label="Last Name"
//               type="text"
//               value={lastName}
//               onChange={(e) => setLastName(e.target.value)}
//               placeholder="Last Name"
//               name="lastName"
//             />
//             {/* <Form.Input
//                   fluid
//                   label="Mobile Number"
//                   type="number"
//                   value={phoneNumber}
//                   onChange={(e) => setPhoneNumber(e.target.value)}
//                   placeholder="+919876543210"
//                   name="phone"
//                 /> */}
//             <PhoneInputField
//               label={false}
//               width={8}
//               // style={{ width: "90%" }}
//               value={profileDetail.mobile}
//               phone={profileDetail.mobile}
//               // error={!phoneNumber ? { content: "Phone is required" } : false}
//               _handlePhoneNumber={(phoneNumber) => {
//                 setPhoneNumber(phoneNumber);
//               }}
//               // onChange={(e) => setPhoneNumber(e.target.value)}
//             />
//             {/* <PhoneInputField
//                       label={false}
//                       width={8}
//                       style={{width: "90%"}}
//                       value={departmentData.mobile}
//                       phone={departmentData.mobile}
//                       error={
//                         submitted && !departmentData.mobile
//                           ? { content: "Phone is required" }
//                           : false
//                       }
//                       _handlePhoneNumber={(phone) => {
//                         setDepartmentData({
//                           ...departmentData,
//                           mobile: phone,
//                         });
//                       }}
//                     /> */}
//           </Form>
//         </Modal.Content>
//         <Modal.Actions
//           style={{
//             backgroundColor: "#fff",
//             textAlign: "center",
//             borderTop: "none",
//             marginBottom: 10,
//           }}
//         >
//           <Button
//             onClick={() => setIsEditProfile(false)}
//             className="cancle-btn"
//             style={{
//               width: " 35%",
//               margin: 0,
//             }}
//           >
//             Cancel
//           </Button>
//           <Button
//             className="save-btn"
//             style={{
//               width: " 35%",
//               color: "#fff",
//               marginLeft: 30,
//               // margin: 0,
//             }}
//             disabled={isUpdateDisable}
//             onClick={updateProfile}
//           >
//             Update
//           </Button>
//         </Modal.Actions>
//       </Modal>
//     </div>
//   );
// }

// export default withRouter(MyProfile);
