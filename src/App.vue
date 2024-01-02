<template>
  <!-- 加载 -->
  <Loading />
  <!-- 壁纸 -->
  <Background @loadComplete="loadComplete" />
  <!-- 主界面 -->
  <Transition name="fade" mode="out-in">
    <main id="main" v-if="store.imgLoadStatus">
      <div class="imageBox">
        <photo-provider>
          <photo-consumer
            v-for="item in projectURL"
            :intro="item.describe"
            :key="item.url"
            :src="item.url"
            loop="true"
          >
            <img :src="item.url" class="view-box" />
          </photo-consumer>
        </photo-provider>
      </div>
    </main>
  </Transition>
</template>
<script setup>
import { helloInit, checkDays } from "@/utils/getTime.js";
import { mainStore } from "@/store";
import Loading from "@/components/Loading.vue";
import Background from "@/components/Background.vue";
import cursorInit from "@/utils/cursor.js";
import config from "@/../package.json";

const store = mainStore();
const projectURL = ref(null);
// 页面宽度
const getWidth = () => {
  store.setInnerWidth(window.innerWidth);
};

// 加载完成事件
const loadComplete = () => {
  nextTick(() => {
    // 欢迎提示
    helloInit();
    // 默哀模式
    checkDays();
  });
};

// 监听宽度变化
watch(
  () => store.innerWidth,
  (value) => {
    if (value < 990) {
      store.boxOpenState = false;
    }
  },
);

onMounted(() => {
  projectURL.value = [
    {
      url: `/images/projectImage/6AE213CD-AF4A-4d2a-9E63-A21C79C8B24F.png`,
      describe: "院区三大中心时间轴大屏",
    },
    {
      url: `/images/projectImage/87D572C5-DD49-49d7-859A-689905C0B60C.png`,
      describe: "锐浪报表统计",
    },
    {
      url: `/images/projectImage/Snipaste_2023-11-21_10-20-19.png`,
      describe: "院区三大中心首页",
    },
    {
      url: `/images/projectImage/Snipaste_2023-11-21_10-32-32_info.png`,
      describe: "急诊患者信息",
    },
    {
      url: `/images/projectImage/Snipaste_2023-11-21_10-42-20-dt.png`,
      describe: "急诊患者动态查询",
    },
    {
      url: `/images/projectImage/Snipaste_2023-12-21_11-40-02.png`,
      describe: "需求管理平台",
    },
    {
      url: `/images/projectImage/Snipaste_2023-12-21_11-40-24.png`,
      describe: "需求管理平台-项目管理",
    },
    {
      url: `/images/projectImage/Snipaste_2023-12-21_11-41-02.png`,
      describe: "需求管理平台-钉钉考勤管理",
    },
    {
      url: `/images/projectImage/Snipaste_2023-12-21_11-41-27.png`,
      describe: "需求管理平台-特殊/复杂功能信息登记",
    },
    {
      url: `/images/projectImage/Snipaste_2023-12-21_11-41-45.png`,
      describe: "需求管理平台-需求登记",
    },
    {
      url: `/images/projectImage/Snipaste_2023-12-21_11-42-13.png`,
      describe: "需求管理平台-需求查看",
    },
    {
      url: `/images/projectImage/Snipaste_2023-12-21_11-45-08.png`,
      describe: "需求管理平台-需求流程",
    },
    {
      url: `/images/projectImage/IMG_4651.png`,
      describe: "三大中心-钉钉会诊通知",
    },
  ];
  // 自定义鼠标
  cursorInit();

  // 屏蔽右键
  document.oncontextmenu = () => {
    ElMessage({
      message: "为了浏览体验，本站禁用右键",
      grouping: true,
      duration: 2000,
    });
    return false;
  };

  // 鼠标中键事件
  window.addEventListener("mousedown", (event) => {
    if (event.button == 1) {
      store.backgroundShow = !store.backgroundShow;
      ElMessage({
        message: `已${store.backgroundShow ? "开启" : "退出"}壁纸展示状态`,
        grouping: true,
      });
    }
  });

  // 监听当前页面宽度
  getWidth();
  window.addEventListener("resize", getWidth);

  // 控制台输出
  const styleTitle1 = "font-size: 20px;font-weight: 600;color: rgb(244,167,89);";
  const styleTitle2 = "font-size:12px;color: rgb(244,167,89);";
  const title1 = "Eurekaの项目演示合集！";
  const content = `\n主页: ${config.home}\nGithub: ${config.github}`;
  console.info(`%c${title1} %c${content}`, styleTitle1, styleTitle2);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", getWidth);
});
</script>

<style lang="scss" scoped>
#main {
  overflow: auto;
  ::v-deep {
    .imageBox {
      overflow: auto;
      margin: 15px;
      display: grid;
      grid-template-columns: repeat(8, 1fr);
      grid-gap: 10px;
      @media (max-width: 720px) {
        height: 100%;
        grid-template-columns: repeat(2, 1fr);
      }

      @media (min-width: 721px) and (max-width: 980px) {
        height: 100%;
        grid-template-columns: repeat(5, 1fr);
      }

      @media (min-width: 981px) and (max-width: 1200px) {
        height: 100%;
        grid-template-columns: repeat(6, 1fr);
      }
      .PhotoConsumer {
        height: 200px;
        width: 100%;
        border-radius: 20px;
        padding: 15px;

        border: 1px solid rgb(16, 94, 212);

        box-sizing: border-box;

        img {
          height: 100%;
          width: 100%;
        }
      }
    }
  }

  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: scale(1.2);
  transition: transform 0.3s;
  animation: fade-blur-main-in 0.65s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  animation-delay: 0.5s;
  .container {
    width: 100%;
    height: 100vh;
    margin: 0 auto;
    .all {
      width: 100%;
      height: 100%;
      padding: 0 0.75rem;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }
    .more {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #00000080;
      backdrop-filter: blur(20px);
      z-index: 2;
      animation: fade 0.5s;
    }
    @media (max-width: 1200px) {
      padding: 0 2vw;
    }
  }
  .menu {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 84%;
    left: calc(50% - 28px);
    width: 56px;
    height: 34px;
    background: rgb(0 0 0 / 20%);
    backdrop-filter: blur(10px);
    border-radius: 6px;
    transition: transform 0.3s;
    animation: fade 0.5s;
    &:active {
      transform: scale(0.95);
    }
    .i-icon {
      transform: translateY(2px);
    }
    @media (min-width: 721px) {
      display: none;
    }
  }
}
</style>
