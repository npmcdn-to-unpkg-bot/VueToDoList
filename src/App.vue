<template>
    <div id="app" class="container">
        <div id="list" class="col-md-6 col-md-offset-3">
            <h1>Vue ToDoList</h1>
            <div id="info" class="bs-callout bs-callout-info">
                <h4 v-if="lists.length==0">列表里空空如也...冷冷清清的</h4>
                <h4 v-else>当前还有<span v-text="lists.length"></span>条任务待你完成呦~</h4>
            </div>
            <table id="table" class="table table-hover">
                <tr v-for="item in lists" @click="itemFinished(item)">
                    <td>
                        <span :class="{ 'finished': item.isFinish }" v-text="item.text"></span>
                        <button type="button" class="close" aria-label="Close" @click="del(item)"><span aria-hidden="true">&times;</span></button>
                    </td>
                </tr>
            </table>
            <textarea id="textarea" class="form-control" rows="3" placeholder="新的任务填在这里~" v-model="newItem" @keyup.enter="add"></textarea>
            <button class="btn btn-primary" @click="add">添加任务</button>
        </div>
    </div>
</template>
<script>
import Store from './store'
export default {
    data() {
      return {
        newItem: "",
        lists: Store.fetch()
      }
    },
    methods: {
        add: function() {
          var text = this.newItem.trim();
          if (text) {
                this.lists.push({
                    text: text,
                    isFinish: false
                });
                this.newItem = '';
            }
        },
        del: function(item) {
            this.lists.$remove(item);
        },
        itemFinished: function(item) {
            item.isFinish = !item.isFinish;
        }
    },
    watch: {
        lists: {
            handler: function(lists) {
                Store.save(lists)
            },
            deep: true
        }
    }
}
</script>
<style>
#list {
    padding: 25px 50px;
    margin-top: 80px;
    background-color: #f9f9f9;
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
    text-align: center;
}

#info {
    margin-top: 25px;
}

#info span {
    display: inline-block;
    width: 22px;
    margin: 0 3px;
    border-radius: 6px;
    background-color: #5bc0de;
    color: #fff;
    text-align: center;
}

#table {
    width: 80%;
    margin: 25px auto 25px;
    font-family: "Microsoft Yahei";
    text-align: left;
    vertical-align: middle;
    text-decoration: none;
}

#table tr {
    cursor: pointer;
    -moz-user-select: none;
    /*火狐*/
    -webkit-user-select: none;
    /*webkit浏览器*/
    -ms-user-select: none;
    /*IE10*/
    user-select: none;
}

.finished {
    text-decoration: line-through;
}

#textarea {
    margin: 25px auto;
    width: 80%;
}

.bs-callout {
    padding: 10px;
    margin: 20px 0;
    border: 1px solid #eee;
    border-left-width: 5px;
    border-radius: 3px;
}

.bs-callout-info {
    border-left-color: #5bc0de;
}

.bs-callout-info h4 {
    color: #5bc0de;
}
</style>
