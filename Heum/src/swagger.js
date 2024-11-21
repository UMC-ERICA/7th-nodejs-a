import { reviewSchemas } from "./components/review.swagger.js";
import { missionSchemas } from "./components/mission.swagger.js";
import { missionListSchemas } from "./components/missionList.swagger.js";
import { userSchemas } from "./components/user.swagger.js";
import { storeSchemas } from "./components/restaurant.swagger.js";
const doc = {
  info: {
    title: "UMC 7th",
    description: "UMC 7th Node.js 테스트 프로젝트입니다.",
  },
  host: "localhost:3000",
  basePath: "/",
  components: {
    reviewSchemas,
    missionSchemas,
    missionListSchemas,
    userSchemas,
    storeSchemas
  },
};

export default doc;
