import { baseURL } from "@/baseUrl";
import { API_URL, APP_NAME } from "../../lib/constant";

export async function GET() {
	return Response.json({
		resource: baseURL,
		scopes_supported: ["search.read"],
		authorization_servers: [
			`${API_URL}/oauth/oidc/${APP_NAME}`
		],
	});
}