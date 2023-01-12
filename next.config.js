/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = nextConfig;

// module.exports = {
//   async rewrites() {
//     return [
//       {
//         source: "/data/db.json",
//         destination: "http://localhost:8080/data",
//       },
//     ];
//   },
// };
