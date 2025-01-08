<template>
  <div class="q-pa-md">
    <!-- Learn Quasar Grid System: row and columns -->
    <div class="row q-col-gutter-md">
      <!-- Article Management Tools -->
      <div class="col-12">
        <q-card>
          <q-card-section>
            <!-- Learn Flexbox through Quasar classes -->
            <div class="row items-center justify-between">
              <div class="text-h6">
                Articles
              </div>
              <!-- Learn Quasar button features -->
              <div class="row q-gutter-sm">
                <q-btn-dropdown
                  color="primary"
                  label="Filter"
                >
                  <q-list>
                    <q-item
                      v-close-popup
                      clickable
                      @click="filterStatus = 'all'"
                    >
                      <q-item-section>All Articles</q-item-section>
                    </q-item>
                    <q-item
                      v-close-popup
                      clickable
                      @click="filterStatus = 'draft'"
                    >
                      <q-item-section>Drafts</q-item-section>
                    </q-item>
                    <q-item
                      v-close-popup
                      clickable
                      @click="filterStatus = 'published'"
                    >
                      <q-item-section>Published</q-item-section>
                    </q-item>
                  </q-list>
                </q-btn-dropdown>
              </div>
            </div>
          </q-card-section>

          <!-- Learn Quasar's Table Component -->
          <q-table
            v-model:pagination="pagination"
            :rows="filteredArticles"
            :columns="columns"
            row-key="id"
            :loading="loading"
          >
            <!-- Learn about Quasar table slots and customization -->
            <template #body-cell-title="props">
              <q-td :props="props">
                <div class="row items-center">
                  <q-icon 
                    :name="getStatusIcon(props.row.status)" 
                    :color="getStatusColor(props.row.status)"
                    size="sm"
                    class="q-mr-sm"
                  />
                  {{ props.row.title }}
                </div>
              </q-td>
            </template>

            <!-- Learn about action buttons in tables -->
            <template #body-cell-actions="props">
              <q-td
                :props="props"
                class="q-gutter-sm"
              >
                <q-btn
                  flat
                  round
                  dense 
                  icon="edit" 
                  color="primary"
                  @click="editArticle(props.row)"
                >
                  <q-tooltip>Edit Article</q-tooltip>
                </q-btn>
                <q-btn
                  flat
                  round
                  dense 
                  :icon="props.row.status === 'published' ? 'unpublished' : 'publish'"
                  :color="props.row.status === 'published' ? 'warning' : 'positive'"
                  @click="togglePublishStatus(props.row)"
                >
                  <q-tooltip>
                    {{ props.row.status === 'published' ? 'Unpublish' : 'Publish' }}
                  </q-tooltip>
                </q-btn>
                <q-btn
                  flat
                  round
                  dense 
                  icon="delete" 
                  color="negative"
                  @click="confirmDelete(props.row)"
                >
                  <q-tooltip>Delete</q-tooltip>
                </q-btn>
              </q-td>
            </template>
          </q-table>
        </q-card>
      </div>
    </div>

    <!-- Learn about Quasar Dialogs -->
    <q-dialog
      v-model="deleteDialog"
      persistent
    >
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar
            icon="warning"
            color="negative"
            text-color="white"
          />
          <span class="q-ml-sm">Delete this article?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            v-close-popup
            flat
            label="Cancel"
            color="primary"
          />
          <q-btn
            v-close-popup
            flat
            label="Delete"
            color="negative"
            @click="deleteArticle"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
// Learn Vue 3 Composition API
import { ref, computed } from 'vue'

// Learn TypeScript interfaces
interface Article {
  id: number
  title: string
  source: string
  status: 'draft' | 'published'
  created: string
  modified: string
}

// Learn reactive state management
const loading = ref(false)
const deleteDialog = ref(false)
const selectedArticle = ref<Article | null>(null)
const filterStatus = ref<'all' | 'draft' | 'published'>('all')
const pagination = ref({
  rowsPerPage: 10
})

// Learn about mock data for development
const articles = ref<Article[]>([
  {
    id: 1,
    title: 'Getting Started with Vue 3',
    source: 'TechBlog RSS',
    status: 'published',
    created: '2025-01-08',
    modified: '2025-01-08'
  },
  {
    id: 2,
    title: 'Advanced Quasar Techniques',
    source: 'Dev.to RSS',
    status: 'draft',
    created: '2025-01-07',
    modified: '2025-01-07'
  }
])

// Learn about computed properties
const filteredArticles = computed(() => {
  if (filterStatus.value === 'all') return articles.value
  return articles.value.filter(article => article.status === filterStatus.value)
})

// Learn about table configuration
const columns = [
  {
    name: 'title',
    required: true,
    label: 'Title',
    align: 'left',
    field: (row: Article) => row.title,
    sortable: true
  },
  { 
    name: 'source', 
    label: 'Source', 
    field: 'source',
    sortable: true 
  },
  { 
    name: 'modified', 
    label: 'Modified', 
    field: 'modified',
    sortable: true 
  },
  { 
    name: 'actions', 
    label: 'Actions',
    align: 'center'
  }
]

// Learn about utility functions
const getStatusColor = (status: string): string => {
  return status === 'published' ? 'positive' : 'warning'
}

const getStatusIcon = (status: string): string => {
  return status === 'published' ? 'publish' : 'draft'
}

// Learn about event handlers
const editArticle = (article: Article) => {
  // Will implement navigation to editor
  console.log('Edit article:', article)
}

const togglePublishStatus = (article: Article) => {
  article.status = article.status === 'published' ? 'draft' : 'published'
  article.modified = new Date().toISOString().split('T')[0]
}

const confirmDelete = (article: Article) => {
  selectedArticle.value = article
  deleteDialog.value = true
}

const deleteArticle = () => {
  if (selectedArticle.value) {
    const index = articles.value.findIndex(a => a.id === selectedArticle.value?.id)
    if (index > -1) {
      articles.value.splice(index, 1)
    }
  }
}
</script>

<style scoped>
/* Learn about scoped styles in Vue */
.article-status {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 8px;
}

/* Learn about CSS transitions */
.q-table__container {
  transition: all 0.3s ease;
}
</style>