import type { NextApiRequest, NextApiResponse } from 'next'
import { Configuration, OpenAIApi, ChatCompletionResponseMessage } from 'openai'

const configuration = new Configuration({ apiKey: process.env.GPT_API_KEY })
const openai = new OpenAIApi(configuration)

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ChatCompletionResponseMessage | undefined>
) {
	openai
		.createImage({
			prompt: req.body,
			n: 1,
			size: '512x512',
		})
		.then((response: any) => res.status(200).send(response.data.data))
		.catch(err => console.error(err))
}
