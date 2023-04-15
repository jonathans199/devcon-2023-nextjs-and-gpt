import * as React from 'react'
import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
	const [loading, setLoading] = React.useState<boolean>(false)
	const [userCode, setUserCode] = React.useState<string>('')
	const [gptResponse, setGptResponse] = React.useState<any>([])

	const handleTextInput = (e: React.FormEvent<string>) => {
		setUserCode(e.target.value)
	}

	const handleCodeSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		setLoading(true)
		setGptResponse({})
		e.preventDefault()
		const res = await fetch(`/api/image`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(userCode),
		})

		const data = await res.json()

		setGptResponse(data)
		setLoading(false)
	}

	function Spinner() {
		return (
			<span className='w-full flex justify-center items-center'>
				<span className='animate-spin relative flex h-10 w-10 rounded-lg bg-red-600 opacity-75'></span>
			</span>
		)
	}

	return (
		<main className='flex min-h-screen flex-col items-center justify-between p-24'>
			<section>
				<div className='mx-auto max-w-screen-xl px-4 py-8 sm:py-12 sm:px-6 lg:py-16 lg:px-8'>
					<div className='grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16'>
						<div className='relative h-64 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full'>
							{loading && <Spinner />}

							{gptResponse[0] && (
								<img alt='Party' src={gptResponse[0].url} className='absolute inset-0 h-full w-full object-cover' />
							)}
						</div>

						<div className='lg:py-24'>
							<h2 className='text-3xl font-bold sm:text-4xl'>Generate an Image</h2>
							<div>
								<label className='sr-only'>Message</label>

								<textarea
									className='w-full rounded-lg border-gray-200 p-3 text-sm text-gray-500'
									onChange={(e: any) => handleTextInput(e)}
									placeholder='Message'
									id='message'></textarea>
							</div>

							<p className='mt-4 text-gray-600'>
								This is new app that uses artificial intelligence to create stunning images from text descriptions.
								Simply type in a description of the image you want to create, and the app will use its AI technology to
								bring your vision to life.
							</p>
							{gptResponse.content && (
								<>
									<h2 className='font-extrabold text-red-700 sm:block'>Explanation here: </h2>
									<p className='text-left '>{gptResponse.content}</p>
								</>
							)}

							<button
								className='block w-full rounded bg-red-600 px-12 py-3 my-3 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto'
								// type='submit'
								onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleCodeSubmit(e)}>
								send
							</button>
						</div>
					</div>
				</div>
			</section>
		</main>
	)
}
