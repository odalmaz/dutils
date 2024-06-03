import { HTTPException } from 'hono/http-exception';
import { StatusCode } from 'hono/utils/http-status';

export const AZException = (message: string, statusCode: StatusCode = 400) => {
	throw new HTTPException(statusCode, { message });
};
