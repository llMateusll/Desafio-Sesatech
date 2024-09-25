<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <h2 style="margin: 20px;">Login</h2>
        <form @submit.prevent="handleLogin">
          <div class="form-group">
            <label for="name">Name</label>
            <input type="text" class="form-control" style="margin: 10px;" id="name" v-model="name"
              placeholder="Enter your name" required />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" style="margin: 10px;" class="form-control" id="password" v-model="password"
              placeholder="Enter your password" required />
          </div>
          <div class="form-group">
            <button type="submit" style="margin: 10px;" class="btn btn-success ">Login</button>
          </div>
          <p v-if="errorMessage" class="text-danger">{{ errorMessage }}</p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>
