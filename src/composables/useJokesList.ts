import { ref, computed } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { request, gql } from 'graphql-request'

interface JokeType {
  _id: string
  name: string
}

interface Joke {
  _id: string
  setup: string
  punchline: string
  rating: number
  type: JokeType
}

interface JokesResponse {
  jokes: {
    items: Joke[]
    totalItems: number
    page: number
    totalPages: number
  }
}

interface UseJokesParams {
  page: number
  limit: number
  sortBy: string
  sortOrder: 'asc' | 'desc'
  onlyJokeType?: string // Nuevo parámetro opcional
}

const API_URL = import.meta.env.VITE_API_URL

const jokesQuery = gql`
  query GetJokes(
    $page: Int!
    $limit: Int!
    $sortBy: String!
    $sortOrder: String!
    $onlyJokeType: String
  ) {
    jokes(
      page: $page
      limit: $limit
      sortBy: $sortBy
      sortOrder: $sortOrder
      onlyJokeType: $onlyJokeType
    ) {
      items {
        _id
        setup
        punchline
        rating
        type {
          _id
          name
        }
      }
      totalItems
      page
      totalPages
    }
  }
`

export default function useJokesList(params: UseJokesParams) {
  const pageRef = ref(params.page)
  const limitRef = ref(params.limit)
  const sortByRef = ref(params.sortBy)
  const sortOrderRef = ref(params.sortOrder)
  const onlyJokeTypeRef = ref(params.onlyJokeType)

  const { isRefetching, data, isLoading, isError, error, refetch } = useQuery<JokesResponse>({
    queryKey: ['jokes', pageRef, limitRef, sortByRef, sortOrderRef, onlyJokeTypeRef],
    queryFn: () =>
      request(API_URL, jokesQuery, {
        page: pageRef.value,
        limit: limitRef.value,
        sortBy: sortByRef.value,
        sortOrder: sortOrderRef.value,
        onlyJokeType: onlyJokeTypeRef.value
      }),
    staleTime: 60000,
    retry: 2
  })

  const lastTotalPages = ref(0)
  const jokes = computed(() => data.value?.jokes.items || [])
  const totalItems = computed(() => data.value?.jokes.totalItems || 0)
  const totalPages = computed(() => {
    if (data.value?.jokes.totalPages) {
      lastTotalPages.value = data.value?.jokes.totalPages
      return data.value?.jokes.totalPages
    } else {
      return lastTotalPages.value
    }
  })

  const nextPage = () => {
    if (pageRef.value < totalPages.value) {
      pageRef.value++
    }
  }

  const prevPage = () => {
    if (pageRef.value > 1) {
      pageRef.value--
    }
  }

  return {
    jokes,
    isLoading,
    isRefetching,
    isError,
    error,
    refetch,
    nextPage,
    prevPage,
    totalPages,
    totalItems,
    currentPage: pageRef,
    sortBy: sortByRef,
    sortOrder: sortOrderRef,
    onlyJokeType: onlyJokeTypeRef
  }
}
