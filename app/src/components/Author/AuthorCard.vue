<template>
  <v-hover v-slot="{ hover }" open-delay="200">
    <div class="card">
      <v-btn v-if="hover" class="deleteBtn" icon @click="openDeleteDialog">
        <v-icon light color="secondary" size="25"> mdi-delete </v-icon>
      </v-btn>
      <div class="card-image" @click="authorPage">
        <img :src="getImage" alt="profile one" />
      </div>

      <div class="details">
        <v-row justify="center" style="height: 100%">
          <v-col
            cols="12"
            class="d-flex align-center flex-column justify-space-between py-1 px-3"
          >
            <h2 class="mb-auto">
              {{ author.fullName.substring(0, 30) }}
              <span class="job-title">
                <sup> ({{ author.bookCount }}) </sup>
                <sup style="color: #16a085">
                  ({{ author.translatedCount }})
                </sup>
              </span>
            </h2>
            <span class="job-title"
              >{{ author.countryName }} - {{ author.birthYear }}
            </span>
          </v-col>
        </v-row>
      </div>
    </div>
  </v-hover>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "AuthorCard",
  props: {
    author: {
      type: Object,
      required: true,
    },
  },

  methods: {
    ...mapActions("author", ["selectAuthor"]),
    openDeleteDialog() {
      this.$emit("openDeleteDialog", {
        fullName: this.author.fullName,
        authorId: this.author.authorId,
      });
    },
    authorPage() {
      this.selectAuthor({ author: this.author });
      this.$router.push({ name: "Author" });
    },
  },
  computed: {
    foundationYearTrim() {
      return this.author.birthYear.substring(0, 4);
    },
    getImage() {
      try {
        return require(`@/assets/upload/img/${this.author.image}`);
      } catch (err) {
        return require("@/assets/upload/img/author/default_profile.jpg");
      }
    },
  },
};
</script>

<style>
.v-sheet.v-card {
  cursor: pointer;
}

.deleteBtn {
  position: absolute;
  top: 10px;
  right: 15px;
  z-index: 9999;
}
</style>
<style scoped src="@/assets/css/authorcard.css"></style>
