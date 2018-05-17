<template>
    <div>
        <div>
            <ul>
                <li v-for="(item, index) in goodList">
                    
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
 import axios from 'axios'
    export default{
        data() {
            return {
                
        },
        mounted(){
            // this.getGoodsList();
        },
        components: {
           
        },
        methods: {
            getGoodsList() {
                axios.get('/goods').then((result)=>{
                    console.log(result)
                })
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
