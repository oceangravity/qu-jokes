import { request, gql } from 'graphql-request'

const API_URL = import.meta.env.VITE_API_URL

const deleteJokeMutation = gql`
  mutation DeleteJoke($id: ID!) {
    deleteJoke(id: $id)
  }
`

interface CreateJokeInput {
  typeId: string
  setup: string
  punchline: string
  rating: number
}

const createJokeMutation = gql`
  mutation CreateJoke($input: CreateJokeInput!) {
    createJoke(input: $input) {
      _id
      setup
      punchline
      rating
      type {
        _id
        name
      }
    }
  }
`

const updateJokeRatingMutation = gql`
  mutation IncrementJokeRating($id: ID!) {
    incrementJokeRating(id: $id) { 
      _id
      rating
    }
  }
`

export default function useJokesAction() {
  const deleteJoke = async (id: string) => {
    try {
      await request(API_URL, deleteJokeMutation, { id })
    } catch (error) {
      console.error('Error deleting joke:', error)
      throw error
    }
  }

  const createJoke = async (input: CreateJokeInput) => {
    try {
      await request(API_URL, createJokeMutation, { input })
    } catch (error) {
      console.error('Error creating joke:', error)
      throw error
    }
  }

  const incrementJokeRating = async (id: string) => {
    try {
      await request(API_URL, updateJokeRatingMutation, { id }) // Asegúrate de que el id se pase correctamente
    } catch (error) {
      console.error('Error incrementing joke rating:', error)
      throw error
    }
  }

  return {
    deleteJoke,
    createJoke,
    incrementJokeRating
  }
}
