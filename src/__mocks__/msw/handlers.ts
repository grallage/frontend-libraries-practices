import { rest, graphql } from "msw";
import { Book, Review } from "./types";
import { redirect } from "./redirect";

export const handlers = [
  rest.post("/login", (req, res, ctx) => {
    // Persist user's authentication in the session
    sessionStorage.setItem("is-authenticated", "true");
    // localStorage.setItem('is-authenticated', 'true');

    return res(
      // Respond with a 200 status code
      ctx.status(200)
    );
  }),
  rest.post("/login2", async (req, res, ctx) => {
    const { username } = await req.json();

    if (username === "real-user") {
      // Bypass this request, returning an actual response
      // only when the `username` equals to a specific value.
      return req.passthrough();
    }

    // Otherwise, always respond with a mocked response.
    // return res(
    //   ctx.json({
    //     id: "abc-123",
    //   })
    // );
    return res(redirect("/v2/user", 301));
  }),
  rest.get("/user", (req, res, ctx) => {
    // Check if the user is authenticated in this session
    const isAuthenticated = sessionStorage.getItem("is-authenticated");
    // const isAuthenticated = localStorage.getItem("is-authenticated");
    if (!isAuthenticated) {
      // If not authenticated, respond with a 403 error
      return res(
        ctx.status(403),
        ctx.json({
          errorMessage: "Not authorized",
        })
      );
    }
    // If authenticated, return a mocked user details
    return res(
      ctx.status(200),
      ctx.json({
        username: "admin",
      })
    );
  }),
  rest.get("/user2", (req, res, ctx) => {
    const userId = req.url.searchParams.get("userId");

    if (userId === "abc-123") {
      // Return a mocked response only if the `userId` query parameter
      // equals to a specific value.
      return res(
        ctx.json({
          firstName: "John",
          lastName: "Maverick",
        })
      );
    }

    // Otherwise, explicitly state that you wish to perform this request as-is.
    return req.passthrough();
  }),
  /**
    req, an information about a matching request;
    res, a functional utility to create the mocked response;
    ctx, a group of functions that help to set a status code, headers, body, etc. of the mocked response.
   */
  rest.get("https://my.backend/book", (_req, res, ctx) => {
    return res(
      ctx.json<Book>({
        title: "Lord of the Rings",
        imageUrl: "/favicon.ico",
        description:
          "The Lord of the Rings is an epic high-fantasy novel written by English author and scholar J. R. R. Tolkien.",
      })
    );
  }),
  rest.get("/reviews", (_req, res, ctx) => {
    return res(
      ctx.json<Review[]>([
        {
          id: "60333292-7ca1-4361-bf38-b6b43b90cb16",
          author: "John Maverick",
          text: "Lord of The Rings, is with no absolute hesitation, my most favored and adored book by‑far. The trilogy is wonderful‑ and I really consider this a legendary fantasy series. It will always keep you at the edge of your seat‑ and the characters you will grow and fall in love with!",
        },
      ])
    );
  }),
  // Given "POST https://api.backend.dev/user/abc-123" request,
  rest.post("https://api.backend.dev/user/:userId", (req, res, ctx) => {
    // `userId` value becomes "abc-123"
    const { userId } = req.params;
  }),
  // This request handler would match all these requests:
  // - DELETE http://localhost:8080/posts/
  // - DELETE https://backend.dev/user/posts/
  rest.delete(/\/posts\//, () => {}),
  rest.get("/user/:userId", (req, res, ctx) => {
    return res(
      ctx.json({
        firstName: "John",
        lastName: "Maverick",
      })
    );
  }),
];

export const graphqlHandlers = [
  // Handles a "Login" mutation
  graphql.mutation("Login", (req, res, ctx) => {
    const { username } = req.variables;
    sessionStorage.setItem("is-authenticated", username);

    return res(
      ctx.data({
        login: {
          username,
        },
      })
    );
  }),

  // Handles a "GetUserInfo" query
  graphql.query("GetUserInfo", (req, res, ctx) => {
    const authenticatedUser = sessionStorage.getItem("is-authenticated");

    if (!authenticatedUser) {
      // When not authenticated, respond with an error
      return res(
        ctx.errors([
          {
            message: "Not authenticated",
            errorType: "AuthenticationError",
          },
        ])
      );
    }

    // When authenticated, respond with a query payload
    return res(
      ctx.data({
        user: {
          username: authenticatedUser,
          firstName: "John",
        },
      })
    );
  }),
];
