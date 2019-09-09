<template>
  <div class="index container">
    <div class="card" v-for="post in posts" :key="post.id">
      <div class="card-content">
        <span class="material-icons delete" @click="deletePost(post.id)">delete</span>
        <h2 class="teal-text">{{ post.title }}</h2>
        <ul class="list">
          <li v-for="(element, index) in post.list" :key="index">
            <span class="chip">{{ element }}</span>
          </li>
        </ul>
      </div>
      <span class="btn-floating btn-large halfway-fab teal darken-2">
        <router-link :to="{ name: 'EditPost', params: { post_slug: post.slug } }">
          <i class="material-icons">edit</i>
        </router-link>
      </span>
    </div>
  </div>
</template>

<script>
import db from "../firebase/init";
export default {
  name: "Index",
  data() {
    return {
      posts: []
    };
  },
  methods: {
    deletePost(id) {
      // delete doc from Firestore
      db.collection("posts")
        .doc(id)
        .delete()
        .then(() => {
          this.posts = this.posts.filter(post => {
            return post.id != id;
          });
        });
    }
  },
  created() {
    db.collection("posts")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          let post = doc.data();
          post.id = doc.id;
          this.posts.push(post);
        });
      });
  }
};
</script>


<style>
.index {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;
  margin-top: 60px;
}

.index h2 {
  font-size: 1.8em;
  text-align: center;
  margin: 0;
}

.index .delete {
  position: absolute;
  top: 4px;
  right: 4px;
  cursor: pointer;
  color: lightgrey;
  font-size: 1.4em;
}
</style>
