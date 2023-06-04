import { fetchAnimesResponse } from '../API/API';

export const mockAnimes: Omit<fetchAnimesResponse, 'pagination'> = {
  data: [
    {
      mal_id: 54101,
      url: 'https://myanimelist.net/anime/54101/Crater_no_Naru_Ki',
      images: {
        jpg: {
          image_url: 'https://cdn.myanimelist.net/images/anime/1109/132382.jpg',
          small_image_url: 'https://cdn.myanimelist.net/images/anime/1109/132382t.jpg',
          large_image_url: 'https://cdn.myanimelist.net/images/anime/1109/132382l.jpg',
        },
        webp: {
          image_url: 'https://cdn.myanimelist.net/images/anime/1109/132382.webp',
          small_image_url: 'https://cdn.myanimelist.net/images/anime/1109/132382t.webp',
          large_image_url: 'https://cdn.myanimelist.net/images/anime/1109/132382l.webp',
        },
      },
      trailer: {
        youtube_id: null,
        url: null,
        embed_url: null,
        images: {
          image_url: null,
          small_image_url: null,
          medium_image_url: null,
          large_image_url: null,
          maximum_image_url: null,
        },
      },
      approved: true,
      titles: [
        {
          type: 'Default',
          title: 'Crater no Naru Ki',
        },
        {
          type: 'Japanese',
          title: 'クレーターのなる木',
        },
        {
          type: 'English',
          title: 'A Piper',
        },
      ],
      title: 'Crater no Naru Ki',
      title_english: 'A Piper',
      title_japanese: 'クレーターのなる木',
      title_synonyms: [],
      type: 'Movie',
      source: 'Original',
      episodes: 1,
      status: 'Finished Airing',
      airing: false,
      aired: {
        from: '1987-01-01T00:00:00+00:00',
        to: null,
        prop: {
          from: {
            day: 1,
            month: 1,
            year: 1987,
          },
          to: {
            day: null,
            month: null,
            year: null,
          },
        },
        string: '1987',
      },
      duration: '3 min',
      rating: 'G - All Ages',
      score: null,
      scored_by: null,
      rank: 18568,
      popularity: 21073,
      members: 68,
      favorites: 0,
      synopsis: 'A strange piper makes following spirits a mysterious blossom.',
      background: null,
      season: null,
      year: null,
      broadcast: {
        day: null,
        time: null,
        timezone: null,
        string: null,
      },
      producers: [],
      licensors: [],
      studios: [],
      genres: [
        {
          mal_id: 5,
          type: 'anime',
          name: 'Avant Garde',
          url: 'https://myanimelist.net/anime/genre/5/Avant_Garde',
        },
        {
          mal_id: 10,
          type: 'anime',
          name: 'Fantasy',
          url: 'https://myanimelist.net/anime/genre/10/Fantasy',
        },
      ],
      explicit_genres: [],
      themes: [
        {
          mal_id: 19,
          type: 'anime',
          name: 'Music',
          url: 'https://myanimelist.net/anime/genre/19/Music',
        },
      ],
      demographics: [],
    },
  ],
};
