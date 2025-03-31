<template>
  <div class="thrift-test">
    <h1>Thrift API Test</h1>
    <div class="test-form">
      <input 
        v-model="requestId" 
        type="text" 
        placeholder="Enter Request ID"
        class="input-field"
      >
      <button 
        @click="callGetData" 
        :disabled="loading"
        class="submit-button"
      >
        {{ loading ? 'Loading...' : 'Call GetData' }}
      </button>
    </div>

    <div v-if="error" class="error-message">
      {{ error }}
    </div>

    <div v-if="response" class="response">
      <h2>Response:</h2>
      <pre>{{ JSON.stringify(response, null, 2) }}</pre>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import thriftClient from '../services/thriftClient'

const requestId = ref('')
const response = ref(null)
const error = ref(null)
const loading = ref(false)

const callGetData = async () => {
  if (!requestId.value) {
    error.value = 'Please enter a Request ID'
    return
  }

  loading.value = true
  error.value = null
  response.value = null

  try {
    console.log('Calling client with ID:', requestId.value);
    response.value = await thriftClient.getData(requestId.value);
    console.log('Response received:', response.value);
  } catch (err) {
    error.value = err.message || 'An error occurred while calling the API'
  } finally {
    loading.value = false
  }
}

</script>

<style scoped>
.thrift-test {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.test-form {
  display: flex;
  gap: 10px;
  margin: 20px 0;
}

.input-field {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.submit-button {
  padding: 8px 16px;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.submit-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.error-message {
  color: #dc3545;
  margin: 10px 0;
  padding: 10px;
  background-color: #f8d7da;
  border-radius: 4px;
}

.response {
  margin-top: 20px;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 4px;
}

.response pre {
  white-space: pre-wrap;
  word-wrap: break-word;
  margin-top: 10px;
}
</style> 