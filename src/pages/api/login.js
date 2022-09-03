// import cookie from "cookie";
// import { axiosInstanceBack } from "../../data/axios";
// import { ENVIRONMENT } from "../../data/_variables";

// export default async function login(request, response) {
//   if (request.method === "POST") {
//     const { username, password } = request.body;
//     try {
//       const backResponse = await axiosInstanceBack.post("user/login/", {
//         username,
//         password,
//       });
//       const data = await backResponse.data;
//       if (backResponse.status === 200) {
//         console.log(backResponse.data);
//         response.setHeader("Set-Cookie", [
//           cookie.serialize("access", data.access, {
//             httpOnly: true,
//             secure: ENVIRONMENT !== "development",
//             maxAge: 120,
//             sameSite: "strict",
//             path: "/api/",
//           }),
//           cookie.serialize("refresh", data.refresh, {
//             httpOnly: true,
//             secure: ENVIRONMENT !== "development",
//             maxAge: 60 * 60 * 24 * 10,
//             sameSite: "strict",
//             path: "/api/",
//           }),
//         ]);
//         return response.status(200).json({
//           SUCCESS: "Logged In Successfully",
//         });
//       } else {
//         console.log(backResponse);
//         return response.status(backResponse.status).json({
//           error: "Authentication Failed",
//         });
//       }
//     } catch (err) {
//         console.log(err)
//       return response.status(500).json({
//         error: "something went wrong",
//       });
//     }
//   } else {
//     response.setHeader("Allow", ["POST"]);
//     return response
//       .status(405)
//       .json({ error: `Method ${request.method} not allowed.` });
//   }
// }
