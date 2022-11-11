import BaseAPI from "../base/api";
import Version from "@/assets/js/resource/resource.js";
class AssetApi extends BaseAPI {
  controllerName = Version.Version.Major;
}

export default new AssetApi();
