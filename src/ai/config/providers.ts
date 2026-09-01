const API_KEY_ENV_VARS = ['OPENAI_API_KEY', 'ANTHROPIC_API_KEY', 'GOOGLE_API_KEY'];

export function hasApiKey(): boolean {
    return API_KEY_ENV_VARS.some((k) => Boolean(process.env[k]));
}
