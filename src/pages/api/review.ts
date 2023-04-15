import type { NextApiRequest, NextApiResponse } from 'next'
import { Configuration, OpenAIApi, ChatCompletionResponseMessage } from 'openai'

const configuration = new Configuration({ apiKey: process.env.GPT_API_KEY })
const openai = new OpenAIApi(configuration)

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ChatCompletionResponseMessage | undefined>
) {
	openai
		.createChatCompletion({
			model: 'gpt-3.5-turbo',
			messages: [{ role: 'user', content: `write a review with these details:  ${req.body}` }],
		})
		.then(response => res.status(200).send(response.data.choices[0].message))
		.catch(err => console.error(err))
}
