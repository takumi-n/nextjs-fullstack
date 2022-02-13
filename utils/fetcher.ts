import type { AnySchema, InferType } from 'yup';
import { getEnv } from './env';
import { ResponseError } from './responseError';
import type { HTTPMethod } from './types';

type FetcherConfig<Schema extends AnySchema | null> = {
  readonly method: HTTPMethod;
  readonly schema: Schema;
  readonly body?: object;
  readonly config?: RequestInit;
};

export async function fetcher<Schema extends null>(
  path: string,
  { method, body, config, schema }: FetcherConfig<Schema>
): Promise<null>;

export async function fetcher<Schema extends AnySchema>(
  path: string,
  { method, body, config, schema }: FetcherConfig<Schema>
): Promise<InferType<Schema>>;

export async function fetcher<Schema extends AnySchema | null>(
  path: string,
  { method, body, config, schema }: FetcherConfig<Schema>
) {
  const NEXT_PUBLIC_BASE_URL = process.env['NEXT_PUBLIC_BASE_URL'];
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${path}`, {
      //
      ...config,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      method,
      ...(body && { body: JSON.stringify(body) }),
    });

    if (!response.ok) {
      throw new ResponseError(response.statusText, response.status);
    }

    if (!schema) {
      return null;
    }

    const data = await response.json();
    return schema.cast(data);
  } catch (err) {
    console.error(err);

    if (err instanceof ResponseError) {
      throw err;
    }
    throw new ResponseError('Something went wrong during fetching!');
  }
}

//'Content-Type': 'application/json',
