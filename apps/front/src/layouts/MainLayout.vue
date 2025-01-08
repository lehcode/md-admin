<template>
  <!-- Quasar Layout Container
      - view="hHh LpR fFf" controls layout behavior:
      - hHh: header is fixed and always visible
      - LpR: left sidebar is persistent, right is responsive
      - fFf: footer is fixed (though we don't use it here) -->
  <q-layout view="hHh LpR fFf">
    <!-- Header Section 
        - elevated adds a shadow
        - bg-primary uses Quasar's color system -->
    <q-header
      elevated
      class="bg-primary text-white"
    >
      <q-toolbar>
        <!-- Menu Button - Learn Quasar button properties:
            - flat: no background
            - dense: compact size
            - round: circular shape -->
        <q-btn 
          flat 
          dense 
          round 
          icon="menu" 
          @click="toggleLeftDrawer" 
        />

        <!-- Toolbar Title - Basic Quasar typography -->
        <q-toolbar-title>Content Generator</q-toolbar-title>
        
        <!-- Action Buttons Group - Learn about button grouping -->
        <q-btn-group flat>
          <!-- Settings Button with Tooltip -->
          <q-btn
            flat
            round
            dense
            icon="settings"
          >
            <q-tooltip>AI Settings</q-tooltip>
          </q-btn>
          
          <!-- Output Directory Button with Tooltip -->
          <q-btn
            flat
            round
            dense
            icon="folder"
          >
            <q-tooltip>Output Directory</q-tooltip>
          </q-btn>
        </q-btn-group>
      </q-toolbar>
    </q-header>

    <!-- Side Navigation Drawer 
        - v-model binds to drawer state
        - bordered adds a border -->
    <q-drawer 
      v-model="leftDrawerOpen"
      bordered
      :width="250"
    >
      <!-- Navigation List - Learn Quasar's list components -->
      <q-list>
        <!-- Section Header -->
        <q-item-label header>
          Content Management
        </q-item-label>

        <!-- RSS Feeds Navigation Item 
            - clickable makes it interactive
            - v-ripple adds material design ripple effect
            - to="/sources" integrates with Vue Router -->
        <q-item
          v-ripple
          clickable
          to="/sources"
        >
          <q-item-section avatar>
            <q-icon name="rss_feed" />
          </q-item-section>
          <q-item-section>RSS Feeds</q-item-section>
        </q-item>

        <!-- Articles Navigation -->
        <q-item
          v-ripple
          clickable
          to="/articles"
        >
          <q-item-section avatar>
            <q-icon name="article" />
          </q-item-section>
          <q-item-section>Articles</q-item-section>
        </q-item>

        <!-- AI Tools Section -->
        <q-item-label header>
          AI Tools
        </q-item-label>

        <!-- Prompt Templates Navigation -->
        <q-item
          v-ripple
          clickable
          to="/prompts"
        >
          <q-item-section avatar>
            <q-icon name="psychology" />
          </q-item-section>
          <q-item-section>Prompt Templates</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <!-- Main Content Container 
        - This is where route components are rendered -->
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
// Learn Vue 3 Composition API basics:
// - ref is used for reactive primitive values
// - no need for 'this' keyword
import { ref } from 'vue'

// Reactive state for drawer visibility
// ref() makes the value reactive so Vue tracks changes
const leftDrawerOpen = ref(false)

// Toggle drawer method
// .value is needed to access/modify ref values
const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>

<style>
/* Learn CSS Custom Properties (variables) for theming */
:root {
  --primary-color: #1976D2;
  --secondary-color: #26A69A;
  --background-color: #F5F5F5;
}

/* Learn modern CSS features:
  - Using CSS variables
  - Transition for smooth animations */
.q-drawer {
  background-color: var(--background-color);
  transition: transform 0.3s ease;
}

/* Learn responsive design principles */
@media (max-width: 1024px) {
  .q-drawer {
    /* Adjust drawer for smaller screens */
    width: 100%;
    max-width: 250px;
  }
}
</style>