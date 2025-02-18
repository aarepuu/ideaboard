<template lang="pug">
  .manage-permissions
    h1.tab--header.no-parent(@click="expanded = !expanded")
      .tab--header--title Manage Permissions
      .tab--header--action
        span(v-show="expanded") #[i.fas.fa-angle-up]
        span(v-show="!expanded") #[i.fas.fa-angle-down]

    .tab--content(v-if="expanded")
      table(border="0")
        tr(v-if="search.result || users.length > 0")
          td
          td(v-for="(permission, index) in permissions" align="center")
            strong(v-bind:title="permission.description") {{ permission.type }}
          td
            
        tr(v-for="(user, index) in users")
          td(v-bind:title="user.local.email")
            strong {{ user.profile.name }}
          td(v-for="(permission, index) in permissions" v-bind:class="{ 'has-permission': hasPermission(user, permission) }" align="center")
            span(v-show="hasPermission(user, permission)") #[i.fas.fa-check]
            span(v-show="!hasPermission(user, permission)") #[i.fas.fa-times]
          
          td(align="center")
            i.fas.fa-ban
        
        tr(v-if="search.result")
          td
            | {{ search.result.profile.name }}


          td(v-if="search.query.length > 0" v-for="(permission, index) in permissions" align="center")
            input(type="checkbox" v-model="newPermissions[permission._id]" :checked="isChecked(permission)")

          td(v-if="search.query.length > 0" align="center")
            .btn.btn-success(@click="updatePermissions(search.result._id)") Save

        tr
          td
            input(v-model="search.query" type="text" placeholder="Search for user by email..." v-on:keyup="searchUsers")
            
</template>

<script>
import API from "@/api";

export default {
  // TODO: add removal of users and disable removal of admin rights from default admin
  name: "manage-permissions",
  data() {
    return {
      expanded: true,
      permissions: [],
      users: [],
      newPermissions: {},
      search: {
        query: "",
        result: undefined
      }
    };
  },
  mounted() {
    this.fetchPermissions();
  },
  methods: {
    isChecked(permission) {
      const hasPermission = this.search.result._permissions.find(
        p => p.type === permission.type && p._id === permission._id
      );
      this.newPermissions[permission._id] = hasPermission ? true : false;
      return hasPermission ? true : false;
    },
    updatePermissions(userId) {
      API.permission.update(
        userId,
        this.newPermissions,
        response => {
          this.fetchPermissions();
          this.search.query = "";
          this.search.result = undefined;
        },
        response => {
          alert("ooops");
          this.fetchPermissions();
        }
      );
    },
    searchUsers() {
      API.user.search(
        this.search.query,
        response => {
          this.search.result = response.data;
        },
        response => {
          this.search.result = undefined;
        }
      );
    },
    fetchPermissions() {
      API.permission.fetch(
        response => {
          this.permissions = response.data.permissions;
          this.users = response.data.users;
        },
        response => {
          this.permissions = [];
          this.users = [];
        }
      );
    },
    hasPermission(user, permission) {
      return user._permissions.indexOf(permission._id) !== -1;
    }
  }
};
</script>

<style lang="stylus" scoped>

@import '~stylus/shared'

.manage-permissions
  .tab--content
    overflow-x auto
    table
      width 100%
      .btn
        reset()
        line-height 36px
        height 36px
    table, th, td
      border 1px solid $color-border
      border-collapse collapse
    td
      padding 10px
      position relative
      input[type="text"]
        border none
        font-size 0.9em
        line-height 30px
        outline 0
        padding 0 10px
        width calc(100% - 20px)
      svg
        color $color-grey
      &.has-permission
        svg
          color $color-success

    ul.search-results
      cleanlist()
      li.search-result
        cleanlist()
        border-top $color-border 1px solid
        margin-top 10px
        padding-top 10px
</style>
