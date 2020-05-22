<template>
  <div>
    <ul>
      <TodoItem 
        v-for="(todo, index) of todoElements.slice(0, 3)"
        :todo="todo"
        :index="index"
        :key="todo.id"
        :removable="removable"
        :isSelectable="isSelectable"
      />
    </ul>
  </div>
</template>

<script>
import TodoItem from '@/components/TodoItem'
export default {
  props: ['todos', 'removable', 'isSelectable'],
  components: {
    TodoItem
  },
  computed: {
    todoElements() {
      return this.todos.filter(t => !t.isDeleted)
    }
  }
}
</script>