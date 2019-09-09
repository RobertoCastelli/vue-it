<template>
  <div class="add-post container">
    <h2 class="center-align teal-text">ADD NEW POST</h2>
    <form @submit.prevent="addPost">
      <div class="field title">
        <label for="title">Post Title</label>
        <input type="text" name="title" v-model="title" />
      </div>
      <div v-for="(item, index) in list" :key="index" class="field">
        <label for="list">list</label>
        <input type="text" name="list" v-model="list[index]" />
        <i class="material-icons delete" @click="deletelist(item)">delete</i>
      </div>
      <div class="field add-list">
        <label for="add-list">press TAB to Add list</label>
        <input type="text" name="add-list" @keydown.tab.prevent="addAnother" v-model="another" />
      </div>
      <div class="field center-align">
        <p v-if="feedback" class="red-text">{{ feedback }}</p>
        <button class="btn teal">Vue it!</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from "../firebase/init";
import slugify from "slugify";

export default {
  name: "AddPost",
  data() {
    return {
      title: null,
      another: null,
      feedback: null,
      list: []
    };
  },
  methods: {
    addPost() {
      if (this.title) {
        this.feedback = null;
        // create a slug
        this.slug = slugify(this.title, {
          replacement: "-",
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        });
        db.collection("posts")
          .add({
            title: this.title,
            list: this.list,
            slug: this.slug
          })
          .then(() => {
            this.$router.push({ name: "Index" });
          })
          .catch(err => console.log(err));
      } else {
        this.feedback = "enter a value to add a title";
      }
    },
    addAnother() {
      if (this.another) {
        this.list.push(this.another);
        this.another = null;
        this.feedback = null;
      } else {
        this.feedback = "enter a value to add some list";
      }
    },
    deletelist(item) {
      this.list = this.list.filter(i => {
        return i != item;
      });
    }
  }
};
</script>

<style>
.add-post {
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}

.add-post h2 {
  font-size: 2em;
  margin: 20px auto;
}

.add-post .field {
  margin: 20px auto;
  position: relative;
}

.add-post .delete {
  position: absolute;
  right: 0;
  bottom: 16px;
  color: lightgrey;
  font-size: 1.4em;
  cursor: pointer;
}
</style>