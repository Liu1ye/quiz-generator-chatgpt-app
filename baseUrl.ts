// export const baseURL =
//   process.env.NODE_ENV == "development"
//     ? "http://localhost:3000"
//     : "https://" +
//       (process.env.VERCEL_ENV === "production"
//         ? process.env.VERCEL_PROJECT_PRODUCTION_URL
//         : process.env.VERCEL_BRANCH_URL || process.env.VERCEL_URL);


export const baseURL =
  process.env.NODE_ENV === "development"
    ? "https://unasphalted-psychosomatic-andy.ngrok-free.dev"
    : "https://quiz.apps.wisebox.ai";