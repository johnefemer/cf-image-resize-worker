/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npx wrangler dev src/index.js` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npx wrangler publish src/index.js --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {

	/**
	 * to use image resize url must have img query param
	 * optionally you can pass cloudflare image variant 
	 * by default variant will be used from worker config
	 * 
	 * @param {*} request 
	 * @returns Resized image
	 */
	async fetch(request) {

		const url = new URL(request.url);
		const imageURL = url.searchParams.get("img");
		let variant = url.searchParams.get("variant");
		
		if (!variant) {
			variant = IMAGE_VARIANT;
		}

		if (!imageURL) {
			return new Response('Missing "img" value', { status: 400 });
		}

		const { pathname } = new URL(imageURL);
		if (!/\.(jpe?g|png|gif|webp)$/i.test(pathname)) {
		  	return new Response("Disallowed file extension", { status: 400 });
		}

		const cfImageDelivery = "https://imagedelivery.net/" + PUBLISH_IMAGE_ACCOUNT_HASH + "/";
		const cfapi = "https://api.cloudflare.com/client/v4/accounts/" + PUBLISH_IMAGE_ACCOUNT_ID + "/images/v1";
		const headers = { "Authorization": "Bearer " + API_TOKEN };
		const method = "POST";
		const body = new FormData();
		body.append("url", imageURL);
		body.append("requireSignedURLs", "false");
		const imageRequest = new Request(cfapi, { method, headers, body });

		const response = await fetch(imageRequest);
		const json = await response.json();
		return fetch(cfImageDelivery + json.result.id + "/" + variant);

	},
};
