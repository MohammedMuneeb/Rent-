import * as prismic from '@prismicio/client'
import * as prismicNext from '@prismicio/next'
import { config } from "../services/config.service";
import sm from './sm.json'

/**
 * The project's Prismic repository name.
 */
const prismicAPI =  config.prismicApiEndPoint?.toString();

export const repositoryName = prismic.getRepositoryName(prismicAPI)

// Update the routes array to match your project's route structure
/** @type {prismic.ClientConfig['routes']} **/
const routes = [
  {
    type: 'homepage',
    path: '/',
  },
  {
    type: 'page',
    path: '/:uid',
  },
]

/**
 * Creates a Prismic client for the project's repository. The client is used to
 * query content from the Prismic API.
 *
 * @param config {prismicNext.CreateClientConfig} - Configuration for the Prismic client.
 */
export const createClient = (config = {}) => {
  const client = prismic.createClient(prismicAPI, {
    routes,
    ...config,
  })

  prismicNext.enableAutoPreviews({
    client,
    previewData: config.previewData,
    req: config.req,
  })

  return client
}