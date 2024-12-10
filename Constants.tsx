const prod = {
  url: {
    API_BACKEND_SPRING: 'http://localhost:8080',
    API_BACKEND_DJANGO: 'http://localhost:8000',
  }
}

const dev = {
  url: {
    API_BACKEND_SPRING: 'http://159.203.186.177:8080',
    API_BACKEND_DJANGO: 'http://localhost:8000',
  }
}

export const config = process.env.NODE_ENV === 'development' ? dev : prod;