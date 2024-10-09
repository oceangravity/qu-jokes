import { computed } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { request, gql } from 'graphql-request'

export interface JokeType {
  _id: string
  name: string
}

const API_URL = import.meta.env.VITE_API_URL

const jokeTypesQuery = gql`
  query GetJokeTypes {
    jokeTypes {
      _id
      name
    }
  }
`

export default function useJokesTypesList() {
  const {
    data: jokeTypesData,
    isLoading: isLoadingJokeTypes,
    refetch
  } = useQuery<{
    jokeTypes: JokeType[]
  }>({
    queryKey: ['jokeTypes'],
    queryFn: () => request(API_URL, jokeTypesQuery),
    staleTime: 300000, // 5 minutes
    retry: 2,
    enabled: false
  })

  const jokeTypes = computed(() => jokeTypesData.value?.jokeTypes || [])

  const getJokeTyoes = async () => {
    await refetch()
  }

  return {
    jokeTypes,
    refetchTypes: refetch,
    isLoadingJokeTypes,
    getJokeTyoes
  }
}
