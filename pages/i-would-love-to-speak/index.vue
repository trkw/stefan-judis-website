<template>
  <div class="t-container">
    <Container accessible-line-length="true">
      <h1 slot="headline" tabindex="-1">Hey there! 👋</h1>
      <p>
        In case you're considering to let me speak at your event you probably need some information.
        First of all, I'm really happy about any invitation to speak somewhere... so <strong>thank you!</strong>
      </p>
      <p>
        You can find slides and recordings of my recent talks in the <a href="/talks/">speak section</a>.
      </p>
      <p>
        But here we go with some basic information:
      </p>
      <dl>
        <dt>
          Short bio:
        </dt>
        <dd>
          <Marked :markdown="speakerInfo.fields.shortBio"></Marked>
        </dd>
        <dt>
          Favorite talk topics:
        </dt>
        <dd>
          {{ speakerInfo.fields.favoriteTopics.join(', ') }}
        </dd>
        <dt>
          Images:
        </dt>
        <dd>
          <ul class="o-list-thirds">
            <li v-for="image in speakerInfo.fields.images" class="u-marginBottomLarge">
              <div class="u-flex-column u-height-100">
                <!-- this is container is needed because of a FF bug -->
                <div>
                  <a :href="image.fields.file.url">
                    <lazy-image :asset="image" :ratio="0.65"></lazy-image>
                  </a>
                </div>
              </div>
            </li>
          </ul>
        </dd>
        <dt>
          Past talks:
        </dt>
        <dd>
          <ul>
            <li v-for="event in events">
              <a :href="event.fields.website">{{ event.fields.name }}</a>
            </li>
          </ul>
        </dd>
        <dt>
          Technical equipment:
        </dt>
        <dd>
          <ul>
            <li v-for="tech in speakerInfo.fields.technicalEquipment">
              {{ tech }}
            </li>
          </ul>
        </dd>
        <dt>
          Additional info:
        </dt>
        <dd>
          <ul>
            <li v-for="pref in speakerInfo.fields.preferences">
              {{ pref }}
            </li>
          </ul>
        </dd>
      </dl>
    </Container>
  </div>
</template>

<script>
  import Container from '~/components/Container.vue'
  import {createClient} from '~/plugins/contentful.js'
  import Marked from '~/components/Marked.vue'
  import LazyImage from '~/components/LazyImage.vue'

  const client = createClient()

  export default {
    asyncData ({ env }) {
      return Promise.all([
        client.getEntries({
          'sys.id': env.CTF_ME_ID
        }),
        client.getEntries({
          content_type: env.CTF_EVENT_ID,
          order: '-fields.end',
          'fields.state[in]': 'attending,accepted,teaching',
          'fields.end[lte]': (new Date()).toISOString(),
          'fields.state': 'accepted'
        })
      ]).then(([me, events]) => {
        return {
          speakerInfo: me.items[0].fields.speakerInformation,
          events: events.items
        }
      })
    },
    head () {
      return {
        title: `Stefan Judis Web Development - Speaker information`,
        meta: [
          { hid: 'description', name: 'description', content: `You want me to speak at your event? Great - here is some basic information` }
        ]
      }
    },
    components: {
      Container,
      Marked,
      LazyImage
    }
  }
</script>

<style scoped>
  dt {
    font-size: 1.5em;
    font-family: Georgia,serif;
    padding: .5em 0;
  }

  dd {
    margin: .5em 0;
  }
</style>
