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
              v-for="source in feeds"
              :key="source.id"
            >
              <q-item-section>
                <q-item-label>{{ source.name }}</q-item-label>
                <q-item-label caption>
                  {{ source.url }}
                </q-item-label>
                <q-item-label v-if="source.description" caption>
                  {{ source.description }}
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
                  {{ feeds.length }} sources
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label>Active Sources</q-item-label>
                <q-item-label caption>
                  {{ feeds.filter(s => s.active).length }} sources
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
import { ref } from 'vue';
import { useRss } from '../services/rss';
import type { RssFeed } from '../services/rss';
import { useQuasar } from 'quasar';

const $q = useQuasar();
const { feeds, addFeed, updateFeed, removeFeed } = useRss();

const showAddDialog = ref(false);
const newSource = ref({
  name: '',
  url: '',
  description: ''
});

const onSubmit = () => {
  const feed = addFeed({
    name: newSource.value.name,
    url: newSource.value.url,
    description: newSource.value.description,
    active: true
  });

  if (feed) {
    $q.notify({
      type: 'positive',
      message: 'RSS feed added successfully'
    });
    showAddDialog.value = false;
    // Reset form
    newSource.value = {
      name: '',
      url: '',
      description: ''
    };
  }
};

const editSource = (source: RssFeed) => {
  // We'll implement this later
  console.log('Edit source:', source);
};

const toggleSource = (source: RssFeed) => {
  const updated = updateFeed(source.id, { active: !source.active });
  if (updated) {
    $q.notify({
      type: 'positive',
      message: `RSS feed ${updated.active ? 'activated' : 'deactivated'}`
    });
  }
};

const confirmDelete = (source: RssFeed) => {
  $q.dialog({
    title: 'Confirm Deletion',
    message: `Are you sure you want to delete "${source.name}"?`,
    cancel: true,
    persistent: true
  }).onOk(() => {
    if (removeFeed(source.id)) {
      $q.notify({
        type: 'positive',
        message: 'RSS feed deleted successfully'
      });
    }
  });
};
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