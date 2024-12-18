import { z } from 'zod'


const envSchema = z.object({
    EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().trim().min(1),
    EXPO_PUBLIC_SUPABASE_URL: z.string().min(1,"EXPO_PUBLIC_SUPABASE_URL is required"),
    EXPO_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1,"EXPO_PUBLIC_SUPABASE_ANON_KEY is required")
})

const _env = envSchema.safeParse(process.env)

if(_env.success === false){
    console.error('Variaveis de ambiente invalidas', _env.error.format())

    throw new Error('variaveis de ambiente invalidas.')
}

export const env = _env.data