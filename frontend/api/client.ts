import createClient from "openapi-fetch";
import type { paths } from "./schema.d";

export default createClient<paths>({ baseUrl: `${process.env.EXPO_PUBLIC_API}` });
