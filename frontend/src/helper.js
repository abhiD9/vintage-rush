export const getApiBaseUrl = () => {
    if (process.env.REACT_APP_HOST_ENV === 'development') {
      return process.env.REACT_APP_API_DEVELOPMENT;
    } else if (process.env.REACT_APP_HOST_ENV === 'production') {
      return process.env.REACT_APP_API_PRODUCTION;
    }
    return process.env.REACT_API_API_BASE;
  }