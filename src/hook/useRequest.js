import { useEffect, useState } from 'react'

// eslint-disable-next-line import/no-anonymous-default-export
export default function (request) {
	const [data, setData] = useState(null)
	const [loding, setLoding] = useState(null)
	const [error, setError] = useState(null)

	useEffect(() => {
		setLoding(true)
        setTimeout(() => {
					request()
						.then(response => setData(response.data))
						.catch(error => setError(error))
						.finally(() => setLoding(false))
				},1000)
	}, [])

    return [data,loding,error]
}
