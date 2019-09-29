import SearchPanel from '@vue-storefront/core/compatibility/components/blocks/SearchPanel/SearchPanel'

export default {
  mixins: [SearchPanel],
  data () {
    return {
      page: 0
    }
  },
  methods: {
    async makeSearch () {
      if (this.search !== '' && this.search !== undefined) {
        this.page = 0
        this.readMore = true
        const resp = await this.$store.dispatch('algolia/search', {
          query: this.search,
          hitsPerPage: this.size
        })
        this.products = resp.items
        this.page = this.page + 1
        this.emptyResults = resp.items.length < 1
      } else {
        this.products = []
        this.emptyResults = false
      }
    },
    async seeMore () {
      if (this.search !== '' && this.search !== undefined) {
        const resp = await this.$store.dispatch('algolia/search', {
          query: this.search,
          hitsPerPage: this.size,
          page: this.page
        })
        console.log(this.page, resp.totalPages)
        if (this.page === resp.totalPages) {
          this.readMore = false
        }
        this.page = this.page + 1
        this.products = this.products.concat(resp.items)
        this.emptyResults = resp.items.length < 1
      } else {
        this.products = []
        this.emptyResults = false
      }
    }
  }
}
