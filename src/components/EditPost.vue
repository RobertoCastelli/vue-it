<template>
  <div v-if="post" class="edit-post container">
    <h2>EDIT MODE: {{ post.title }}</h2>
    <form @submit.prevent="editPost">
      <div class="field title">
        <label for="title">Post Title</label>
        <input type="text" name="title" v-model="post.title" />
      </div>
      <div v-for="(item, index) in post.list" :key="index" class="field">
        <label for="list">list</label>
        <input type="text" name="list" v-model="post.list[index]" />
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
  name: "EditPost",
  data() {
    return {
      post: null,
      another: null,
      feedback: null
    };
  },
  methods: {
    editPost() {
      if (this.post.title) {
        this.feedback = null;
        // create a slug
        this.post.slug = slugify(this.post.title, {
          replacement: "-",
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        });
        db.collection("posts")
          .doc(this.post.id)
          .update({
            title: this.post.title,
            list: this.post.list,
            slug: this.post.slug
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
        this.post.list.push(this.another);
        this.another = null;
        this.feedback = null;
      } else {
        this.feedback = "enter a value to add some list";
      }
    },
    deletelist(item) {
      this.post.list = this.post.list.filter(i => {
        return i != item;
      });
    }
  },
  created() {
    let ref = db
      .collection("posts")
      .where("slug", "==", this.$route.params.post_slug);
    ref.get().then(snapshot => {
      snapshot.forEach(doc => {
        this.post = doc.data();
        this.post.id = doc.id;
      });
    });
  }
};
</script>

<style>
.edit-post {
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}

.edit-post h2 {
  font-size: 2em;
  margin: 20px auto;
}

.edit-post .field {
  margin: 20px auto;
  position: relative;
}

.edit-post .delete {
  position: absolute;
  right: 0;
  bottom: 16px;
  color: lightgrey;
  font-size: 1.4em;
  cursor: pointer;
}
</style>