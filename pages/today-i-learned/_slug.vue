<template>
  <main class="t-container">
    <article>
      <Container accessible-line-length="true">
        <ItemPreview :item="post" :show-body="true" :show-video="true" :show-date="true" :level="1"></ItemPreview>
        <Disqus></Disqus>
      </Container>
    </article>
    <SharingLine :item="post"></SharingLine>
  </main>
</template>

<script>
  import Container from '~/components/Container.vue'
  import Disqus from '~/components/Disqus.vue'
  import Marked from '~/components/Marked.vue'
  import PrettyDate from '~/components/PrettyDate.vue'
  import SharingLine from '~/components/SharingLine.vue'
  import ItemPreview from '~/components/ItemPreview.vue'
  import {createClient} from '~/plugins/contentful.js'
  import getTransition from '~/plugins/transition.js'

  const client = createClient()

  export default {
    asyncData ({ params, env }) {
      return client.getEntries({
        'content_type': env.CTF_TIL_ID,
        'fields.slug': params.slug
      }).then(entries => {
        return {
          post: entries.items[0]
        }
      }).catch(console.error)
    },
    head () {
      return {
        title: this.post.fields.title,
        meta: [
          { hid: 'description', name: 'description', content: this.post.fields.description }
        ]
      }
    },
    transition (to, from) {
      return getTransition(from, to)
    },
    components: {
      Container,
      Disqus,
      Marked,
      PrettyDate,
      SharingLine,
      ItemPreview
    }
  }
</script>

<style>

</style>
