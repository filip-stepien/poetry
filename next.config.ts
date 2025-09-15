import type { NextConfig } from 'next';
import { withPayload } from '@payloadcms/next/withPayload';

const nextConfig: NextConfig = {
    experimental: {
        reactCompiler: false
    },
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: '*'
            }
        ]
    }
};

export default withPayload(nextConfig);
