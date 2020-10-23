# This is Algolia Search module for Vue Storefront.

Demo integration to _SearchPanel_:

![Results preview](https://i.imgur.com/yZzvaE8.png)

## Frontend setup

`storefront/src/modules/index.ts`

```javascript
import { Algolia } from '../modules/algolia-search'

export const registerModules: VueStorefrontModule[] = [
  [...],
  Algolia
]
```

`storefront/src/themes/default/components/core/blocks/SearchPanel/SearchPanel.vue`

Setup the new path to `SearchPanel`:

```javascript
// import SearchPanel from '@vue-storefront/core/compatibility/components/blocks/SearchPanel/SearchPanel'
import SearchPanel from 'src/modules/algolia-search/components/SearchPanel'
```

## API setup

Install package to API:

```bash
cd ../vue-storefront-api
yarn add -W algoliasearch
```

Install extension to `vue-storefront-api`:

```bash
cp -fr src/modules/algolia-search/api/algolia ../vue-storefront-api/src/api/extensions/
```

Update setting in configuration:

`./config/default.json`

```json
"registeredExtensions": [
    [...],
    "algolia"
  ],
]

"extensions": {
    [...],
    "algolia": {
      "appId": "application-id",
      "apiKey": "application-key",
      "index": "algolia-products-index"
    },
    [...]
}
```

## Setup the Algolia access (ACL) in Algolia admin panel

Go to `Api Keys` -> `All Api Keys` -> `Select actual Api Key`.

![Access setup](https://i.imgur.com/8tBUgzf.png)
