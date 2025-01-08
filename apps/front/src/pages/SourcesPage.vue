<template>
  <div class="q-pa-md">
    <!-- Learn about Quasar grid system -->
    <div class="row q-col-gutter-md">
      <!-- Learn about Quasar's responsive classes -->
      <div class="col-12 col-md-8">
        <q-card>
          <q-card-section>
            <div class="row items-center justify-between">
              <h2 class="text-h5 q-my-none">
                RSS Sources
              </h2>
              <q-btn
                color="primary"
                icon="add"
                label="Add Source"
                @click="showAddDialog = true"
              />
            </div>
          </q-card-section>

          <!-- Learn about Quasar's list components -->
          <q-list separator>
            <q-item
              v-for="source in sources"
              :key="source.id"
            >
              <q-item-section>
                <q-item-label>{{ source.name }}</q-item-label>
                <q-item-label caption>
                  {{ source.url }}
                </q-item-label>
              </q-item-section>

              <q-item-section side>
                <div class="row items-center q-gutter-sm">
                  <q-chip 
                    :color="source.active ? 'positive' : 'grey'" 
                    text-color="white" 
                    size="sm"
                  >
                    {{ source.active ? 'Active' : 'Inactive' }}
                  </q-chip>
                  <q-btn
                    flat
                    round
                    dense
                    color="grey"
                    icon="more_vert"
                  >
                    <q-menu>
                      <q-list style="min-width: 100px">
                        <q-item
                          v-close-popup
                          clickable
                          @click="editSource(source)"
                        >
                          <q-item-section>Edit</q-item-section>
                        </q-item>
                        <q-item
                          v-close-popup
                          clickable
                          @click="toggleSource(source)"
                        >
                          <q-item-section>
                            {{ source.active ? 'Deactivate' : 'Activate' }}
                          </q-item-section>
                        </q-item>
                        <q-item
                          v-close-popup
                          clickable
                          @click="confirmDelete(source)"
                        >
                          <q-item-section class="text-negative">
                            Delete
                          </q-item-section>
                        </q-item>
                      </q-list>
                    </q-menu>
                  </q-btn>
                </div>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </div>

      <!-- Learn about Quasar's responsive grid -->
      <div class="col-12 col-md-4">
        <q-card>
          <q-card-section>
            <div class="text-h6">
              Source Stats
            </div>
          </q-card-section>
          
          <!-- Learn about Quasar's list components -->
          <q-list>
            <q-item>
              <q-item-section>
                <q-item-label>Total Sources</q-item-label>
                <q-item-label caption>
                  {{ sources.length }} sources
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label>Active Sources</q-item-label>
                <q-item-label caption>
                  {{ sources.filter(s => s.active).length }} sources
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </div>
    </div>

    <!-- Learn about Quasar's dialog component -->
    <q-dialog v-model="showAddDialog">
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">
            Add New Source
          </div>
        </q-card-section>

        <q-card-section>
          <!-- Learn about Quasar's form components -->
          <q-form
            class="q-gutter-md"
            @submit="onSubmit"
          >
            <q-input
              v-model="newSource.name"
              label="Source Name"
              :rules="[val => !!val || 'Name is required']"
            />
            <q-input
              v-model="newSource.url"
              label="RSS URL"
              :rules="[
                val => !!val || 'URL is required',
                val => /^https?:\/\/.+/.test(val) || 'Must be a valid URL'
              ]"
            />
          </q-form>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            v-close-popup
            flat
            label="Cancel"
            color="primary"
          />
          <q-btn
            flat
            label="Add"
            color="primary"
            @click="onSubmit"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Source {
  id: number
  name: string
  url: string
  active: boolean
}

// Learn about reactive state
const sources = ref<Source[]>([
  {
    id: 1,
    name: 'Tech News',
    url: 'https://example.com/feed',
    active: true
  },
  {
    id: 2,
    name: 'AI Updates',
    url: 'https://ai-news.com/feed',
    active: false
  }
])

const showAddDialog = ref(false)
const newSource = ref({
  name: '',
  url: ''
})

// Learn about event handlers
const onSubmit = () => {
  // Implementation will come later
  console.log('Submit:', newSource.value)
  showAddDialog.value = false
}

const editSource = (source: Source) => {
  console.log('Edit source:', source)
}

const toggleSource = (source: Source) => {
  source.active = !source.active
}

const confirmDelete = (source: Source) => {
  console.log('Delete source:', source)
}
</script>

<style scoped>
/* Learn about CSS transitions */
.q-item {
  transition: background-color 0.3s ease;
}

.q-item:hover {
  background-color: rgba(0,0,0,0.03);
}
</style>