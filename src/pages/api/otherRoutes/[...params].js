// import cookie from "cookie";
// import { axiosInstanceBack } from "../../../data/axios";

// export default async function parseCookie(request, response) {
//   const { params } = request.query;
//   const body = request.data ?? {};
//   const cookies = request.headers.cookie ?? "";
//   console.log("cookies: ", cookies);
//   const parsedCookies = cookie.parse(cookies);
//   console.log("parsed cookies: ", parsedCookies);
//   if (parsedCookies?.access) {
//     try {
//       const backResponse = await axiosInstanceBack(`${params.join("/")}/`, {
//         method: request.method,
//         data: body,
//         headers: {
//           Authorization: `Bearer ${parsedCookies?.access}`,
//         },
//       });
//       const data = await backResponse.data;
//       if (backResponse.status === 200 || backResponse.status === 201) {
//         return response(backResponse.status).json({
//           data: data,
//         });
//       } else {
//         return response.status(backResponse.status).json({
//           data: backResponse.error,
//         });
//       }
//     } catch (error) {
//       return response.status(500).json({
//         error: "something went wrong.",
//       });
//     }
//   } else {
//     return response.status(401).json({
//       error: "Unauthorized user",
//     });
//   }
// }
