<template>
  <div class="config-page">
    <h1>Configuration</h1>
    <div class="config-section">
      <h2>Content Settings</h2>
      <div class="form-group">
        <label for="contentPath">Content Path:</label>
        <input
          id="contentPath"
          v-model="config.contentPath"
          type="text"
          @change="handleContentPathChange"
        />
        <p class="help-text">Default: ./content</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useConfig } from '../services/config';

const { config, updateConfig } = useConfig();

const handleContentPathChange = () => {
  updateConfig({ contentPath: config.value.contentPath });
};
</script>

<style scoped>
.config-page {
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.config-section {
  background: #f5f5f5;
  padding: 1.5rem;
  border-radius: 8px;
  margin-top: 1.5rem;
}

.form-group {
  margin: 1rem 0;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.help-text {
  color: #666;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}
</style>