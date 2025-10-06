import Domain from "../base/Domain";
import V1 from "./knowledge/V1";
declare class KnowledgeBase extends Domain {
    _v1?: V1;
    /**
     * Initialize knowledge domain
     *
     * @param twilio - The twilio client
     */
    constructor(twilio: any);
    get v1(): V1;
}
export = KnowledgeBase;
