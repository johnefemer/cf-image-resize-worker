# Cloudflare Worker Script to Resize Image

Worker script to resize image from dynamic url passed via query.

Learn more about Cloudflare worker
https://developers.cloudflare.com/workers/


Learn more about Cloudflare Image API
https://developers.cloudflare.com/images/cloudflare-images/transform/resize-images/

## How to run

Install Cloudflare Worker CLI to run and publish this script.

- to install wrangler `npm install -g wrangler`
- login to cloudflare account `wrangler login`
- start your worker project `wrangler init cf-image-resize-worker`
- to run dev `wrangler dev`
- to publish worker `wrangler publish --name cf-image-resize-worker`

You can find more details on wrangler cli
https://developers.cloudflare.com/workers/get-started/guide/

