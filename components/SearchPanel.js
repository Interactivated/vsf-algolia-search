import SearchPanel from '@vue-storefront/core/compatibility/components/blocks/SearchPanel/SearchPanel'

export default {
  mixins: [SearchPanel],
  methods: {
    async makeSearch () {
      if (this.search !== '' && this.search !== undefined) {
        const resp = await this.$store.dispatch('algolia/search', { query: this.search })
        this.products = resp.items
        this.emptyResults = resp.items.length < 1
      } else {
        this.products = []
        this.emptyResults = false
      }
    }
  }
}
