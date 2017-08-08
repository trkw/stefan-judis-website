<template>
  <Container>
    <h1 slot="headline">Talks</h1>
    <h2>Upcoming events</h2>
    <ul class="o-list-thirds">
      <li v-for="event in events">
        <pretty-date :date="event.fields.start"></pretty-date>
        <p class="u-inline-block">
          <flag :code="event.fields.country"/>
          {{ event.fields.city }}
        </p>
        <h3 class="o-headline-3"><a :href="event.fields.website">{{event.fields.name}}</a></h3>
      </li>
    </ul>
    <h2>Slidedecks</h2>
    <ul class="o-list-thirds">
      <li v-for="talk in talks" class="u-marginBottomLarge">
        <div class="u-flex-column u-height-100">
          <lazy-image :asset="talk.fields.thumbnail" ></lazy-image>
          <h3>{{ talk.fields.title }}</h3>
          <p class="u-marginTopAuto">
            <a v-if="talk.fields.slideUrl" :href="talk.fields.slideUrl" class="o-btn o-btn--small u-marginRightSmall">Slides</a>
            <a v-if="talk.fields.videoUrl" :href="talk.fields.videoUrl" class="o-btn o-btn--small">Recording</a>
          </p>
        </div>
      </li>
    </ul>
  </Container>
</template>

<script>
  import Container from '~/components/Container.vue'
  import Flag from '~/components/Flag.vue'
  import LazyImage from '~/components/LazyImage.vue'
  import PrettyDate from '~/components/PrettyDate.vue'
  import {createClient} from '~/plugins/contentful.js'

  const client = createClient()

  export default {
    asyncData ({ env }) {
      return Promise.all([
        client.getEntries({
          content_type: env.CTF_TALK_ID,
          order: '-fields.date'
        }),
        client.getEntries({
          content_type: env.CTF_EVENT_ID,
          order: 'fields.end',
          'fields.state[in]': 'attending,accepted,teaching',
          'fields.end[gte]': (new Date()).toISOString()
        })
      ]).then(([talks, events]) => {
        return {
          talks: talks.items,
          events: events.items
        }
      }).catch(console.error)
    },
    head () {
      return {
        title: `Talks | Stefan Judis Web Development`,
        meta: [
          { hid: 'description', name: 'description', content: `Listing of my upcoming events and talks` }
        ]
      }
    },
    components: {
      Container,
      Flag,
      LazyImage,
      PrettyDate
    }
  }
</script>