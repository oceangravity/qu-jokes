import { QueryClient } from '@tanstack/vue-query'

// Configura el QueryClient con opciones predeterminadas
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutos
      cacheTime: 1000 * 60 * 10, // 10 minutos
      retry: 2 // Reintentar 2 veces en caso de fallo
    }
  }
})
