import { compose, context } from 'msw'
// import { ResponseComposition, DefaultBodyType } from "msw";

// export function redirect(destination: string, statusCode: number) {
//   return (res: any) => {
//     res.status = statusCode;
//     res.headers.set("Location", destination);
//     return res;
//   };
// }

export function redirect(destination: string, statusCode: number) {
  return compose(
    context.status(statusCode),
    context.set('Location', destination)
  )
}
