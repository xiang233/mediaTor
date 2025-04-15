export const categoryList = ["Movie", "TV", "Book", "Manga", "Anime"];

export const categoryObj = {
  Movie: false,
  Book: false,
  Manga: false,
  Anime: false,
  
};

export const categoryAPI = {
  Movie: {
    url: "https://api.themoviedb.org/3/search/movie/",
    params: { page: 1, include_adult:true, api_key:"63fe6eb1ebbae26037e0c43eca54441b" },
    queryParamName: "query",
    dataPath: ["data.results"],
    toCard: {
      subheader: "release_date",
      title: "original_title",
      secondary: "title",
      picture: "poster_path",
      additional: {
        key: "tmdb_img_url"
      }
    },
  },
  TV: {
    url: "https://api.themoviedb.org/3/search/tv/",
    params: { page: 1, include_adult:true, api_key:"63fe6eb1ebbae26037e0c43eca54441b" },
    queryParamName: "query",
    dataPath: ["data.results"],
    toCard: {
      subheader: "first_air_date",
      title: "original_name",
      secondary: "name",
      picture: "poster_path",
      additional: {
        key: "tmdb_img_url"
      }
    },
  },
  Porn: {
    url: "https://quality-porn.p.rapidapi.com/search",
    params: { page: 1, timeout: 100},
    queryParamName: "query",
    headersObj: {
        headers: {
      "X-RapidAPI-Key": "a38f60ab16mshb8a413babaeaa33p13c724jsnb1a30d2bb99d",
      "X-RapidAPI-Host": "quality-porn.p.rapidapi.com",
        }
    },
    dataPath: [
      "data.data.0.links",
      "data.data.1.links",
      "data.data.2.links",
      "data.data.3.links",
      "data.data.4.links",
      "data.data.5.links",
      "data.data.6.links",
      "data.data.7.links",
    ],
    toCard: {
      subheader: "duration",
      title: "title",
      picture: "image",
    },
  },
  Book: {
    url: "https://api.consumet.org/books/s",
    params: { page: 1 },
    queryParamName: "bookTitle",
    dataPath: ["data.result"],
    toCard: {
      subheader: "year",
      title: "title",
      picture: "image",
    },
  },

  Manga: {
    isGraphQL: true,
    url: "https://api.consumet.org/manga/mangadex/",
    query: `query ($search: String, $type: MediaType) {
        Page(page: 1, perPage: 15) {
          media(search: $search, type: $type) {
            id
            startDate {
              year
            }
            title {
              romaji
              english
              native
            }
            image: coverImage {
              medium
            }
          }
        }
      }
      
      `,
    variables: {
      type: "MANGA",
    },
    dataPath: ["data.data.Page.media"],
    toCard: {
      subheader: "startDate.year",
      title: "title.native",
      secondary: "title.english",
      picture: "image.medium",
    },
  },
  Anime: {
    isGraphQL: true,
    url: "https://api.consumet.org/meta/anilist/advanced-search",
    query: `query ($search: String, $type: MediaType) {
        Page(page: 1, perPage: 15) {
          media(search: $search, type: $type) {
            id
            startDate {
              year
            }
            title {
              romaji
              english
              native
            }
            image: coverImage {
              medium
            }
          }
        }
      }
      
      `,
    variables: {
      type: "ANIME",
    },
    dataPath: ["data.data.Page.media"],
    toCard: {
      subheader: "startDate.year",
      title: "title.native",
      secondary: "title.english",
      picture: "image.medium",
    },
  },
};



export const categoryFieldPaths = {
    Movie: {
      url: "https://api.themoviedb.org/3/search/movie/",
      params: { page: 1, include_adult:true, api_key:"63fe6eb1ebbae26037e0c43eca54441b" },
      queryParamName: "query",
      dataPath: ["data.results"],
      toCard: {
        subheader: "release_date",
        title: "original_title",
        secondary: "title",
        picture: "poster_path",
        additional: {
          key: "tmdb_img_url"
        }
      },
    },
    TV: {
      url: "https://api.themoviedb.org/3/search/tv/",
      params: { page: 1, include_adult:true, api_key:"63fe6eb1ebbae26037e0c43eca54441b" },
      queryParamName: "query",
      dataPath: ["data.results"],
      toCard: {
        subheader: "first_air_date",
        title: "original_name",
        secondary: "name",
        picture: "poster_path",
        additional: {
          key: "tmdb_img_url"
        }
      },
    },
    Porn: {
      url: "https://quality-porn.p.rapidapi.com/search",
      params: { page: 1, timeout: 5000},
      queryParamName: "query",
      headersObj: {
          headers: {
        "X-RapidAPI-Key": "a38f60ab16mshb8a413babaeaa33p13c724jsnb1a30d2bb99d",
        "X-RapidAPI-Host": "quality-porn.p.rapidapi.com",
          }
      },
      dataPath: [
        "data.data.0.links",
        "data.data.1.links",
        "data.data.2.links",
        "data.data.3.links",
        "data.data.4.links",
        "data.data.5.links",
        "data.data.6.links",
        "data.data.7.links",
      ],
      toCard: {
        subheader: "duration",
        title: "title",
        picture: "image",
      },
    },
    Book: {
      url: "https://api.consumet.org/books/s",
      params: { page: 1 },
      queryParamName: "bookTitle",
      dataPath: ["data.result"],
      toCard: {
        subheader: "year",
        title: "title",
        picture: "image",
      },
    },
  
    Manga: {
      isGraphQL: true,
      url: "https://api.consumet.org/manga/mangadex/",
      query: `query ($search: String, $type: MediaType) {
          Page(page: 1, perPage: 15) {
            media(search: $search, type: $type) {
              id
              startDate {
                year
              }
              title {
                romaji
                english
                native
              }
              image: coverImage {
                medium
              }
            }
          }
        }
        
        `,
      variables: {
        type: "MANGA",
      },
      dataPath: ["data.data.Page.media"],
      toCard: {
        subheader: "startDate.year",
        title: "title.native",
        secondary: "title.english",
        picture: "image.medium",
      },
    },
    Anime: {
      isGraphQL: true,
      url: "https://api.consumet.org/meta/anilist/advanced-search",
      query: `query ($search: String, $type: MediaType) {
          Page(page: 1, perPage: 15) {
            media(search: $search, type: $type) {
              id
              startDate {
                year
              }
              title {
                romaji
                english
                native
              }
              image: coverImage {
                medium
              }
            }
          }
        }
        
        `,
      variables: {
        type: "ANIME",
      },
      dataPath: ["data.data.Page.media"],
      toCard: {
        subheader: "startDate.year",
        title: "title.native",
        secondary: "title.english",
        picture: "image.medium",
      },
    },
  };
  