import Domain from "../base/Domain";
import V1 from "./numbers/V1";
import V2 from "./numbers/V2";
import V3 from "./numbers/V3";
declare class NumbersBase extends Domain {
    _v1?: V1;
    _v2?: V2;
    _v3?: V3;
    /**
     * Initialize numbers domain
     *
     * @param twilio - The twilio client
     */
    constructor(twilio: any);
    get v1(): V1;
    get v2(): V2;
    get v3(): V3;
}
export = NumbersBase;
