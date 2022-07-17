import Vue from "vue";
import Router from "vue-router";
import Calendar from "@/components/calendar/index";
import ToDoList from '@/components/calendar/to-do-list'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Calendar",
      component: Calendar
    },{
      path: '/todolist',
      name: 'ToDoList',
      component: ToDoList
    }
  ]
});
