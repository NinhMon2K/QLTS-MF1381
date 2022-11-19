import BaseAPI from "../base/api";
import Version from "@/assets/js/resource/resource.js";
import httpclient from "@/apis/base/httpclient";
class AssetApi extends BaseAPI {
  controllerName = Version.Version.Major;

  async delete(action, payload) {
    let request = {
      url: this.getBaseURL() + "/" + action + "/" + payload,
    };
    return httpclient.deleteAsync(request);
  }
  async put(action, recordId, payload) {
    let request = {
      url: this.getBaseURL() + "/" + action + "/" + recordId,
      data: payload,
    };
    return httpclient.pushAsync(request);
  }

  async filters(action, payload) {
    let request = {
      url: this.getBaseURL() + "/" + action,
      data: payload,
    };
    return httpclient.postAsync(request);
  }
}

export default new AssetApi();
