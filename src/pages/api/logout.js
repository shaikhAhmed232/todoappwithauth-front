// import cookie from "cookie";

// export default function logout(request, response) {
//   if (request.method === "POST") {
//     response.setHeader("Set-Cookie", [
//       cookie.serialize("access", "", {
//         httpOnly: true,
//         secure: false,
//         expires: new Date(0),
//         path: "/api/",
//         sameSite: "strict",
//       }),
//       cookie.serialize("refresh", "", {
//         httpOnly: true,
//         secure: false,
//         expires: new Date(0),
//         path: "/api/",
//         sameSite: "strict",
//       }),
//     ]);
//   } else {
//     response.setHeader("Allowed", ["POST"]);
//   }
// }
