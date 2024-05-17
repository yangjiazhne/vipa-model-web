<template>
    <div class="footer-container">
        <el-divider></el-divider>
        <div class="link">
            <el-link :href="url" icon="el-icon-message">contact@vipazoo.cn</el-link>
        </div>
    </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      url: "http://www.vipazoo.cn",
    }
  },
}
</script>

<style lang="scss" scoped>
    .footer-container{
        width: 76%;
        margin: 40px auto;
        box-sizing: border-box;

        .link{
            margin: 40px, auto;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
        }
    }
</style>
