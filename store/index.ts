import config from 'config'
import { Module } from 'vuex'

export const module: Module<any, any> = {
  namespaced: true,
  state: {},
  actions: {
    search ({ commit, state }, query): Promise<Response> {
      return new Promise((resolve, reject) => {
        return fetch(config.algolia.endpoint, {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ params: query })
        }).then(res => {
          resolve(res.json())
        }).catch((err) => {
          reject(err)
        })
      })
    }
  }
}
