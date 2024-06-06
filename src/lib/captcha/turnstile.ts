interface TokenValidateResponse {
	'error-codes': string[];
	success: boolean;
	action: string;
	cdata: string;
}

export async function validateTurnstileToken(token: string, secret_key: string, dev = false) {
	const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
		method: 'POST',
		headers: {
			'content-type': 'application/json'
		},
		body: JSON.stringify({
			response: token,
			secret: dev ? '1x0000000000000000000000000000000AA' : secret_key
		})
	});

	const data: TokenValidateResponse = await response.json();

	return {
		// Return the status
		success: data.success,
		// Return the first error if it exists
		error: data['error-codes']?.length ? data['error-codes'][0] : null
	};
}
