<script setup lang="ts">
import {usePageBuilder} from "../../PageBuilder.ts";
import {ref, Ref} from "vue";

const singleMeta: Ref<Record<string, string>> = ref({attitude:'property'})
const {meta} = usePageBuilder();

const editIndex: Ref<number | null> = ref(null);

const addMoreMeta = () => {
  meta.value.push({...singleMeta.value});
  singleMeta.value = {attitude:'property'};
}

const editMeta = (index: number) => {
  editIndex.value = index;
  singleMeta.value = {...meta.value[index]};
};

const deleteMeta = (index: number) => {
  meta.value.splice(index, 1);
  if (editIndex.value === index) {
    editIndex.value = null;
    singleMeta.value = {attitude:'property'};
  }
};

const handleSubmit = () => {
  if (editIndex.value !== null) {
    meta.value[editIndex.value] = {...singleMeta.value};
    singleMeta.value = {attitude:'property'};
    return editIndex.value = null; // Reset the edit index
  }

  addMoreMeta();
};

const cancelEdit = () => {
  editIndex.value = null;
  singleMeta.value = {attitude:'property'};
};
</script>

<template>
  <div class="meta-control-wrap bcpb:space-y-6">
    <!-- Header -->
    <div class="bcpb:flex bcpb:items-center bcpb:justify-between">
      <div>
        <h4 class="bcpb:text-lg bcpb:font-semibold bcpb:text-gray-900">Meta Tags</h4>
        <p class="bcpb:text-sm bcpb:text-gray-500">Manage your page's meta tags for SEO and social sharing</p>
      </div>
      <div class="bcpb:text-sm bcpb:text-gray-500">
        {{ meta.length }} tag{{ meta.length !== 1 ? 's' : '' }}
      </div>
    </div>

    <!-- Existing Meta Tags List -->
    <div class="meta-list bcpb:space-y-3" v-if="meta.length > 0">
      <h5 class="bcpb:text-sm bcpb:font-medium bcpb:text-gray-700 bcpb:mb-3">Current Meta Tags</h5>
      <div v-for="(metaData, index) in meta" :key="index" class="meta-item group">
        <div class="bcpb:flex bcpb:items-start bcpb:justify-between bcpb:p-4 bcpb:bg-gray-50 bcpb:rounded-lg bcpb:border bcpb:border-gray-200 hover:bcpb:border-gray-300 bcpb:transition-colors bcpb:duration-200">
          <div class="bcpb:flex-1 bcpb:min-w-0">
            <div class="bcpb:flex bcpb:items-center bcpb:gap-2 bcpb:mb-2">
              <span class="bcpb:inline-flex bcpb:items-center bcpb:px-2 bcpb:py-1 bcpb:rounded-md bcpb:text-xs bcpb:font-medium"
                    :class="{
                      'bcpb:bg-blue-100 bcpb:text-blue-800': metaData.attitude === 'property',
                      'bcpb:bg-green-100 bcpb:text-green-800': metaData.attitude === 'name'
                    }">
                {{ metaData.attitude }}
              </span>
              <code class="bcpb:text-sm bcpb:font-mono bcpb:text-gray-700 bcpb:bg-white bcpb:px-2 bcpb:py-1 bcpb:rounded bcpb:border">
                {{ metaData.property }}
              </code>
            </div>
            <p class="bcpb:text-sm bcpb:text-gray-600 bcpb:leading-relaxed bcpb:break-words">
              {{ metaData.content }}
            </p>
          </div>
          <div class="bcpb:flex bcpb:items-center bcpb:gap-2 bcpb:ml-4 bcpb:opacity-0 group-hover:bcpb:opacity-100 bcpb:transition-opacity bcpb:duration-200">
            <button 
              @click="editMeta(index)" 
              class="bcpb:p-2 bcpb:text-blue-600 hover:bcpb:text-blue-800 hover:bcpb:bg-blue-50 bcpb:rounded-md bcpb:transition-colors bcpb:duration-200"
              title="Edit meta tag"
            >
              <span class="icon-highlighter bcpb:text-sm"></span>
            </button>
            <button 
              @click="deleteMeta(index)" 
              class="bcpb:p-2 bcpb:text-red-600 hover:bcpb:text-red-800 hover:bcpb:bg-red-50 bcpb:rounded-md bcpb:transition-colors bcpb:duration-200"
              title="Delete meta tag"
            >
              <span class="icon-trash bcpb:text-sm"></span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="meta.length === 0" class="bcpb:text-center bcpb:py-8">
      <div class="bcpb:w-16 bcpb:h-16 bcpb:mx-auto bcpb:bg-gray-100 bcpb:rounded-full bcpb:flex bcpb:items-center bcpb:justify-center bcpb:mb-4">
        <svg class="bcpb:w-8 bcpb:h-8 bcpb:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"/>
        </svg>
      </div>
      <h3 class="bcpb:text-lg bcpb:font-medium bcpb:text-gray-900 bcpb:mb-2">No meta tags yet</h3>
      <p class="bcpb:text-gray-500 bcpb:mb-4">Add your first meta tag to improve SEO and social sharing</p>
    </div>

    <!-- Add/Edit Meta Form -->
    <div class="meta-form bcpb:bg-white bcpb:border bcpb:border-gray-200 bcpb:rounded-lg bcpb:p-6">
      <div class="bcpb:flex bcpb:items-center bcpb:justify-between bcpb:mb-4">
        <h5 class="bcpb:text-sm bcpb:font-medium bcpb:text-gray-900">
          {{ editIndex !== null ? 'Edit Meta Tag' : 'Add New Meta Tag' }}
        </h5>
        <button 
          v-if="editIndex !== null" 
          @click="cancelEdit"
          class="bcpb:text-sm bcpb:text-gray-500 hover:bcpb:text-gray-700 bcpb:transition-colors bcpb:duration-200"
        >
          Cancel
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="bcpb:space-y-4">
        <!-- Attitude Selection -->
        <div>
          <label class="bcpb:block bcpb:text-sm bcpb:font-medium bcpb:text-gray-700 bcpb:mb-2">Attribute Type</label>
          <select v-model="singleMeta.attitude" class="bg-page-builder-input bg-page-builder-select">
            <option value="property">Property (for Open Graph, Twitter Cards)</option>
            <option value="name">Name (for standard meta tags)</option>
          </select>
          <p class="bcpb:mt-1 bcpb:text-xs bcpb:text-gray-500">
            Choose "property" for social media tags, "name" for standard SEO tags
          </p>
        </div>

        <!-- Property/Name Input -->
        <div>
          <label class="bcpb:block bcpb:text-sm bcpb:font-medium bcpb:text-gray-700 bcpb:mb-2">
            {{ singleMeta.attitude === 'property' ? 'Property' : 'Name' }}
          </label>
          <input
            required
            v-model="singleMeta.property"
            type="text"
            :placeholder="singleMeta.attitude === 'property' ? 'e.g., og:title, og:description' : 'e.g., description, keywords'"
            class="bg-page-builder-input"
          />
          <p class="bcpb:mt-1 bcpb:text-xs bcpb:text-gray-500">
            {{ singleMeta.attitude === 'property' ? 'Common: og:title, og:description, og:image, twitter:card' : 'Common: description, keywords, author, robots' }}
          </p>
        </div>

        <!-- Content Input -->
        <div>
          <label class="bcpb:block bcpb:text-sm bcpb:font-medium bcpb:text-gray-700 bcpb:mb-2">Content</label>
          <textarea
            required
            v-model="singleMeta.content"
            placeholder="Enter the content/value for this meta tag"
            rows="3"
            class="bg-page-builder-input bg-page-builder-textarea"
          ></textarea>
          <p class="bcpb:mt-1 bcpb:text-xs bcpb:text-gray-500">
            The actual content that will be used for this meta tag
          </p>
        </div>

        <!-- Form Actions -->
        <div class="bcpb:flex bcpb:items-center bcpb:gap-3 bcpb:pt-4 bcpb:border-t bcpb:border-gray-200">
          <button 
            type="submit"
            class="bcpb:flex bcpb:items-center bcpb:gap-2 bcpb:px-4 bcpb:py-2 bcpb:text-sm bcpb:font-medium bcpb:text-white bcpb:bg-purple-600 bcpb:rounded-lg hover:bcpb:bg-purple-700 bcpb:transition-colors bcpb:duration-200"
          >
            <span class="icon-floppy"></span>
            {{ editIndex !== null ? "Update Meta Tag" : "Add Meta Tag" }}
          </button>
          
          <button 
            v-if="editIndex !== null"
            type="button"
            @click="cancelEdit"
            class="bcpb:px-4 bcpb:py-2 bcpb:text-sm bcpb:font-medium bcpb:text-gray-700 bcpb:bg-gray-100 bcpb:rounded-lg hover:bcpb:bg-gray-200 bcpb:transition-colors bcpb:duration-200"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>

    <!-- Pro Tips -->
    <div class="bcpb:bg-blue-50 bcpb:border bcpb:border-blue-200 bcpb:rounded-lg bcpb:p-4">
      <h6 class="bcpb:text-sm bcpb:font-medium bcpb:text-blue-900 bcpb:mb-2">💡 Pro Tips</h6>
      <ul class="bcpb:text-sm bcpb:text-blue-800 bcpb:space-y-1">
        <li>• Use "og:title" and "og:description" for Facebook sharing</li>
        <li>• Add "twitter:card" with value "summary_large_image" for Twitter</li>
        <li>• Include "description" meta tag for search engine snippets</li>
        <li>• Set "viewport" for mobile responsiveness</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
/* Pure CSS only - no Tailwind utilities */
.meta-control-wrap {
  max-height: calc(80vh - 160px);
  overflow-y: auto;
}
</style>
