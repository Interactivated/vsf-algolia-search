import { createModule } from '@vue-storefront/core/lib/module'
import { module } from './store'

export const KEY = 'algolia'

export const Algolia = createModule({
  key: KEY,
  store: { modules: [{ key: KEY, module }] },
})