import NumbersBase from "../NumbersBase";
import Version from "../../base/Version";
import { HostedNumberOrderListInstance } from "./v3/hostedNumberOrder";
export default class V3 extends Version {
    /**
     * Initialize the V3 version of Numbers
     *
     * @param domain - The Twilio (Twilio.Numbers) domain
     */
    constructor(domain: NumbersBase);
    /** hostedNumberOrders - { Twilio.Numbers.V3.HostedNumberOrderListInstance } resource */
    protected _hostedNumberOrders?: HostedNumberOrderListInstance;
    /** Getter for hostedNumberOrders resource */
    get hostedNumberOrders(): HostedNumberOrderListInstance;
}
