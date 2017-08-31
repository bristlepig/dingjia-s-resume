<template>
  <ListItem>
    <p contenteditable="true">
      {{aboutContent}}
    </p>
  </ListItem>
</template>
<script>
  import ListItem from '@/components/list-item'
  export default {
    name: 'ListItemAbout',
    components: {
      ListItem
    },
    props: {
      aboutContent: {
        type: String
      }
    }
  }
</script>
