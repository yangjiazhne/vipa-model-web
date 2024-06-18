<template>
  <div class="evaluation-container">
    <!--    introduction-->
    <h1 class="intro-title">{{ $t("title.introduction") }}</h1>
    <div class="intro block">
      <div class="text">{{ $t("evaluation.introInfo") }}</div>
      <div class="logo">
        <img src="@/assets/vipa.jpg" alt="logo">
      </div>
    </div>

    <!--    properties-->
    <h1 class="prop-title">{{ $t("title.properties") }}</h1>
    <div class="block prop-text">
      {{ $t("evaluation.propertiesInfo") }}
    </div>
    <el-row :gutter="40" class="props">
      <el-col :span="5" v-for="card in getCards" :key="card.route">
        <el-card shadow="always" @click.native="$router.push(card.route)">
          <div class="prop-icon">
            <svg-icon :icon-class="card.iconClass" class="icon" />
          </div>
          <div class="prop-label">
            {{ card.label }}
          </div>
        </el-card>
      </el-col>
    </el-row>
    <LeaderBoard :select-mode="true" class="block"/>
  </div>
</template>

<script>
import LeaderBoard from "../components/Evaluation/LeaderBoard";

export default {
  name: "Evaluation",
  components: {LeaderBoard},

  computed: {
      getCards(){
        return [
            { route: '/home/detail/correctness', iconClass: 'correctness', label: this.$t("commonUpper.correctness") },
            { route: '/home/detail/robustness', iconClass: 'robustness', label: this.$t("commonUpper.robustness") },
            { route: '/home/detail/fairness', iconClass: 'fairness', label: this.$t("commonUpper.fairness") },
            { route: '/home/detail/transferability', iconClass: 'transferability', label: this.$t("commonUpper.transferability") },
            { route: '/home/detail/more', iconClass: 'more', label: this.$t("commonUpper.more") }
          ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/variables";

.evaluation-container {
  width: 74%;
  margin: 50px auto 0 auto;
  box-sizing: border-box;

  .block {
    margin-bottom: 20px;
    font-size: 22px;
  }

  .intro-title{
    margin-bottom: 20px;
    font-size: 22px;
  }

  .intro {
    display: flex;
    width: 100%;
    @media (max-width: 680px) {
      .text {
        width: 100%;
        font-size: 16px;
        line-height: 1.5em;
      }
      .logo {
        display: none;
      }
    }
    @media (min-width: 680px){
      .text {
        width: 76%;
        font-size: 16px;
        line-height: 1.5em;
      }
      .logo {
        height: auto;
        max-height: 150px;
        width: 18%;
        img {
          height: 100%;
          margin-left: 20px;
          background-size: cover;
        }
      }
    }
  }  

  @media screen and (min-width: 769px){
    .el-col-5 {
      max-width: 20%;
      width: 20%;
      flex: 0 0 20%;
    }
  }
  @media screen and (min-width: 569px) and (max-width: 768px) {
    .el-col-5 {
      max-width: 50%;
      width: 50%;
      flex: 0 0 50%;
    }
  }
  @media only screen and (max-width: 568px){
    .el-col-5 {
      max-width: 100%;
      width: 100%;
      flex: 0 0 100%;
    }
  }

  .prop-title{
    margin-top: 30px;
    margin-bottom: 20px;
    font-size: 22px;
  }

  .prop-text {
    font-size: 16px;
  }

  .props{
    margin-bottom: 40px;
    .el-card:hover {
      cursor: pointer;
      box-shadow: 0 0 18px 2px rgba(0,0,0,0.2);
      transition: all 0.2s ease-in-out;
    }

    .el-card{
      padding: 20px;
      .prop-icon{
        width: 100%;
        display: flex;
        justify-content: center; /* 水平居中 */
        align-items: center; /* 垂直居中 */
        .icon {
          height: 80px;
          width: 80px;
        }
      }

      .prop-label{
        width: 100%;
        margin-top: 30px;
        text-align: center;
        font-weight: bolder;
        font-size: 16px;
      }
    }
  }

}
</style>
