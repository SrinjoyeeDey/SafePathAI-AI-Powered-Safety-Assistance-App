import Domain from "../base/Domain";
import V1 from "./previewIam/V1";
declare class PreviewIamBase extends Domain {
    _v1?: V1;
    /**
     * Initialize previewIam domain
     *
     * @param twilio - The twilio client
     */
    constructor(twilio: any);
    get v1(): V1;
}
export = PreviewIamBase;
