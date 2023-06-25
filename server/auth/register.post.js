export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    console.log(query);

    return {
      message: "Hello World",
    };
  } catch (error) {}
});
