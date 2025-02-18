<template lang="pug">
.tab-content--info
  .tab--content
    .ql-container.ql-bubble.ql-editor(v-if="!editing" v-html="idea.description")

    .edit-view(v-if="editing")
      .input-wrapper
        label Title
        input(v-if="editing" v-model="editedIdea.title")
      
      .input-wrapper
        quill-editor(v-if="editing" v-model="editedIdea.description" ref="myQuillEditor" v-bind:options="editorOption")

    .info-actions(v-if="isAuthenticated")
      .btn-fab(@click="toggleEditing" v-bind:class="[editing ? 'btn-danger' : 'btn-grey']")
        span(v-show="!editing")
          i.fas.fa-pencil-alt
        span(v-show="editing")
          i.fas.fa-undo
      .btn-fab.btn-success(v-show="editing" @click="updateIdea")
        i.fas.fa-check

  .tab--footer
    subscribe-button(v-bind:idea="idea" v-on:subscribed="$emit('show-design')")

  #general-discussion
    discussion(v-bind:idea="idea" v-bind:hide-no-comments="true" v-bind:task="{ title: 'discussion', component: 'discussion' }")

  //- #design-banner(@click="viewDesign()")
    span(v-if="idea._subscribers.length > 2") Join {{ idea._subscribers.length }} people in disscussing this idea!
    span(v-else) Join the discussion
    i.fas.fa-long-arrow-alt-right
    
</template>

<script>
import API from "@/api";
import { mapGetters } from "vuex";

import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";

import SubscribeButton from "@/components/ideas/actions/SubscribeButton";
import Discussion from "@/components/design/modules/Discussion";
import IdeaTile from "@/components/ideas/IdeaTile";

export default {
  name: "info-tab",
  props: ["idea"],
  components: {
    quillEditor,
    SubscribeButton,
    Discussion,
    IdeaTile
  },
  data() {
    return {
      editing: false,
      editedIdea: {
        title: undefined,
        description: undefined
      },
      editorOption: {
        // theme: "bubble",
        placeholder: "Describe your idea in more detail",
        readOnly: false,
        scrollingContainer: false,
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["bold", "italic", "underline"],
            [{ list: "ordered" }, { list: "bullet" }, "link", "t"]
          ]
        }
      }
    };
  },
  computed: {
    ...mapGetters(["isAuthenticated", "user", "instanceBackground"]),
    maximised() {
      const maximisedViews = ["outcomedocument"];
      return maximisedViews.indexOf(this.$route.name) !== -1;
    },
    ownIdea() {
      return this.isAuthenticated && this.user._id === this.idea._user._id;
    }
  },
  methods: {
    toggleEditing() {
      this.editing = !this.editing;
      this.editedIdea.title = this.idea.title;
      this.editedIdea.description = this.idea.description;
    },
    viewDesign() {
      this.$emit("show-design");
    },
    updateIdea() {
      API.idea.update(
        {
          _id: this.$route.params.id,
          title: this.editedIdea.title,
          description: this.editedIdea.description
        },
        response => {
          this.$log(response);
          this.editing = false;
          this.$emit("update:idea", response.data.idea);
        },
        error => {
          this.$error(error);
        }
      );
    }
  }
};
</script>

<style lang="stylus" scoped>

@import '~stylus/shared'

.tab-content--info
  background-color white
  text-align left
  .tab--content
    padding 15px
    padding-bottom 60px
    position relative
    .ql-container
      min-height 46px
    p
      reset()
    .info-actions
      bottom 15px
      right 15px
      position absolute
      .btn-fab
        radius(50%)
        float left
        height 40px
        margin 5px
        width 40px
        text-align center
        &:hover
          cursor pointer
        svg
          color white
          height 40px
          width 20px

  .tab--footer
    display none
    // border-top none !important
    padding 20px
    @media(max-width: 680px)
      display block

  #general-discussion
    border-top $color-border 1px dashed

  #design-banner
    animate()
    background-color $color-design
    color white
    font-size 1em
    font-weight bold
    line-height 20px
    padding 20px 20px
    padding-right 60px
    position relative
    @media(max-width: 680px)
      display none
    svg
      animate()
      color white
      position absolute
      top 0
      right 0
      padding 15px
      width 30px
      height 30px
    &:hover
      cursor pointer
      background-color darken($color-design, 5%)
      svg
        right -5px

  // Edit mode
  .quill-editor
    border-left $color-primary 3px solid
    padding 0
</style>
