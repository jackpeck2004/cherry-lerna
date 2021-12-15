import { NextApiRequest } from "next";
import { Session } from "next-iron-session";

export { submitForm, uploadFiles } from "./challengeFunctions";
export { connectToDatabase } from "./db";
export { http, PUBLISHER_URI } from "./http-common";

export type NextIronRequest = NextApiRequest & { session: Session };
export { nextIronSessionOptions } from "./nextIronSessionConfig"

export { deepEqual, isObject } from "./functions";

export { Portal, PortalDiv } from "./portal";

export { authMiddleware } from "./auth";
