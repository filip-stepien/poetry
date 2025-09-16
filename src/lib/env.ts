import z from 'zod';

const envSchema = z.object({
    PAYLOAD_SECRET: z.string().min(1),
    BASE_URL: z.string().transform(url => (url.endsWith('/') ? url.slice(0, -1) : url)) // ensure the URL does not end with a slash
});

export type Env = z.infer<typeof envSchema>;

function parseEnv(): Env {
    try {
        return envSchema.parse(process.env);
    } catch (err) {
        if (err instanceof z.ZodError) {
            console.error('Invalid environment variables:');

            err.issues.forEach(e => {
                console.error(`${e.path.join('.')}: ${e.message}`);
            });

            process.exit(1);
        }

        throw err;
    }
}

export const env = parseEnv();
