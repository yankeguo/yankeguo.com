export default defineEventHandler(async (event) => {
  if (
    handleCors(event, {
      origin: "*",
      methods: ["GET", "POST"],
    })
  ) {
    return;
  }
  return {
    rules: [
      {
        pathPattern: "/solana/actions/*",
        apiPath: "/api/solana/actions/*",
      },
    ],
  };
});
